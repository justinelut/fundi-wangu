import React, { createContext } from 'react';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { themes } from './color-theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

type Theme = 'light' | 'dark';

export const ThemeContext = createContext<{
  theme: Theme;
}>({
  theme: 'light',
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme } = useColorScheme();

  // Ensure colorScheme defaults to 'light' if null
  const theme: Theme = colorScheme === 'light' || colorScheme === 'dark' ? colorScheme : 'light';

  return (
    <ThemeContext.Provider value={{ theme }}>
      <View style={themes[theme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
