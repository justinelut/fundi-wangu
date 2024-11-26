import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';
import { useColorScheme, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    // Sync with system color scheme
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  useEffect(() => {
    // Update navigation bar for Android
    const updateNavigationBar = async () => {
      if (Platform.OS === 'android') {
        try {
          await NavigationBar.setBackgroundColorAsync(
            isDarkMode 
              ? 'hsl(20, 14.3%, 4.1%)' // Dark mode background 
              : 'hsl(0, 0%, 100%)' // Light mode background
          );
          await NavigationBar.setButtonStyleAsync(
            isDarkMode ? 'light' : 'dark'
          );
        } catch (error) {
          console.error('Failed to set navigation bar', error);
        }
      }
    };

    updateNavigationBar();
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};