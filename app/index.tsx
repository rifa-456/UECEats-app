import { GoogleSignInButton } from "@/components/ui/GoogleSignInButton";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  const { isLoading, isAuthenticated } = useAuth();
  if (isLoading) {
    return null;
  }
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/welcome" />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to UECEats</Text>
      <Text style={styles.subtitle}>Please sign in to continue</Text>
      <GoogleSignInButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
});
