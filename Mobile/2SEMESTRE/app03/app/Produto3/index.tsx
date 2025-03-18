import { StatusBar } from "expo-status-bar";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
export default function Produto1() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: "https://shopinfo.vteximg.com.br/arquivos/ids/1679839-1000-1000/1.png?v=638727219584370000",
        }}
        style={styles.productImage}
      />

      {/* Nome e preço do produto */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>
          Notebook Acer Nitro 5 15.6' i5 13425H
        </Text>
        <Text style={styles.productPrice}>R$ 67500</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  iconButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  shareText: {
    fontSize: 16,
    color: "#007bff",
  },
  productImage: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },
  productDetails: {
    alignItems: "center",
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    color: "#555",
  },
});
