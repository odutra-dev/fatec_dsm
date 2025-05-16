import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { selectUsuarios, deleteUsuario, insertUsuario } from "../db/crud";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export default function novoUsuario() {
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");

  const mutation = useMutation({
    mutationFn: () => insertUsuario(nome, email),
    onSuccess: () => {
      setEmail("");
      setNome("");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.back();
    },
  });

  return (
    <View
      style={{
        padding: 24,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <Text>Preencha os campos abaixo:</Text>
      <TextInput
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          borderColor: "#222",
          borderWidth: 1,
        }}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="example@example.com"
      />
      <TextInput
        keyboardType="default"
        placeholder="John Doew"
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          borderColor: "#222",
          borderWidth: 1,
        }}
        value={nome}
        onChangeText={setNome}
      />
      <TouchableOpacity
        onPress={() => mutation.mutate()}
        style={{
          backgroundColor: "#12eaE5",
          padding: 12,
          borderRadius: 8,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "700" }}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
