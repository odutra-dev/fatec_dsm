import Estilo from "../styles/categoria";
import { View, Text } from "react-native";

export const Categoria = ({text} : {text:string}) => {
  return (
    <View style={Estilo.container}>
      <Text style={Estilo.texto}>{text}</Text>
    </View>
  );
};
