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

export default function Home() {
  const { isDark, toggleTheme } = useTheme();

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

  const textPrimaryAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        themeAnimated.value,
        [0, 1],
        [Colors.light.primary, Colors.dark.primary]
      ),
    };
  });

  const textSecondaryAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        themeAnimated.value,
        [0, 1],
        [Colors.light.secundary, Colors.dark.secudary]
      ),
    };
  });

  const textTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        themeAnimated.value,
        [0, 1],
        [Colors.light.text, Colors.dark.text]
      ),
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        themeAnimated.value,
        [0, 1],
        [Colors.light.primary, Colors.dark.primary]
      ),
    };
  });

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
          gap: 8,
        },
        viewAnimatedStyle,
      ]}
    >
      <Animated.Text style={[{ fontSize: 24 }, textPrimaryAnimatedStyle]}>
        Seja bem vindo ao Geometrix
      </Animated.Text>
      <Animated.Text
        style={[
          textTextAnimatedStyle,
          { fontSize: 14, color: Colors.light.text },
        ]}
      >
        Uma calculadora para calcular area e perimetro de formas geometricas
      </Animated.Text>
      <ButtonAnimated
        onPress={() => router.push("/geometric")}
        style={[
          {
            padding: 8,
            borderRadius: 8,
          },
          buttonAnimatedStyle,
        ]}
      >
        <Animated.Text
          style={[textSecondaryAnimatedStyle, { fontWeight: "bold" }]}
        >
          Escolher forma
        </Animated.Text>
      </ButtonAnimated>
    </Animated.View>
  );
}
