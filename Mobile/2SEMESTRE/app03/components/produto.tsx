import Estilo from "../styles/produto";
import { View, Text, Image, Button } from "react-native";

type DADOS = {
  id: number;
  imagem: string;
  nome: string;
  preco: number;
};

export const Produto = ({ id, imagem, nome, preco }: DADOS) => {
  return (
    <View style={Estilo.header}>
      <Image style={Estilo.imagem} source={{ uri: imagem }} />
      <Text numberOfLines={1} style={Estilo.cor}>
        {nome}
      </Text>
      <Text numberOfLines={1} style={Estilo.preco}>
        R$ {preco}
      </Text>
      <Button title="Comprar"/>
    </View>
  );
};
