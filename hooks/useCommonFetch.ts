import type { StrapiError } from '@/types/strapiTypes';
import type { UserType } from '@/types/strapiTypes';
import { strapiClient } from '@/services/strapiService';
import { useUserStore } from '@/stores/useUserStore';
import { useQuery } from '@tanstack/react-query';

export function useCommonFetch() {
  const { isAuthenticated, setUser, logout, user: storeUser } = useUserStore();
  const {
    data: user,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = useQuery<UserType, StrapiError>({
    queryKey: ['users', 'me'],
    queryFn: async () => {
      const user = await strapiClient.request<UserType>('get', 'users/me');
      setUser(user);
      return user;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: isAuthenticated,
  });
  return {
    isUserLoading,
    user: user || storeUser,
    refetchUser,
  };
}
