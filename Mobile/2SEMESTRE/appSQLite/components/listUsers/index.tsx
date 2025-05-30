import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { User } from "../../app";
import { useQueryClient, useMutation } from "@tanstack/react-query";
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
    <View style={styles.card}>
      <View>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.text}>{item.nome}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{item.email}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.iconButton, { backgroundColor: "#0acfcf" }]}
        >
          <Feather name="edit-2" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deletar.mutate()}
          style={[styles.iconButton, { backgroundColor: "#e44" }]}
        >
          <Feather name="trash-2" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Feather name="x" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Atualizar Usuário</Text>

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor="#888"
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              onPress={() => {
                atualizar.mutate();
                setModalVisible(false);
              }}
              style={styles.updateButton}
            >
              <Text style={styles.updateButtonText}>Atualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginVertical: 8,
    width: "100%",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
    marginTop: 4,
  },
  text: {
    fontSize: 16,
    color: "#222",
    marginBottom: 4,
  },
  actions: {
    flexDirection: "row",
    position: "absolute",
    right: 12,
    top: 12,
    gap: 12,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    gap: 12,
  },
  closeButton: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#222",
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f1f1f1",
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "#0acfcf",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },
  updateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
