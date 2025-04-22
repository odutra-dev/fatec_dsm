import { View, Text, Button, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Home(){
    return(
        <View style={styles.container}>
        <Text>Seja Bem-Vindo</Text>
        <Button title="Entrar" onPress={() => router.navigate("/(tabs)")}/>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    }
})