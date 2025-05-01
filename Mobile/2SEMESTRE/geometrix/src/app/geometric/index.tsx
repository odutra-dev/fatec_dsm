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

import { Forms } from "@/components/forms";

const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

const dados = [
  {
    id: 1,
    nome: "Quadrado",
    imagem:
      "https://uploads-cdn.omnicalculator.com/images//geometry/perimeter/square-r2.svg?width=425&enlarge=0&format=webp",
  },
  {
    id: 2,
    nome: "Retangulo",
    imagem:
      "https://uploads-cdn.omnicalculator.com/images//geometry/perimeter/rectangle-r2.svg?width=425&enlarge=0&format=webp",
  },
  {
    id: 3,
    nome: "Circulo",
    imagem:
      "https://uploads-cdn.omnicalculator.com/images//geometry/perimeter/circle-r2.svg?width=425&enlarge=0&format=webp",
  },
  {
    id: 4,
    nome: "Triangulo Equilatero",
    imagem:
      "https://uploads-cdn.omnicalculator.com/images//geometry/perimeter/triangle1-r2.svg?width=425&enlarge=0&format=webp",
  },
];

export default function Geometric() {
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

  const view2AnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        themeAnimated.value,
        [0, 1],
        [Colors.light.secundary, Colors.dark.secudary]
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

  return (
    <Animated.View
      style={[
        viewAnimatedStyle,
        { flex: 1, paddingHorizontal: 24, marginTop: 24 },
      ]}
    >
      <Animated.Text
        style={[
          textPrimaryAnimatedStyle,
          { fontSize: 24, fontWeight: "bold", textAlign: "center" },
        ]}
      >
        Selecione uma forma
      </Animated.Text>

      <Animated.FlatList
        data={dados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Forms nome={item.nome} imagem={item.imagem} />
        )}
        numColumns={1}
      />
    </Animated.View>
  );
}
