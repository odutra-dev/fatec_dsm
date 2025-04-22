import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Pressable, TextInput } from "react-native-gesture-handler";

export default function BuscaCep() {
  const [cep, setCep] = useState<any>(null);
  const [endereco, setEndereco] = useState<any>(null);

  async function buscarCep(_cep: string) {
    try {
        const api = await fetch(`https://viacep.com.br/ws/${_cep}/json/`);
        const dados = await api.json();

        if(dados.erro){
            Alert.alert("Erro ao buscar CEP!");
            setEndereco(null);
            setCep("");
        }
        else{
            setEndereco(dados);
            setCep("");
        }
    } catch (erro) {
        Alert.alert("Não foi possível carregar o endereço. Erro", erro);
        
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.caixa}
        placeholder="Digite Seu CEP"
        keyboardType="numeric"
        value={cep}
        onChangeText={setCep}
      />

      <View style={{flexDirection: 'row', gap: 10}}>
      <Pressable style={styles.botao01} onPress={() => buscarCep(cep)}>
        <Text style={{ textAlign: "center" }}>Buscar</Text>
      </Pressable>

      <Pressable style={styles.botao02} onPress={() => setEndereco(null)}>
        <Text style={{ textAlign: "center" }}>Limpar</Text>
      </Pressable>

      </View>

      {
        endereco &&(
            <View>
                <Text>CEP: {endereco.cep}</Text>
                <Text>Logradouro: {endereco.logradouro}</Text>
                <Text>Bairro: {endereco.bairro}</Text>
                <Text>Cidade: {endereco.localidade}</Text>
                <Text>Estado: {endereco.estado}</Text>
            </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    gap: 10,
  },
  caixa: {
    borderWidth: 1,
    width: "100%",
    padding: 15,
  },
  botao01: {
    backgroundColor: "orange",
    borderRadius: 10,
    padding: 20,
    width: "50%",
  },
  botao02: {
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 20,
    width: "50%",
  },
});
