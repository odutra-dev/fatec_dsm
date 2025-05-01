// src/context/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Appearance } from "react-native";
import { DarkTheme, LightTheme } from "@/styles";

type ThemeType = typeof LightTheme;

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: LightTheme,
  toggleTheme: () => {},
  isDarkMode: false,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [theme, setTheme] = useState<ThemeType>(
    isDarkMode ? DarkTheme : LightTheme
  );

  const toggleTheme = () => {
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    setTheme(newIsDark ? DarkTheme : LightTheme);
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      const isDark = colorScheme === "dark";
      setIsDarkMode(isDark);
      setTheme(isDark ? DarkTheme : LightTheme);
    });

    return () => subscription.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
