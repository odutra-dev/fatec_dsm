import { useTheme } from "@/context/theme";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@/theme/colors";

const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export function Forms({ nome, imagem }: { nome: string; imagem: string }) {
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
    };
  });

  const view2AnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        themeAnimated.value,
        [0, 1],
        [Colors.light.secundary, Colors.dark.secudary]
      ),
    };
  });

  return (
    <ButtonAnimated
      style={[
        view2AnimatedStyle,
        {
          borderRadius: 8,
          padding: 8,
          marginTop: 8,
          alignItems: "center",
          gap: 8,
        },
      ]}
    >
      <Animated.Image
        source={{ uri: imagem }}
        style={{ width: 200, height: 200, resizeMode: "contain" }}
      />
      <Animated.Text>{nome}</Animated.Text>
    </ButtonAnimated>
  );
}
