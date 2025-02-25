import { Button, View, Text } from "react-native";
export default function index({ title }: { title: string }) {
  return (
    <View>
      <Text>Componente 02</Text>
      <Button title={title} color={"#000"} />
    </View>
  );
}
