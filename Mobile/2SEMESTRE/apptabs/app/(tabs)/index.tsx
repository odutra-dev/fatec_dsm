import { View, Text, Button, StyleSheet } from "react-native";

export default function Home(){
    return(
        <View style={styles.container}>
        <Text>Índice de Massa Corporal</Text>
        <Text>O índice de massa corporal (IMC) 
            é uma medida internacional usada para calcular se uma pessoa está no peso ideal.</Text>
        <Text style={[styles.texto, styles.formula]}>IMC = PESO / (ALTURA X ALTURA)</Text>
    </View>
    )
}
const styles = StyleSheet.create({
    texto: {
        padding: 30,
        textAlign: 'center',
        lineHeight: 20,
    },
    titulo: {
        fontWeight: 'bold'
    },
    formula: {
        fontStyle: 'italic'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    }
})