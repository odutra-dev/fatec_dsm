import { View, Text, TouchableOpacity, Modal, TextInput } from "react-native";

import { Feather } from "@expo/vector-icons";
import { User } from "../../app";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteUsuario, updateUsuario } from "../../db/crud";
import { useState } from "react";

type Props = {
  item: User;
};

export default function ListUsers({ item }: Props) {
  const queryClient = useQueryClient();

  const [email, setEmail] = useState(item.email);
  const [nome, setNome] = useState(item.nome);
  const [modalVisible, setModalVisible] = useState(false);

  const deletar = useMutation({
    mutationFn: () => deleteUsuario(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const atualizar = useMutation({
    mutationFn: () => updateUsuario(item.id, nome, email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <View
      style={{
        borderRadius: 8,
        width: "100%",
        backgroundColor: "#ddd",
        padding: 8,
        marginVertical: 8,
        position: "relative",
      }}
    >
      <Text>Nome: {item.nome}</Text>
      <Text>Email: {item.email}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: "#44e",
          width: 24,
          height: 24,
          justifyContent: "center",
          position: "absolute",
          top: 12,
          right: 44,
          alignItems: "center",
        }}
      >
        <Feather name="edit-2" size={18} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deletar.mutate()}
        style={{
          backgroundColor: "#e44",
          width: 24,
          height: 24,
          justifyContent: "center",
          position: "absolute",
          top: 12,
          right: 12,
          alignItems: "center",
        }}
      >
        <Feather name="trash-2" size={18} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "90%",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 8,
              gap: 12,
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
              }}
            >
              <Feather name="x" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Atualizar Usuário
            </Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                borderColor: "#222",
                borderWidth: 1,
              }}
            />
            <TextInput
              placeholder="Nome"
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
              onPress={() => {
                atualizar.mutate();
                setModalVisible(false);
              }}
              style={{
                backgroundColor: "#44e",
                padding: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff" }}>Atualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
