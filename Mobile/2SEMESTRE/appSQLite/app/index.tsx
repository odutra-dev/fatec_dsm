import { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import { selectUsuarios } from "../db/crud";
import ListUsers from "../components/listUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";

export type User = {
  id: number;
  nome: string;
  email: string;
};

export default function Index() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const name = await AsyncStorage.getItem("userName");
      if (!name) {
        router.replace("/login");
      } else {
        setUserName(name);
      }
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userName");
    router.replace("/login");
  };

  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => selectUsuarios(),
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          Bem-vindo{userName ? `, ${userName}` : ""}!
        </Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>Lista de Usuários:</Text>

      <FlatList
        data={query.data}
        keyExtractor={(item: User) => item.id.toString()}
        style={{ width: "100%" }}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => <ListUsers item={item as User} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    maxWidth: "80%",
  },
  logoutButton: {
    backgroundColor: "#e44",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
});