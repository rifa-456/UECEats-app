import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Restaurant } from '../types/restaurant';

interface RestaurantCardProps {
    restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <VStack className="p-4 border-b border-gray-200 rounded-lg mb-2 bg-gray-50">
      <Text size="md" className="font-bold">{restaurant.nomeRestaurante}</Text>
    </VStack>
  );
}; 