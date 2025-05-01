import { Slot } from "expo-router";
import { ThemeProvider } from "@/context/theme";

export default function RootLayoutNav() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
