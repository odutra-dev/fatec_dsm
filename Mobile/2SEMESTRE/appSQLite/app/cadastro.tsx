import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { insertUsuario } from "../db/crud";
import { router } from "expo-router";
import { hashPassword } from "../util/hash";

export default function NovoUsuario() {
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUsuario = async () => {
    const passwordHash = await hashPassword(password);
    console.log(email, nome, passwordHash);
    await insertUsuario(nome, email, passwordHash);
  };

  const mutation = useMutation({
    mutationFn: handleCreateUsuario,
    onSuccess: () => {
      setEmail("");
      setNome("");
      setPassword("");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.replace("/login");
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <Text style={styles.subtitle}>Preencha os campos abaixo:</Text>

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
        value={nome}
        onChangeText={setNome}
        placeholder="Nome completo"
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
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/login")}
        style={styles.loginLink}
      >
        <Text style={styles.loginText}>
          Já tem uma conta? <Text style={styles.loginHighlight}>Entrar</Text>
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
