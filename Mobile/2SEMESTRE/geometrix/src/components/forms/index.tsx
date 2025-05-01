import { useTheme } from "@/context/theme";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";

import { router } from "expo-router";

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
        [Colors.light.secundary, Colors.dark.secudary]
      ),
      borderRadius: 8,
      padding: 8,
      marginTop: 8,
      alignItems: "center",
      gap: 8,
    };
  });

  return (
    <ButtonAnimated
      style={[viewAnimatedStyle]}
      activeOpacity={0.7}
      onPress={() => router.push("/" + nome.toLowerCase())}
    >
      <Animated.Image
        source={{ uri: imagem }}
        style={{ width: 200, height: 200, resizeMode: "contain" }}
      />
      <Animated.Text>{nome}</Animated.Text>
    </ButtonAnimated>
  );
}
