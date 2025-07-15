import React from 'react';
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { FormControl, FormControlLabel, FormControlLabelText, FormControlError, FormControlErrorText } from "@/components/ui/form-control";
import { router } from 'expo-router';
import { SetupScreenLayout } from '@/components/layouts/SetupScreenLayout';
import { useSharedInitialSetup } from '@/features/initial-setup/providers/InitialSetupProvider';
import { Controller } from 'react-hook-form';

export default function Step1Screen() {
  const { control, user, handleSubmit } = useSharedInitialSetup();
  const onValid = (data: { nomeCompleto: string }) => {
    router.push('/initial-setup/step2');
  };
  return (
    <SetupScreenLayout
      step={1}
      title="Confirme seu nome"
      subtitle="Verifique se suas informações estão corretas"
    >
      <VStack space="lg">
        <Controller
          control={control}
          name="nomeCompleto"
          rules={{ required: 'Nome Completo é Obrigatório' }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <FormControl isInvalid={!!error}>
              <FormControlLabel>
                <FormControlLabelText>Nome Completo</FormControlLabelText>
              </FormControlLabel>
              <Input className="border-green-100">
                <InputField
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

        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>
                Email institucional
            </FormControlLabelText>
          </FormControlLabel>
          <Input isDisabled>
            <InputField value={user?.email || ''} />
          </Input>
        </FormControl>

        {/* IMPORTANT: wrap your handler with handleSubmit */}
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
