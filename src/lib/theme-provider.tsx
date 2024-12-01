import React, { useEffect, useState, ReactNode, createContext, useContext } from "react";
import { colorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = (await AsyncStorage.getItem("theme")) as Theme | null;
      if (savedTheme) {
        colorScheme.set(savedTheme);
        setThemeState(savedTheme);
      }
    };
    loadTheme();
  }, []);

  const setTheme = async (newTheme: Theme) => {
    await AsyncStorage.setItem("theme", newTheme);
    colorScheme.set(newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
