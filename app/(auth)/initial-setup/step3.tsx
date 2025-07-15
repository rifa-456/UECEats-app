import React from 'react';
import {
  VStack,
  Button,
  ButtonText,
  Input,
  InputField,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText
} from "@/components/ui";
import { router } from 'expo-router';
import { SetupScreenLayout } from '@/components/layouts/SetupScreenLayout';
import { useSharedInitialSetup } from '@/features/initial-setup/providers/InitialSetupProvider';
import { Controller } from 'react-hook-form';

export default function Step3Screen() {
  const { control, handleSubmit } = useSharedInitialSetup();
  const onValid = (data: { matricula: string }) => {
    router.push('/initial-setup/step4');
  };
 
  return (
    <SetupScreenLayout
      step={3}
      title="Digite seu número de matrícula"
      subtitle="Informe seu número de matrícula para validação"
    >
      <VStack space="lg">
        <Controller
          control={control}
          name="matricula"
          rules={{
            required: 'Matrícula é obrigatória',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Por favor, digite apenas números',
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
              <Input className="border-green-100">
                <InputField
                  placeholder="20231234567"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
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
        <Button
          onPress={handleSubmit(onValid)}
          className="w-full bg-green-600 mt-4"
        >
          <ButtonText>Continuar</ButtonText>
        </Button>
      </VStack>
    </SetupScreenLayout>
  );
}