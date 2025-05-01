import { Slot } from "expo-router";
import { ThemeProvider } from "@/context/theme";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <Slot />
    </ThemeProvider>
  );
}
