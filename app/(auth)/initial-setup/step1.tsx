// app/(auth)/initial-setup/step1.tsx
import React from "react";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Controller } from "react-hook-form";
import { router } from "expo-router";
import { useSharedInitialSetup } from "@/features/initial-setup/providers/InitialSetupProvider";
import { SetupScreenLayout } from "@/components/layouts/SetupScreenLayout";

export default function Step1Screen() {
  const { control, user, handleSubmit } = useSharedInitialSetup();
  const onValid = () => {
    router.push("/initial-setup/step2");
  };

  return (
    <SetupScreenLayout
      step={1}
      title="Confirme seu nome"
      subtitle="Verifique se suas informações estão corretas"
      onNext={handleSubmit(onValid)}
    >
      <VStack space="lg">
        <Controller
          control={control}
          name="nomeCompleto"
          rules={{ required: "Nome Completo é Obrigatório" }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <FormControl isInvalid={!!error}>
              <FormControlLabel>
                <FormControlLabelText>Nome Completo</FormControlLabelText>
              </FormControlLabel>
              <Input className="border-green-200">
                <InputField
                  placeholder="Digite seu nome completo"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className="h-12 px-3"
                />
              </Input>
              <FormControlError>
                <FormControlErrorText>
                  {error?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
        />
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Email institucional</FormControlLabelText>
          </FormControlLabel>
          <Input isDisabled className="border border-gray-200 rounded-md">
            <InputField
              value={user?.email || ""}
              className="h-12 px-3 bg-gray-50"
            />
          </Input>
        </FormControl>
      </VStack>
    </SetupScreenLayout>
  );
}
 