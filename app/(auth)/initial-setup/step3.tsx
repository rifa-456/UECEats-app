import React from "react";
import {
  VStack,
  Input,
  InputField,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui";
import { router } from "expo-router";
import { SetupScreenLayout } from "@/components/layouts/SetupScreenLayout";
import { useSharedInitialSetup } from "@/features/initial-setup/providers/InitialSetupProvider";
import { Controller } from "react-hook-form";

export default function Step3Screen() {
  const { control, handleSubmit } = useSharedInitialSetup();
  const onValid = () => {
    router.push("/initial-setup/step4");
  };
  return (
    <SetupScreenLayout
      step={3}
      title="Digite seu número de matrícula"
      subtitle="Informe seu número de matrícula para validação"
      onNext={handleSubmit(onValid)}
    >
      <VStack space="lg">
        <Controller
          control={control}
          name="matricula"
          rules={{
            required: "Matrícula é obrigatória",
            pattern: {
              value: /^[0-9]+$/,
              message: "Por favor, digite apenas números",
            },
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <FormControl isInvalid={!!error}>
              <FormControlLabel>
                <FormControlLabelText>
                                    Número de matrícula
                </FormControlLabelText>
              </FormControlLabel>
              <Input className="border border-gray-200 rounded-md">
                <InputField
                  placeholder="20231234567"
                  keyboardType="numeric"
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
      </VStack>
    </SetupScreenLayout>
  );
} 