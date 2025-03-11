import Estilo from "../styles/header";
import { View, Text, Image } from "react-native";

export const Header = () => {
  return (
    <View style={Estilo.header}>
      <Text style={Estilo.cor}>Mercado Parrilla</Text>
      <Image 
      style={Estilo.imagem}
      source={require("../assets/bannerofertas.jpg")} />
    </View>
  );
};
