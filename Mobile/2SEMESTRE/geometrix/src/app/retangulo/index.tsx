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

export default function Retangulo() {
  const { isDark, toggleTheme } = useTheme();

  const [comprimento, setComprimento] = useState();
  const [altura, setAltura] = useState<number>();
  const [value, setValue] = useState<number>();
  const [perimetro, setPerimetro] = useState<number>();
  const [area, setArea] = useState<number>();

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
    <Animated.ScrollView style={[viewAnimatedStyle]}>
      <Animated.Text style={[textPrimaryAnimatedStyle]}>
        Retangulo
      </Animated.Text>
      <Animated.Image
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
          resizeMode: "contain",
          marginVertical: 12,
        }}
        source={{
          uri: "https://uploads-cdn.omnicalculator.com/images//geometry/perimeter/rectangle-r2.svg?width=425&enlarge=0&format=webp",
        }}
      ></Animated.Image>
      <Field nome="Altura" value={altura} setValue={setAltura} />
      <Field nome="Comprimento" value={comprimento} setValue={setComprimento} />
      <ButtonAnimated
        style={[buttonAnimatedStyle]}
        onPress={() => {
          setPerimetro(altura * 2 + comprimento * 2);
          setArea(comprimento * altura);
        }}
      >
        <Animated.Text style={[textTextAnimatedStyle]}>Calcular</Animated.Text>
      </ButtonAnimated>

      <Animated.Text style={[textSecondaryAnimatedStyle]}>
        Perímetro: {perimetro}
      </Animated.Text>
      <Animated.Text style={[textSecondaryAnimatedStyle]}>
        {" "}
        Área: {area}
      </Animated.Text>
      <Animated.Image
        source={{
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAANCAYAAADG4RJzAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAABGJhU0UAAAAMyZLetQAAAXRJREFUeNpjYECA/0j4AxAvB2I3BuoCayBeA8SfgPgXEF8A4mgs6v4zDB5AEzcjK2YBYksg3gvEflR0+EEgjgRiHihfC4iPQsUGa2DTxM3YFAsD8Rkae0YeiC/RIbD/DyY3Y1PMBMTf6JB6fmBxix40VYGy7nMgLhpEgY3LzSDgBcTHofIg98sS65gAIN6EQy0hTCywhGZLdPNBYj7QCJfEkXUHKrBxuTkZiLcBsQZULBEa4AQdA6ocrwCxEg1TNAcQn4RWQuhuEcTiwYODILDxuXkplpLhFwOe1PoBWk53ALEoDQMaFJgbcLR4qFGkUTP3EetmDmIj+T8dPaIEdbQKianw1wCmbHLd/J/WZRo+ACrPZgMxF4kBwwbETwcosMl184AGtjgQr4K240kNmHAgnjsAgU2Jmwc0sLcg1dSEHA5qBelA+aBm4A08WZiWgU2KmwdVYBNbxn+CNpvuAvEfID4HxLYD1IMk1s3/qRzJo4ASAADjGptlM9Xm8gAAAOJ0RVh0TWF0aE1MADxtYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MIj48bWkgbWF0aHZhcmlhbnQ9Im5vcm1hbCI+UDwvbWk+PG1vPj08L21vPjxtbj4yPC9tbj48bWkgbWF0aHZhcmlhbnQ9Im5vcm1hbCI+YjwvbWk+PG1vPiYjeEEwOzwvbW8+PG1vPis8L21vPjxtbz4mI3hBMDs8L21vPjxtbj4yPC9tbj48bWkgbWF0aHZhcmlhbnQ9Im5vcm1hbCI+aDwvbWk+PC9tYXRoPo2RmvAAAAAASUVORK5CYII=",
        }}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          resizeMode: "contain",
          marginVertical: 4,
        }}
      ></Animated.Image>
      <Animated.Image
        source={{
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAANCAYAAAD/hqMoAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAABGJhU0UAAAAMyZLetQAAARxJREFUeNpjYMAOKhkGFvwfbGYbQDVqjAYKAiwG4rlQPBooQCALxDeg7GtQ/kAFih4QHwTiX0D8HIiLqBwoXkB8HIh/QO3B6dceIM6CskF0FxkWEsLEmnMUiH2AmAmIJaH8SCoFSjIQb0MqIhKhAYMBeID4LhCzQfksQHwfKj4QKUUQTcwSl8PJMHspmhgTNEVirXFq0cRA/PJBUqaAHP6NSmZzEGMnCzSVoMcOiH8L6iB6Zx9s4BcNC1oM8QwCHkkeBCkFlK2f0jNQrgCxEg7F8lD5gQ6UcCo1E4gKFFDVtIaAQcuh6ugZKJuAWAfK14M2FVRIyMIUBQqoRDclYJExEB+mY6B8glaToHLuDxCfA2JbEss1irPPKEACAMk9ZQ5IRhNuAAAA7HRFWHRNYXRoTUwAPG1hdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwiPjxtaSBtYXRodmFyaWFudD0ibm9ybWFsIj5BPC9taT48bW8+JiN4QTA7PC9tbz48bW8+PTwvbW8+PG1vPiYjeEEwOzwvbW8+PG1pIG1hdGh2YXJpYW50PSJub3JtYWwiPmI8L21pPjxtbz4mI3hBMDs8L21vPjxtbz4uPC9tbz48bW8+JiN4QTA7PC9tbz48bWkgbWF0aHZhcmlhbnQ9Im5vcm1hbCI+aDwvbWk+PC9tYXRoPveB/SwAAAAASUVORK5CYII=",
        }}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          resizeMode: "contain",
          marginVertical: 4,
        }}
      ></Animated.Image>
    </Animated.ScrollView>
  );
}
