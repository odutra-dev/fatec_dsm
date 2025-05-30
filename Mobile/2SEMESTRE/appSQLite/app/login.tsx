import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { selectUsuarios } from "../db/crud";
import { router } from "expo-router";
import { verifyPassword } from "../util/hash";

export default function Login() {
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const users = await selectUsuarios();

    const foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
      throw new Error("Usuário não encontrado.");
    }

    const isValid = await verifyPassword(password, foundUser.password);

    if (!isValid) {
      throw new Error("Senha incorreta.");
    }

    // Armazenar o nome do usuário no AsyncStorage
    await AsyncStorage.setItem("userName", foundUser.nome);

    return foundUser.nome;
  };

  const mutation = useMutation({
    mutationFn: handleLogin,
    onSuccess: (nomeUsuario) => {
      setEmail("");
      setPassword("");
      queryClient.invalidateQueries({ queryKey: ["users"] });

      Alert.alert("Bem-vindo!", `Olá, ${nomeUsuario}`);
      router.replace("/");
    },
    onError: (error) => {
      Alert.alert("Erro no login", error.message);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Informe seus dados para entrar:</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
      />

      <TouchableOpacity onPress={() => mutation.mutate()} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/cadastro")} // ou "/novoUsuario" se for o caminho real
        style={styles.loginLink}
      >
        <Text style={styles.loginText}>
          Ainda não tem uma conta?{" "}
          <Text style={styles.loginHighlight}>Cadastrar</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#0acfcf",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#444",
  },
  loginHighlight: {
    color: "#0acfcf",
    fontWeight: "600",
  },
});
