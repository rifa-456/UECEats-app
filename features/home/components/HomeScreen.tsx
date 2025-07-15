import React from 'react';
import { View } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { SearchBar } from './SearchBar';
import {Grid, GridItem} from '@/components/ui/grid';
import { useHome } from '../hooks/useHome';
import {Card} from "@/components/Card";
 
const categoryData = [
  {
    label: 'Salgados',
    imageSource: require('@/assets/images/salgado.png'),
    backgroundColor: 'bg-orange-100',
    textColor: 'text-orange-800',
  },
  {
    label: 'Doces',
    imageSource: require('@/assets/images/doce.png'),
    backgroundColor: 'bg-pink-100',
    textColor: 'text-pink-800',
  },
  {
    label: 'Prato Feito',
    imageSource: require('@/assets/images/pratoFeito.png'),
    backgroundColor: 'bg-green-100',
    textColor: 'text-green-800',
  },
];

export const HomeScreen = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
  } = useHome();

  const isSearching = searchQuery.trim().length > 0;
  return (
    <VStack space="md" className="flex-1 bg-white p-4 pt-8">
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="O que você deseja hoje?"
      />
      {!isSearching ? (
        <>
          <Heading size="xl" className="mt-6 mb-2">
                Categorias
          </Heading>
          <Grid className="gap-4" _extra={{ className: 'grid-cols-6' }}>
            {categoryData.map((cat) => (
              <GridItem _extra={{ className: 'col-span-3' }}
                key={cat.label} >
                <Card 
                  imageSrc={cat.imageSource}
                  title={cat.label}
                  bgColor={cat.backgroundColor}
                  onPress={() => console.log(`Navigating to category: ${cat.label}`)}
                />
              </GridItem>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Heading size="xl" className="mt-6 mb-2">
                Você procurou por {searchQuery}
          </Heading>
          <View className="flex-1">
            <SearchResults
              searchResults={searchResults}
              isLoading={isLoading}
            />
          </View>
        </>
      )}
    </VStack>
  );
};
 