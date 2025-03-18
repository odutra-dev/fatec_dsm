import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { Header } from "../components/header";
import { Categoria } from "../components/categoria";
import { Produto } from "../components/produto";

const dados = [
  {
    id: 1,
    imagem:
      "https://cms-assets.xboxservices.com/assets/bc/40/bc40fdf3-85a6-4c36-af92-dca2d36fc7e5.png?n=642227_Hero-Gallery-0_A1_857x676.png",
    nome: "Xbox Series X",
    preco: 3500,
  },
  {
    id: 2,
    imagem:
      "https://img-prd-pim.poorvika.com/product/xiaomi-led-smart-tv-x-series-2024-4k-ultra-hd-55-inch-front-view.png",
    nome: "TV 55' XIAOMI UHD",
    preco: 4400,
  },
  {
    id: 3,
    imagem:
      "https://shopinfo.vteximg.com.br/arquivos/ids/1679839-1000-1000/1.png?v=638727219584370000",
    nome: "Notebook Acer Nitro 5 15.6' i5 13425H",
    preco: 67500,
  },
  {
    id: 4,
    imagem:
      "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",
    nome: "PS5 PRO",
    preco: 5800,
  },
];

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Header />

      <View style={styles.categorias}>
        <Categoria text="Notebooks" />
        <Categoria text="TVs" />
        <Categoria text="Video Games" />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={dados}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Produto {...item} />}
        style={{ marginTop: 30 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categorias: {
    gap: 8,
    flexDirection: "row",
    paddingHorizontal: 14,
    marginTop: 20,
  },
});
