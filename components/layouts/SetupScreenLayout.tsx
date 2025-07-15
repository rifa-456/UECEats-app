import React from "react";
import { ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import {Center} from "@/components/ui";
import { ChevronRight } from "lucide-react-native";

type Props = {
    step: number;
    title: string;
    subtitle: string;
    onNext: () => void;
    nextLabel?: string;
    children: React.ReactNode;
};

export function SetupScreenLayout({
  step,
  title,
  subtitle,
  onNext,
  nextLabel = "Continuar",
  children,
}: Props) {
  const progressValue = (step / 4) * 100;

  return (
    <Box className="flex-1 bg-green-50">
      <Box className="bg-white pb-4 pt-6 px-4">
        <Text className="text-base font-semibold text-gray-800 text-center">
                    Configuração Inicial
        </Text>
        <Text className="text-sm text-gray-600 text-center mt-1">
                    Passo {step} de 4
        </Text>
        <Progress
          value={progressValue}
          className="mt-3 h-2 rounded-full bg-gray-200"
        >
          <ProgressFilledTrack className="bg-green-600 rounded-full" />
        </Progress>
      </Box>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-4 pt-6"
      >
        <VStack space="md" className="items-center mb-6">
          <Image
            source={require("@/assets/images/logoNoShadow.png")}
            alt="UECEats Logo"
            className="w-[75] h-[100]"
          />
          <Heading size="5xl" className="text-gray-800 mt-4">
                UECE<Heading size="4xl" className="font-light text-green-600">ats</Heading>
          </Heading>
          <Text className="text-center text-gray-700 px-4">
            É a primeira vez que vemos você por aqui, precisamos de mais informações
          </Text>
        </VStack>
        <Box className="bg-white rounded-2xl p-6 shadow">
          <Heading size="lg" className="font-semibold">
            {title}
          </Heading>
          <Text className="text-gray-600 mb-4">{subtitle}</Text>
          {children}
        </Box>
      </ScrollView>
      <Box className="bg-white p-4">
        <Center>
          <Button
            onPress={onNext}
            className="bg-green-600 h-12 rounded-md w-[75%]"
          >
            <ButtonText className="text-white">{nextLabel}</ButtonText>
            <ChevronRight size={18} color="white" />
          </Button>
        </Center>
      </Box>
    </Box>
  );
} 