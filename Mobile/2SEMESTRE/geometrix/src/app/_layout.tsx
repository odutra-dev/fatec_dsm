import { Slot } from "expo-router";
import { ThemeProvider } from "@/contexts/ThemeContext";
export default function RootLayoutNav() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
