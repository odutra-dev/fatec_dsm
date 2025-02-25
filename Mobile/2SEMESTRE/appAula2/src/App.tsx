import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import Comp01 from "./components/comp01";
import Comp02 from "./components/comp02";

export default function App() {
  return (
    <ImageBackground
      source={require("./assets/bg.jpg")}
      style={styles.container}
    >
      <Text>App aula 3</Text>
      <Comp01 />
      <Comp02 />
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
