import { useState, useEffect, useMemo } from 'react';
import { homeService } from '../services/homeService';
import { Restaurant } from '../types/restaurant';
import debounce from 'lodash.debounce';

export const useHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const results = await homeService.searchRestaurants(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useMemo(() => debounce(performSearch, 500), []);
  useEffect(() => {
    void debouncedSearch(searchQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);
  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
  };
};