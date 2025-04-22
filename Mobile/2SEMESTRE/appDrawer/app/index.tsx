import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";

interface Usuario {
  id: number;
  name: string;
  email: string;
  address: [];
}

export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>();

  async function exibirUsuarios() {
    try {
      const api = await fetch("https://jsonplaceholder.typicode.com/users");
      const dados = await api.json();
      setUsuarios(dados);
    } catch (erro) {
      Alert.alert("Não foi possível exibir os usuários. Erro ", erro);
    }
  }

  useEffect(() => {
    exibirUsuarios();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="auto" />
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Nome: {item.name}</Text> 
            <Text>E-mail: {item.email}</Text>
            <Text>Logradouro: {item.address['street']}</Text>
            <Text>Latitude: {item.address['geo']['lat']}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item:{
    borderWidth: 1,
    marginTop: 30,
    padding: 20,
  },
});
