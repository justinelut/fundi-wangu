import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Models, OAuthProvider } from 'react-native-appwrite';
import { account } from './appwrite';

// Types
interface AuthContextProps {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithOAuth: (provider: OAuthProvider) => Promise<void>;
  isSignedIn: () => boolean; // New function
}

interface AuthProviderProps {
  children: ReactNode;
}

// Context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sign in with email and password
  const signIn = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      setUser(userData);
      console.log('Signed in:', response);
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with email, password, and name
  const signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await account.create('unique()', email, password, name);
      const userData = await account.get();
      setUser(userData);
      console.log('Signed up:', response);
    } catch (error) {
      console.error('Sign-up failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await account.deleteSession('current');
      setUser(null);
      console.log('Logged out');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Login with OAuth provider
  const loginWithOAuth = async (provider: OAuthProvider): Promise<void> => {
    try {
      await account.createOAuth2Session(provider);
      const userData = await account.get();
      setUser(userData);
      console.log(`Logged in with ${provider}`);
    } catch (error) {
      console.error(`OAuth login failed with ${provider}:`, error);
      throw error;
    }
  };

  // Check if user is signed in
  const isSignedIn = (): boolean => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signIn, signUp, logout, loginWithOAuth, isSignedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming the context
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
