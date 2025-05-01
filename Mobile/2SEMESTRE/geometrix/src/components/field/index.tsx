import { useTheme } from "@/context/theme";
import { useEffect } from "react";
import { TextInput } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@/theme/colors";

const TextInputAnimated = Animated.createAnimatedComponent(TextInput);

export function Field({
  nome,
  value,
  setValue,
}: {
  nome: string;
  value: number;
  setValue: () => void;
}) {
  const { isDark } = useTheme();

  const themeAnimated = useSharedValue(isDark ? 1 : 0);

  useEffect(() => {
    themeAnimated.value = withTiming(isDark ? 1 : 0, { duration: 800 });
  }, [isDark]);

  const viewAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        themeAnimated.value,
        [0, 1],
        [Colors.light.background, Colors.dark.background]
      ),
      paddingHorizontal: 24,
      gap: 8,
    };
  });

  const labelAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        themeAnimated.value,
        [0, 1],
        [Colors.light.secundary, Colors.dark.secudary]
      ),
      fontSize: 14,
      fontWeight: "bold",
    };
  });

  const inputAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        themeAnimated.value,
        [0, 1],
        [Colors.light.primary, Colors.dark.primary]
      ),
      fontSize: 16,
      padding: 12,
      borderColor: interpolateColor(
        themeAnimated.value,
        [0, 1],
        [Colors.light.secundary, Colors.dark.secudary]
      ),
      borderWidth: 1,
      borderRadius: 8,
    };
  });

  return (
    <Animated.View style={[viewAnimatedStyle]}>
      <Animated.Text style={[labelAnimatedStyle]}>{nome}</Animated.Text>
      <TextInputAnimated
        value={value}
        onChangeText={setValue}
        placeholder={"Digite um número"}
        style={[inputAnimatedStyle]}
        keyboardType="numeric"
      />
    </Animated.View>
  );
}
