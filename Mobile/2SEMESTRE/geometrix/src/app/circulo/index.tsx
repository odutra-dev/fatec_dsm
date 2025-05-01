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

export default function Circulo() {
  const { isDark, toggleTheme } = useTheme();

  const [raio, setRaio] = useState<number>();
  const [perimetro, setPerimetro] = useState<number>(0);
  const [area, setArea] = useState<number>(0);

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

  const textPrimaryAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        themeAnimated.value,
        [0, 1],
        [Colors.light.primary, Colors.dark.primary]
      ),
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    };
  });

  const textSecondaryAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        themeAnimated.value,
        [0, 1],
        [Colors.light.secundary, Colors.dark.secudary]
      ),
      fontSize: 16,
    };
  });

  const textTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        themeAnimated.value,
        [0, 1],
        [Colors.light.text, Colors.dark.text]
      ),
      fontSize: 16,
      fontWeight: "bold",
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        themeAnimated.value,
        [0, 1],
        [Colors.light.primary, Colors.dark.primary]
      ),

      padding: 12,
      borderRadius: 8,
      alignItems: "center",
      marginVertical: 12,
    };
  });

  return (
    <Animated.View style={[viewAnimatedStyle]}>
      <Animated.Text style={[textPrimaryAnimatedStyle]}>Circulo</Animated.Text>
      <Animated.Image
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
          resizeMode: "contain",
          marginVertical: 12,
        }}
        source={{
          uri: "https://uploads-cdn.omnicalculator.com/images//geometry/perimeter/circle-r2.svg?width=425&enlarge=0&format=webp",
        }}
      ></Animated.Image>
      <Field nome="Raio" value={raio} setValue={setRaio} />
      <ButtonAnimated
        style={[buttonAnimatedStyle]}
        onPress={() => {
          setPerimetro(2 * Math.PI * raio);
          setArea(Math.PI * raio * raio);
        }}
      >
        <Animated.Text style={[textTextAnimatedStyle]}>Calcular</Animated.Text>
      </ButtonAnimated>

      <Animated.Text style={[textSecondaryAnimatedStyle]}>
        Perímetro: {perimetro.toFixed(3)}
      </Animated.Text>
      <Animated.Text style={[textSecondaryAnimatedStyle]}>
        {" "}
        Área: {area.toFixed(3)}
      </Animated.Text>
    </Animated.View>
  );
}
