import React from 'react';
import { VStack, Text, Button, ButtonText, Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel, HStack } from "@/components/ui";
import { SetupScreenLayout } from '@/components/layouts/SetupScreenLayout';
import { CheckIcon } from 'lucide-react-native';
import { useSharedInitialSetup } from '@/features/initial-setup/providers/InitialSetupProvider';
import { Controller } from 'react-hook-form';

export default function Step4Screen() {
  const { control, handleSubmit, handleFinalSubmit, isLoading } = useSharedInitialSetup();

  return (
    <SetupScreenLayout
      step={4}
      title="Permissões de entregador"
      subtitle="Deseja se candidatar para ser um entregador?"
    >
      <VStack space="lg">
        <Controller
          control={control}
          name="isQuerendoSerEntregador"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              value="isApplying"
              isChecked={value}
              onChange={onChange}
              aria-label="Apply for delivery role"
            >
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>
                      Quero me candidatar para ser entregador
              </CheckboxLabel>
            </Checkbox>
          )}
        />

        <HStack space="sm" className="bg-green-100 p-3 rounded-md items-center">
          <CheckIcon size={18} className="text-green-800" />
          <Text size="sm" className="flex-1">
              Sua candidatura será analisada pela equipe do UECEats
          </Text>
        </HStack>
        <Button
          onPress={handleSubmit(handleFinalSubmit)}
          disabled={isLoading}
          className="w-full bg-green-600 mt-4"
        >
          <ButtonText>{isLoading ? 'Finalizando...' : 'Concluir Cadastro'}</ButtonText>
        </Button>
      </VStack>
    </SetupScreenLayout>
  );
} 