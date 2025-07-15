import React from "react";
import {
  VStack,
  Text,
  Box,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Pressable,
  Icon,
} from "@/components/ui";
import { Camera } from "lucide-react-native";
import { router } from "expo-router";
import { SetupScreenLayout } from "@/components/layouts/SetupScreenLayout";
import { useSharedInitialSetup } from "@/features/initial-setup/providers/InitialSetupProvider";
import { Controller } from "react-hook-form";

export default function Step2Screen() {
  const { control, user, handleProfilePictureChange } = useSharedInitialSetup();
  const handleContinue = () => {
    router.push("/initial-setup/step3");
  };

  return (
    <SetupScreenLayout
      step={2}
      title="Sua foto de perfil está correta?"
      subtitle="Confirme ou altere sua foto de perfil"
      onNext={handleContinue}
    >
      <VStack space="lg" className="items-center">
        <Controller
          control={control}
          name="avatar"
          render={({ field: { value } }) => (
            <Pressable onPress={handleProfilePictureChange} className="relative">
              <Avatar size="2xl"
                style={{
                  borderWidth: 3,
                  borderColor: "#bbf7d0",
                }}>
                <AvatarFallbackText>
                  {user?.username?.charAt(0)?.toUpperCase()}
                </AvatarFallbackText>
                {value && (
                  <AvatarImage source={{ uri: value }} alt="Profile Picture" />
                )}
              </Avatar>
              <Box className="absolute bottom-1 right-1 bg-green-600 p-2 rounded-full">
                <Icon as={Camera} color="white" />
              </Box>
            </Pressable>
          )}
        />
        <Text>Toque no ícone da câmera para alterar sua foto</Text>
      </VStack>
    </SetupScreenLayout>
  );
}