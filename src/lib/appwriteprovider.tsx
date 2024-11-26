import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { ID, Models, OAuthProvider } from 'react-native-appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { account, databases } from './appwrite';

interface AuthContextProps {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithOAuth: (provider: OAuthProvider) => Promise<void>;
  isSignedIn: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const COLLECTION_ID = 'users';
  const DATABASE_ID = 'default';
  const SESSION_KEY = '@session';
  const USER_KEY = '@user';

  // Memoized isSignedIn to prevent unnecessary re-renders
  const isSignedIn = useMemo(() => !!user, [user]);

  // Memoized save session to prevent recreating on every render
  const saveSession = useCallback(async (userData: Models.User<Models.Preferences>): Promise<void> => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
      await AsyncStorage.setItem(SESSION_KEY, 'true');
    } catch (error) {
      console.error('Error saving session:', error);
    }
  }, []);

  // Memoized load session to prevent recreating on every render
  const loadSession = useCallback(async (): Promise<void> => {
    try {
      const storedUser = await AsyncStorage.getItem(USER_KEY);
      const sessionActive = await AsyncStorage.getItem(SESSION_KEY);

      if (sessionActive === 'true' && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Only update state if the user is different
        setUser(prevUser => 
          JSON.stringify(parsedUser) !== JSON.stringify(prevUser) ? parsedUser : prevUser
        );
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error loading session:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memoized sign-in to prevent recreating on every render
  const signIn = useCallback(async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await account.createEmailPasswordSession(email, password);
      const userData = await account.get();

      // Only update state if the user is different
      setUser(prevUser => 
        JSON.stringify(userData) !== JSON.stringify(prevUser) ? userData : prevUser
      );
      
      await saveSession(userData);
      console.log('Signed in:', response);
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [saveSession]);

  // Memoized sign-up to prevent recreating on every render
  const signUp = useCallback(async (email: string, password: string, name: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await account.create('unique()', email, password, name);
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        email,
        name,
        userId: response.$id,
      });

      const userData = await account.get();
      setUser(userData);
      await saveSession(userData);

      console.log('Signed up and added to collection:', response);
    } catch (error) {
      console.error('Sign-up failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [saveSession, DATABASE_ID, COLLECTION_ID]);

  // Memoized logout to prevent recreating on every render
  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await account.deleteSession('current');
      setUser(null);
      await AsyncStorage.removeItem(USER_KEY);
      await AsyncStorage.removeItem(SESSION_KEY);

      console.log('Logged out');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memoized OAuth login to prevent recreating on every render
  const loginWithOAuth = useCallback(async (provider: OAuthProvider): Promise<void> => {
    try {
      await account.createOAuth2Session(provider);
      const userData = await account.get();

      // Only update state if the user is different
      setUser(prevUser => 
        JSON.stringify(userData) !== JSON.stringify(prevUser) ? userData : prevUser
      );
      
      await saveSession(userData);
      console.log(`Logged in with ${provider}`);
    } catch (error) {
      console.error(`OAuth login failed with ${provider}:`, error);
      throw error;
    }
  }, [saveSession]);

  // Load session only once when component mounts
  useEffect(() => {
    loadSession();
  }, [loadSession]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      signIn,
      signUp,
      logout,
      loginWithOAuth,
      isSignedIn,
    }),
    [user, isLoading, signIn, signUp, logout, loginWithOAuth, isSignedIn]
  );

  // Only render children when loading is complete
  return (
    <AuthContext.Provider value={contextValue}>
      {!isLoading ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};