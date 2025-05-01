import { useTheme } from "@/context/theme";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@/theme/colors";
import { Field } from "@/components/field";
const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export default function Geometric() {
  const { isDark, toggleTheme } = useTheme();

  const [value, setValue] = useState(0);
  const [perimetro, setPerimetro] = useState(0);
  const [area, setArea] = useState(0);

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
      flex: 1,
      paddingHorizontal: 24,
      marginTop: 24,
    };
  });

  return (
    <Animated.View style={[viewAnimatedStyle]}>
      <Field nome="Comprimento" value={value} setValue={setValue} />
      <ButtonAnimated
        onPress={() => {
          setPerimetro(value * 4);
          setArea(value * value);
        }}
      >
        <Animated.Text>Calcular</Animated.Text>
      </ButtonAnimated>

      <Animated.Text>Perímetro: {perimetro}</Animated.Text>
      <Animated.Text> Área: {area}</Animated.Text>
    </Animated.View>
  );
}
