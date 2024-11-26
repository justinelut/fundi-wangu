import React from 'react';
import { Pressable } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useTheme } from '@/lib/theme-provider';


export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Pressable 
      onPress={toggleTheme}
      className="p-2 rounded-full bg-accent"
    >
      {isDarkMode ? (
        <Sun 
          size={24} 
          color="hsl(var(--primary-foreground))" 
        />
      ) : (
        <Moon 
          size={24} 
          color="hsl(var(--primary-foreground))" 
        />
      )}
    </Pressable>
  );
}