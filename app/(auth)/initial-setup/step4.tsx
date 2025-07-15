import React from "react";
import {
  VStack,
  Text,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  HStack,
  Box,
} from "@/components/ui";
import { SetupScreenLayout } from "@/components/layouts/SetupScreenLayout";
import { CheckIcon } from "lucide-react-native";
import { useSharedInitialSetup } from "@/features/initial-setup/providers/InitialSetupProvider";
import { Controller } from "react-hook-form";

export default function Step4Screen() {
  const { control, handleSubmit, handleFinalSubmit, isLoading } =
      useSharedInitialSetup();

  return (
    <SetupScreenLayout
      step={4}
      title="Permissões de entregador"
      subtitle="Deseja se candidatar para ser um entregador?"
      onNext={handleSubmit(handleFinalSubmit)}
      nextLabel={isLoading ? "Finalizando..." : "Concluir Cadastro"}
    >
      <VStack space="lg">
        <Box className="border border-green-600 rounded-md p-3">
          <Controller
            control={control}
            name="isQuerendoSerEntregador"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                value="isApplying"
                isChecked={value}
                onChange={onChange}
              >
                <CheckboxIndicator className="mr-2">
                  <CheckboxIcon as={CheckIcon}/>
                </CheckboxIndicator>
                <CheckboxLabel>
                        Quero me candidatar para ser entregador
                </CheckboxLabel>
              </Checkbox>
            )}
          />
          <Text size="sm" className="mt-2 text-gray-700">
              Como entregador, você poderá ganhar uma renda extra fazendo entregas
              para outros estudantes.
          </Text>
        </Box>
        <HStack
          space="sm"
          className="border border-green-800 bg-green-100 p-3 rounded-md items-center"
        >
          <CheckIcon size={18} className="text-green-800" />
          <Text size="sm" className="flex-1">
              Sua candidatura será analisada pela equipe do UECEats
          </Text>
        </HStack>
      </VStack>
    </SetupScreenLayout>
  );
}
