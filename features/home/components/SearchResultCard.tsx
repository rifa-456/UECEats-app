// import React from 'react';
// import { View, Image, TouchableOpacity } from 'react-native';
// import { VStack } from '@/components/ui/vstack';
// import { Text } from '@/components/ui/text';
// import { Restaurant } from '../types/restaurant';
// import {config} from "@/utils/config";
//
// interface SearchResultCardProps {
//     restaurant: Restaurant
//     onPress?: () => void
// }
//
// export const SearchResultCard = ({ restaurant, onPress }: SearchResultCardProps) => (
//   <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
//     <VStack className="flex-row items-center justify-between p-4 mb-3 rounded-lg bg-orange-100">
//       <View className="flex-row items-center">
//         <Image
//           source={'@/assets/images/pratoFeito.png'}
//           style={{ width: 48, height: 48, borderRadius: 24 }}
//         />
//         <VStack className="ml-3">
//           <Text size="md" className="font-bold text-orange-800">
//             {restaurant.nomeRestaurante}
//           </Text>
//           <View className="flex-row items-center mt-1">
//             <Text className="text-yellow-600 mr-1">★</Text>
//             <Text className="text-orange-800">{restaurant.averageReview.toFixed(1)}</Text>
//           </View>
//         </VStack>
//       </View>
//       <Image
//         source={require('@/assets/images/salgado.png')}
//         style={{ width: 64, height: 64, borderRadius: 8 }}
//       />
//     </VStack>
//   </TouchableOpacity>
// );
//