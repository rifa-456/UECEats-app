import { GoogleSignInButton } from "@/components/ui/GoogleSignInButton";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import React from "react";
import { useForm } from 'react-hook-form';
import { StyleSheet, Text } from "react-native";


import { InputEmail, InputText } from "@/src/components/input";
import PageDefault from "@/src/screens/Default";

const DEFAULT_FORM_VALUES = { email: "", name: ""}

type FormData = {
  email: string;
  name: string;
};

export default function LoginScreen() {
  const { isLoading, isAuthenticated } = useAuth();

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({ defaultValues: DEFAULT_FORM_VALUES, mode: "onChange" })

  if (isLoading) {
    return null;
  }
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/welcome" />;
  }

  return (
    <PageDefault>
      <Text style={styles.title}>Bem-Vindo ao UECEats</Text>
      <Text style={styles.subtitle}>Faça o login para continuar</Text>
      <GoogleSignInButton />

      <InputText control={control} name="name" placeholder="Digite seu nome completo" rules={{ required: true }} />

      <InputEmail
            control={control}
            name="email"
            placeholder="Digite seu e-mail"
            rules={{ required: true }}
          />
    </PageDefault>
  );
}

const styles = StyleSheet.create({
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
