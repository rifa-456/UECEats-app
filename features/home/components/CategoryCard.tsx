import React from 'react';
import { GridItem } from '@/components/ui/grid';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { ImageSourcePropType } from 'react-native';

interface CategoryCardProps {
    label: string;
    imageSource: ImageSourcePropType;
    backgroundColor: string;
    textColor: string;
    onPress: () => void;
}

export const CategoryCard = ({
  label,
  imageSource,
  backgroundColor,
  textColor,
  onPress
}: CategoryCardProps) => {
  return (
    <GridItem _extra={{ className: "col-span-3" }}>
      <Pressable
        onPress={onPress}
        className={`${backgroundColor} rounded-lg p-3 flex-row justify-between items-center h-24`}
      >
        <Text className={`font-bold text-lg ${textColor}`}>{label}</Text>
        <Image
          source={imageSource}
          alt={label}
          className="w-16 h-16"
          resizeMode="contain"
        />
      </Pressable>
    </GridItem>
  );
}; 