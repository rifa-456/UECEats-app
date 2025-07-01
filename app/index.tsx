import { GoogleSignInButton } from "@/components/ui/GoogleSignInButton";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import React from "react";
import { Control, useForm } from 'react-hook-form';


import { Button, Heading, InputCheckbox, InputEmail, InputPassword, InputText, PasswordWarning } from "@/src/components";
import PageDefault from "@/src/screens/Default";
import { UserCreate } from "@/types/custom/user/UserCreateDTO";
import { Text, View } from "react-native";


const DEFAULT_FORM_VALUES = { email: "", password: "", name: "", term: false };

type FormData = {
  email: string;
  password: string;
  name: string;
  term: boolean;
};

export default function LoginScreen() {
  const { isLoading: isLoggingIn, isAuthenticated } = useAuth();

  const [isPasswordClicked, setIsPasswordClicked] = React.useState(false);

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
    const password = control._formValues.password;
    const isTermAccepted = control._formValues.term;

    const userData: UserCreate = {
      login: email,
      name,
      password,
      isTermAccepted
    };

    console.log("User Data:", userData);
  };

  return (
    <PageDefault>
      <Heading mb={10}>Bem-Vindo ao UECEats</Heading>
      <Heading fs={20} >Faça o login para continuar</Heading>
      <GoogleSignInButton />

      <View style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
      
        <InputText control={control} name="name" placeholder="Digite seu nome completo" rules={{ required: true }} />

        <InputEmail
              control={control}
              name="email"
              placeholder="Digite seu e-mail"
              rules={{ required: true }}
            />

        <InputPassword
              control={control}
              name="password"
              placeholder="Digite sua senha"
              rules={{ required: true }}
              visibleValidation
              onTouchStart={() => setIsPasswordClicked(!isPasswordClicked)}
            />
        
        {isPasswordClicked && <PasswordWarning isVisible={isPasswordClicked} />}

        <InputCheckbox
          aria-label="Eu quero me cadastrar como entregador"
          control={control}
          label={
            <>
              <Text>Eu quero ser entregador</Text>
            </>
          }
          name="term"
          value={true}
        />

        <Button
          isDisabled={!isValid}
          isLoading={isLoggingIn}
          onPress={handleSubmit(async () =>
            handleLogin(control)
            )}
          mt={20}
        >Handle Inputs
        </Button>

      </View>
    </PageDefault>
  );
}

