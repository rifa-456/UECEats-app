import { GoogleSignInButton } from "@/components/ui/GoogleSignInButton";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import React from "react";
import { Control, useForm } from 'react-hook-form';


import { Heading, InputEmail, InputText } from "@/src/components";
import PageDefault from "@/src/screens/Default";
import { UserCreate } from "@/types/custom/user/UserCreateDTO";

const DEFAULT_FORM_VALUES = { email: "", name: ""}

type FormData = {
  email: string;
  name: string;
};

export default function LoginScreen() {
  const { isLoading: isLoggingIn, isAuthenticated } = useAuth();

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({ defaultValues: DEFAULT_FORM_VALUES, mode: "onChange" })

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/welcome" />;
  }

  const handleLogin = async (control: Control<FormData>) => {
    const email = control._formValues.email;
    const name = control._formValues.name;

    const userData: UserCreate = {
      login: email,
      name
    };

    console.log("User Data:", userData);
  };

  return (
    <PageDefault>
      <Heading mb={10}>Bem-Vindo ao UECEats</Heading>
      <Heading fs={20} >Faça o login para continuar</Heading>
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

