import { Button, View, Text, Alert } from "react-native";
export default function index({ title }: { title: string }) {
  const handlePress = () => {
    Alert.alert("Apertou o botao: " + title);
  };

  return (
    <View>
      <Text>Componente 02</Text>
      <Button title={title} color={"#000"} onPress={handlePress} />
    </View>
  );
}
