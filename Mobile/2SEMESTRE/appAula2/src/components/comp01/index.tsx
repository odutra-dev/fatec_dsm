import { View, Text, Image } from "react-native";
import { styles } from "./styles";

export default function Comp01() {
  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/icon.png")} style={styles.img} />
      <Image
        source={{ uri: "https://github.com/dutragames.png" }}
        style={styles.img}
      />
      <Text>Componente 01</Text>
    </View>
  );
}
