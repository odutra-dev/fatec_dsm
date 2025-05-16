import { Stack } from "expo-router/stack";
import { useEffect } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { Crud } from "../db/crud";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout() {
  useEffect(() => {
    Crud();
  }, []);

  return (
    <SQLiteProvider databaseName="sistema.db">
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="novoUsuario" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </SQLiteProvider>
  );
}
