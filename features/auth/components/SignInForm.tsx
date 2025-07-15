import React from 'react';
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Link, LinkText } from "@/components/ui/link";
import { ImageBackground } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useSignIn } from '../hooks/useSignIn';

export const SignInForm = () => {
  const { isLoading, handleSignIn } = useSignIn();

  return (
    <ImageBackground
      source={require('@/assets/images/loginbg.png')}
      className="flex-1"
    >
      <VStack className="h-full">
        <Center>
          <Image
            source={require('@/assets/images/logo.png')}
            alt="Brasão da UECE"
            className="w-150 h-218 z-10 mt-14"
          />
        </Center>
        <VStack
          className="bg-white w-full rounded-t-[50px] items-center mt-auto py-8"
        >
          <Heading size="5xl" className="text-gray-800 mt-4">
              UECE<Heading size="4xl" className="font-light text-green-600">ats</Heading>
          </Heading>
          <Text size="lg" className="text-center">Seja Bem vindo!</Text>
          <Button
            size="lg"
            onPress={handleSignIn}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 my-8 rounded-lg"
          >
            <ButtonIcon as={() => <FontAwesome name="google" size={18} color="white" className="mr-2" />} />
            <ButtonText>{isLoading ? 'Entrando...' : 'Entrar com email institucional'}</ButtonText>
          </Button>
          <Link href="#">
            <LinkText size="sm" className="text-gray-600">Ver Políticas de Privacidade e Termos de uso</LinkText>
          </Link>
          <Text size="xs" className="mt-4 text-gray-500">
              Universidade Estadual do Ceará
          </Text>
        </VStack>
      </VStack>
    </ImageBackground> 
  );
};