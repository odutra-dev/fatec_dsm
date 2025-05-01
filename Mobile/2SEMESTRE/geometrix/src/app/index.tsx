import { useTheme } from "@/contexts/ThemeContext";
import { View, Text, Button } from "react-native";

export default function MyComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background, padding: 20 }}>
      <Text style={{ color: theme.colors.text }}>Olá, tema aplicado!</Text>
      <Button title="Alterar Tema" onPress={toggleTheme} />
    </View>
  );
}
