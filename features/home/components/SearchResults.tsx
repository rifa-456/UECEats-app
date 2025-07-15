import React from 'react';
import { FlatList, View } from 'react-native';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { SearchResultCard } from './SearchResultCard';
import { useHome } from '../hooks/useHome';

export const SearchResults = () => {
  const { searchResults, isLoading } = useHome();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner size="large" />
      </View>
    );
  }

  if (searchResults.length === 0) {
    return (
      <Text className="text-center text-gray-500 mt-8">
                Nenhum restaurante encontrado.
      </Text>
    ); 
  }

  return (
    <FlatList
      data={searchResults}
      renderItem={({ item }) => (
        <SearchResultCard
          restaurant={item}
          onPress={() => console.log('go to', item.id)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  );
};
