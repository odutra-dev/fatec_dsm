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

export default function Triangulo() {
  const { isDark, toggleTheme } = useTheme();

  const [ladoA, setLadoA] = useState();
  const [ladoB, setLadoB] = useState<number>();
  const [ladoC, setLadoC] = useState<number>();
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
          uri: "https://uploads-cdn.omnicalculator.com/images//geometry/perimeter/triangle1-r2.svg?width=425&enlarge=0&format=webp",
        }}
      ></Animated.Image>
      <Field nome="Lado A" value={ladoA} setValue={setLadoA} />
      <Field nome="Lado B" value={ladoB} setValue={setLadoB} />
      <Field nome="Lado C" value={ladoC} setValue={setLadoC} />
      <ButtonAnimated
        style={[buttonAnimatedStyle]}
        onPress={() => {
          setPerimetro(parseInt(ladoA) + parseInt(ladoB) + parseInt(ladoC));
          setArea((ladoA * ladoB) / 2);
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
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAAANCAYAAAC0LnDFAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAABGJhU0UAAAAMyZLetQAAAWJJREFUeNpjYECA/0j4AxAvB2I3huEJ/g9lB7MAsSUQ7wViv9HIGZwOFgbiM8MwkP8PtQjHZjgTEH+jsj2gnHgSiH8B8S0gth6gyNED4oNQdzwH4qIBjBxrqFt+APFDII4lxvAAIN6EwyGEMC6wFIi1oOxEIL4yQJFzFIh9oAlQEsqPHAC3GADxa2hYg9yiBg0jvIa7QQNOiYa5lQmacgcicgTRxCyhqZfeblkDxHnEGA5rqYHqmQ4gFh1k9QYlOZbaRTi13PIJiPkGSyDVQuuaPyR6gh4Ngl+DyC10b17OBOJQIOagkr3UDBA2IH46AG55Te2cQy74RGV7qRk54UA8dwDcMpvYOofW4AYQJ0PZ0kDcDG3GSg9A5IBaoTpQvh7UbSoDEDlK0OZzELTek8aWSOgROaBAOAct20F9HXMgbgTil3TuvH6CNuPvQus+kJtsB7AzbQAND5BbLgzTUZnhBQBsVI4r/0witAAAARV0RVh0TWF0aE1MADxtYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MIj48bWkgbWF0aHZhcmlhbnQ9Im5vcm1hbCI+UDwvbWk+PG1vPj08L21vPjxtaSBtYXRodmFyaWFudD0ibm9ybWFsIj5hPC9taT48bW8+JiN4QTA7PC9tbz48bW8+KzwvbW8+PG1vPiYjeEEwOzwvbW8+PG1pIG1hdGh2YXJpYW50PSJub3JtYWwiPmI8L21pPjxtbz4mI3hBMDs8L21vPjxtbz4rPC9tbz48bW8+JiN4QTA7PC9tbz48bWkgbWF0aHZhcmlhbnQ9Im5vcm1hbCI+YzwvbWk+PC9tYXRoPuo0pEkAAAAASUVORK5CYII=",
        }}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          resizeMode: "contain",
          marginVertical: 12,
        }}
      ></Animated.Image>

      <Animated.Image
        source={{
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAAjCAYAAADCIMduAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAABGJhU0UAAAAXQ/cXWQAAAZtJREFUeNpjYBgc4P8QNXs0UEYDZZAEih4QHwTiX0D8HIiLqBwoXkB8HIh/QO2RHQqBchSIfYCYCYglofxIKpmdDMTbgFgDKpYIDZhBHyiCaGKWVHI4yOylaGJM0BQ55MoUkMO/UclsjqFY1uBy4C8amj0kA4UNiJ+OBgoqCAfiuSM9UDYBsQ6UD6qebwCxCpF6/9MjUCrpHCifoNXkXSD+A8TngNiWhACleaAYQDVoMIwCOFgMzctzR4MCAmSheRkErg2FpjA9QA8QZ0HZILqLyPyMDw9pwAMt6NigfBYgvg8VH7EAVOPUoomB+OU0rIYHG0YBLNBUgt4pA/FvQfshIy77ZBDwWPJIzDpXgFgJh5w8VH5EAdCI1BoCapZD1Y0YABrIMSWgxhiID4+2WAY3sIam7k/QMZcLQBw90gMFlLojkdpQWgzUG9MdVgBUIVwaDQZM8GM0CFCBJTQLjQIoAI3Wn4QWwKMA2hXZAMRuo0EBAUrQAFEZDQoIAA2XzgZirtGggABxIF4F7d2PAijYwjA6sI4BaDp+AwAIOZ+sAFiY2gAAAPR0RVh0TWF0aE1MADxtYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MIj48bWkgbWF0aHZhcmlhbnQ9Im5vcm1hbCI+QTwvbWk+PG1vPj08L21vPjxtZnJhYz48bXJvdz48bWkgbWF0aHZhcmlhbnQ9Im5vcm1hbCI+YjwvbWk+PG1vPiYjeEEwOzwvbW8+PG1vPi48L21vPjxtbz4mI3hBMDs8L21vPjxtaSBtYXRodmFyaWFudD0ibm9ybWFsIj5oPC9taT48L21yb3c+PG1uPjI8L21uPjwvbWZyYWM+PC9tYXRoPqaEUNUAAAAASUVORK5CYII=",
        }}
        style={{
          width: 50,
          height: 50,
          alignSelf: "center",
          resizeMode: "contain",
          marginVertical: 12,
        }}
      ></Animated.Image>
    </Animated.ScrollView>
  );
}
