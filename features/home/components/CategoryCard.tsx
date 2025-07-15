import React from 'react';
import { GridItem } from '@/components/ui/grid';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { ImageSourcePropType } from 'react-native';

interface CategoryCardProps {
    label: string;
    imageSource: ImageSourcePropType;
    /** NativeWind background-color class, e.g. "bg-[#CF7E2C]" */
    backgroundColor: string;
    /** NativeWind text-color class, e.g. "text-[#FFFFFF]" */
    textColor: string;
    /** Optional price string, e.g. "$12.99" */
    price?: string;
    onPress: () => void;
}

export const CategoryCard = ({
  label,
  imageSource,
  backgroundColor,
  textColor,
  price,
  onPress,
}: CategoryCardProps) => {
  return (
    <GridItem _extra={{ className: 'col-span-3' }}>
      <Pressable
        onPress={onPress}
        className={
          `${backgroundColor} w-[371px] h-[86px] rounded-[20px] overflow-hidden flex-row items-center`
        }
      >
        <Text className={`font-bold text-[16px] ${textColor} flex-1 pl-[10px]`}>{label}</Text>

        {price && (
          <Text className="w-[60px] text-[14px] font-bold text-right ${textColor}">{price}</Text>
        )}

        <Image
          source={imageSource}
          alt={label}
          className="w-[100px] h-full"
          resizeMode="contain"
        />
      </Pressable>
    </GridItem>
  );
};