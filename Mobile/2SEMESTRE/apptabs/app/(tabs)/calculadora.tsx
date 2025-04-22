import { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";

export default function Calculadora() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  function calcularIMC(p, a){
    const imc = parseFloat(p)/(parseFloat(a)*(parseFloat(a)))
    Alert.alert('Calculadora IMC', `Seu IMC é ${imc.toFixed(2)}`)
  }

  return (
    <View style={styles.container}>
      <Text>Calculadora IMC</Text>
      <TextInput
        style={styles.caixa}
        placeholder="Digite seu peso"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />
      <TextInput
        style={styles.caixa}
        placeholder="Digite sua altura"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />
      <Button title='Calcular' onPress={() => calcularIMC(peso, altura)}/>
    </View>
  );
}
const styles = StyleSheet.create({
  caixa: {
    borderWidth: 1,
    width: "50%",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
});
