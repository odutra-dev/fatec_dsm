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

export default function Quadrado() {
  const { isDark, toggleTheme } = useTheme();

  const [value, setValue] = useState();
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
      <Animated.Text style={[textPrimaryAnimatedStyle]}>Quadrado</Animated.Text>
      <Animated.Image
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
          resizeMode: "contain",
          marginVertical: 12,
        }}
        source={{
          uri: "https://uploads-cdn.omnicalculator.com/images//geometry/perimeter/square-r2.svg?width=425&enlarge=0&format=webp",
        }}
      ></Animated.Image>
      <Field nome="Comprimento" value={value} setValue={setValue} />
      <ButtonAnimated
        style={[buttonAnimatedStyle]}
        onPress={() => {
          setPerimetro(value * 4);
          setArea(value * value);
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
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAANCAYAAAA9tuesAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAABGJhU0UAAAAMyZLetQAAAKZJREFUeNpjYECA/0j4AxAvB2I3BtoCH6h92MB/YgxAVsQCxJZAvBeI/WjkYB4gvkZNR8OAMBCfoZGjZwJxMi0czQTE32jgYGtoLDLQwtEBQLwJh1pCGBdgA+JLQCxPC0eDMuEVIFaicih3AHEOEY4j2tGwkuMM1HBRKjtYD4iPEuk4spMHIQ+SmjxOArHKQDmaXECKRweNo0mxd9TR9HQ0qcXp4AUANONWO7jv+psAAACRdEVYdE1hdGhNTAA8bWF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCI+PG1pIG1hdGh2YXJpYW50PSJub3JtYWwiPlA8L21pPjxtbz49PC9tbz48bW4+NDwvbW4+PG1pIG1hdGh2YXJpYW50PSJub3JtYWwiPkw8L21pPjwvbWF0aD4V3cF0AAAAAElFTkSuQmCC",
        }}
        style={{
          width: 50,
          height: 50,
          alignSelf: "center",
          resizeMode: "contain",
          marginVertical: 12,
        }}
      ></Animated.Image>
      <Animated.Image
        source={{
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAARCAYAAABJoiVMAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAABGJhU0UAAAAQ3ZOC+gAAANNJREFUeNpjYBi84D8U/wLio0CswjCEABMQZwHxOYYhCH4MNQfbA/FBQooq6ZRmiQGS0DSthE+RAdRAjUHgaDUg3gJ1OF6wGIjnQvFAOhrk0G1AzEfIIFkgvgFlX4PyB8rR24iN7R5o8cIApbuILEvxYXIdTZRZPEB8F4jZoHwWIL4PFR/IjEiwxKhFEwPxywero1mgoSyIJg7i34LWSvROHgRBBgGLkwdjSF/BU3jLQ+UHlaO9gHgNATXLoeoGjaNBdbopATXGQHyYRk1PUvLB0AUAuNlOP0Qk3DEAAACedEVYdE1hdGhNTAA8bWF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCI+PG1pIG1hdGh2YXJpYW50PSJub3JtYWwiPkE8L21pPjxtbz49PC9tbz48bXN1cD48bWkgbWF0aHZhcmlhbnQ9Im5vcm1hbCI+TDwvbWk+PG1uPjI8L21uPjwvbXN1cD48L21hdGg+/hz4dAAAAABJRU5ErkJggg==",
        }}
        style={{
          width: 50,
          height: 50,
          alignSelf: "center",
          resizeMode: "contain",
          marginVertical: 12,
        }}
      ></Animated.Image>
    </Animated.View>
  );
}
