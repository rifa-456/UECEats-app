import {
  Pressable,
  Image,
  Text,
  HStack,
  Box,
  VStack,
} from "@/components/ui";
import React from "react";
import { ImageSourcePropType } from "react-native";

interface CardProps {
    imageSrc: ImageSourcePropType;
    title: string;
    bgColor: string;
    description?: React.ReactNode;
    price?: string;
    onPress?: () => void;
}

export const Card = ({
  imageSrc,
  title,
  description,
  price,
  bgColor,
  onPress,
}: CardProps) => {
  let formattedPrice;
  if (price){
    formattedPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(price));
  }
  return (
    <Pressable
      onPress={onPress}
      className={`${bgColor} rounded-2xl overflow-hidden w-full`}
    >
      <HStack className="p-4 items-center">
        <Image
          source={imageSrc}
          alt={title}
          className="w-24 h-24"
        />
        <VStack className="p-4 flex-1">
          <Text className="text-lg font-semibold text-gray-900">{title}</Text>
          {description && (
            <Text className="mt-1">{description}</Text>
          )}
          {formattedPrice != null && (
            <Box className="mt-2">
              <Text className="text-base font-bold text-blue-600">{formattedPrice}</Text>
            </Box>
          )}
        </VStack>
      </HStack>
    </Pressable>
  );
}; 