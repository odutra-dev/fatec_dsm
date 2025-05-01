import { useTheme } from "@/context/theme";
import { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "../theme/colors";

const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export default function MyComponent() {
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

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
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
        },
        viewAnimatedStyle,
      ]}
    >
      <Animated.Text style={[{ fontSize: 24 }, textAnimatedStyle]}>
        O tema atual é {isDark ? "escuro" : "claro"}
      </Animated.Text>
      <ButtonAnimated
        onPress={toggleTheme}
        style={{ marginTop: 12, backgroundColor: "#000", padding: 12 }}
      >
        <Animated.Text style={{ color: "#fff" }}>
          Trocar tema para {isDark ? "claro" : "escuro"}
        </Animated.Text>
      </ButtonAnimated>
    </Animated.View>
  );
}
