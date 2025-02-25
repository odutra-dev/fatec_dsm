import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Comp01 from "./components/comp01";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>App aula 3</Text>
      <Comp01 />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
