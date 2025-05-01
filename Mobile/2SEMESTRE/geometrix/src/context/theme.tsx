import { useContext, createContext, useState, ReactNode } from "react";

type TheneContextType = {
  toggleTheme: () => void;
  isDark: boolean;
};

const ThemeContext = createContext({} as TheneContextType);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
