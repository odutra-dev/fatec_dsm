import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import { selectUsuarios } from "../db/crud";
import ListUsers from "../components/listUsers";

import { router } from "expo-router";

import { useQuery } from "@tanstack/react-query";
import { Feather } from "@expo/vector-icons";

export type User = {
  id: number;
  nome: string;
  email: string;
};

export default function index() {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => selectUsuarios(),
  });

  return (
    <View
      style={{
        padding: 24,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <Text style={{ fontWeight: "700", fontSize: 24 }}>Usuários:</Text>

      <FlatList
        data={query.data}
        keyExtractor={(item: User) => item.id.toString()}
        style={{ width: "100%" }}
        renderItem={({ item }) => <ListUsers item={item as User} />}
      />

      <TouchableOpacity
        onPress={() => router.push("/novoUsuario")}
        style={{
          backgroundColor: "#e44",
          width: 48,
          height: 48,
          justifyContent: "center",
          borderRadius: 24,
          position: "absolute",
          bottom: 24,
          right: 24,
          alignItems: "center",
        }}
        activeOpacity={0.8}
      >
        <Feather name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}
