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
    <Animated.ScrollView style={[viewAnimatedStyle]}>
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
      <Animated.Image
        source={{
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAANCAYAAAD2bQNSAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAABGJhU0UAAAAMyZLetQAAASpJREFUeNpjYECA/0j4AxAvB2I3BuoCayBeA8SfgPgXEF8A4miGQQT+I7FZgNgSiPcCsR8V7TgIxJFAzAPlawHxUajYoAsEGBAG4jM0tlceiC8N5kBgAuJvdLD7BxFqBKHZ5w9a1kXHhPwoC8TzoVnyDzGBEADEm3AY9p8CxyADS2iWIASMgbgVmlX/kxGIMHdfA+JkIGYjJiWACsUrQKxEwxTAAcQnoQUmJamWlEAwJqQAVjOAyoEOIBalYQCAkvcGMmsgSgKBMgVUzA5K0ABQoVL59WcgAoESoAHEs4GYiwIz/pDp9kERCOJAvApauJELmLAk/2+4CrrBGAhboCmBlCyHrV3xBU3sOBDXQhtf+MwYFIFAShmCSzwLiHegiXlBU0MXpYEwYgEAV+pwETDRVAQAAADKdEVYdE1hdGhNTAA8bWF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCI+PG1pIG1hdGh2YXJpYW50PSJub3JtYWwiPlA8L21pPjxtbz49PC9tbz48bW4+MjwvbW4+PG1vPi48L21vPjxtaSBtYXRodmFyaWFudD0ibm9ybWFsIj4mI3gzQzA7PC9taT48bW8+LjwvbW8+PG1pIG1hdGh2YXJpYW50PSJub3JtYWwiPnI8L21pPjwvbWF0aD6cjd4MAAAAAElFTkSuQmCC",
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
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAARCAYAAACBzs+aAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAABGJhU0UAAAAQ3ZOC+gAAASpJREFUeNpjYBie4D8U/wLio0CswjBCABMQZwHxOYYRBn6MJM/aA/FBQooqh4lnJaF5WAmfIgNohtcY4p5VA+ItUE/jBYuBeC4UD+WY3QbEfIQUygLxDSj7GpRPCyAIxBeA+A9SFYINE6p6QO6bD8SfoGbBwDZiU2gPtBhngNJdRNZ3pDraGIhbgZgFixpiS9T/0EhJBmI2ItyFAXiA+C6SZpBj7kPFad1IINfDxpRYDCqZa9HEQPzyQexhsgELNHYFseS1W9AWCzWTND6H/6GHhzMIODqZhjH8h0yPUOThK3gqZ3moPK3auuhJ+BuWQoiqHvYC4jUE1CyHqqM2AAXmFzSx49CyQwtH9qHYw6B2pikBNaDS8DANPAyq+nZgiYBvWKpEqnl4RAEANyBoMBL7VAgAAADNdEVYdE1hdGhNTAA8bWF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCI+PG1pIG1hdGh2YXJpYW50PSJub3JtYWwiPkE8L21pPjxtbz49PC9tbz48bWkgbWF0aHZhcmlhbnQ9Im5vcm1hbCI+JiN4M0MwOzwvbWk+PG1vPi48L21vPjxtc3VwPjxtaSBtYXRodmFyaWFudD0ibm9ybWFsIj5yPC9taT48bW4+MjwvbW4+PC9tc3VwPjwvbWF0aD5fnnkSAAAAAElFTkSuQmCC",
        }}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          resizeMode: "contain",
          marginVertical: 12,
        }}
      ></Animated.Image>
    </Animated.ScrollView>
  );
}
