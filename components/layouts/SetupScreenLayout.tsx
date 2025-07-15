// C:\Users\rerse\WebstormProjects\UECEats-app\components\layouts\SetupScreenLayout.tsx
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import React from "react";

type SetupScreenLayoutProps = {
    children: React.ReactNode;
    step: number;
    title: string;
    subtitle: string;
};

export function SetupScreenLayout({ children, step, title, subtitle }: SetupScreenLayoutProps) {
  return (
    <Box className="flex-1 bg-green-100 justify-center items-center p-4">
      <VStack space="lg" className="w-full items-center">
        <Progress value={(step / 4) * 100} className="w-full max-w-md">
          <ProgressFilledTrack className="bg-green-600" />
        </Progress>
        <Text>Passo {step} de 4</Text>
      </VStack>

      <VStack space="md" className="items-center my-8">
        <Image source={require('@/assets/images/logo.png')} alt="UECEats Logo" className="w-24 h-24" resizeMode="contain" />
        <Heading className="text-gray-800">
                    UECE<Text className="text-green-600">ats</Text>
        </Heading>
        <Text className="text-center">É a primeira vez que vemos você por aqui, precisamos de mais informações</Text>
      </VStack>

      <VStack space="md" className="bg-white p-6 rounded-lg w-full max-w-md">
        <Heading size="lg">{title}</Heading>
        <Text>{subtitle}</Text>
        {children}
      </VStack>
    </Box>
  );
} 