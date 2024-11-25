import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  isSignedIn: () => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const COLLECTION_ID = 'users'; // Replace with your actual collection ID
  const DATABASE_ID = 'default'; // Replace with your database ID

  // Keys for AsyncStorage
  const SESSION_KEY = '@session';
  const USER_KEY = '@user';

  const saveSession = async (userData: Models.User<Models.Preferences>): Promise<void> => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
      await AsyncStorage.setItem(SESSION_KEY, 'true');
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const loadSession = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const storedUser = await AsyncStorage.getItem(USER_KEY);
      const sessionActive = await AsyncStorage.getItem(SESSION_KEY);

      if (sessionActive === 'true' && storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSession = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(USER_KEY);
      await AsyncStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      setUser(userData);

      // Save session
      await saveSession(userData);

      console.log('Signed in:', response);
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Create user account
      const response = await account.create('unique()', email, password, name);

      // Add user to collection
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          email,
          name,
          userId: response.$id,
        }
      );

      const userData = await account.get();
      setUser(userData);

      // Save session
      await saveSession(userData);

      console.log('Signed up and added to collection:', response);
    } catch (error) {
      console.error('Sign-up failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await account.deleteSession('current');
      setUser(null);

      // Clear session
      await clearSession();

      console.log('Logged out');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithOAuth = async (provider: OAuthProvider): Promise<void> => {
    try {
      await account.createOAuth2Session(provider);
      const userData = await account.get();
      setUser(userData);

      // Save session
      await saveSession(userData);

      console.log(`Logged in with ${provider}`);
    } catch (error) {
      console.error(`OAuth login failed with ${provider}:`, error);
      throw error;
    }
  };

  const isSignedIn = (): boolean => {
    return user !== null;
  };

  // Load session on app start
  useEffect(() => {
    loadSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signIn, signUp, logout, loginWithOAuth, isSignedIn }}
    >
      {children}
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
