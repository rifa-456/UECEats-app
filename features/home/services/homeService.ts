import { strapiSdk } from '@/api/strapi-client';
import { Restaurant } from '../types/restaurant';

/**
 * Searches for restaurants by name using the Strapi SDK.
 * @param name - The search query for the restaurant name.
 * @returns A promise that resolves to an array of restaurants.
 */
export const homeService = {
  async searchRestaurants(name: string): Promise<Restaurant[]> {
    try {
      const response = await strapiSdk.find<Restaurant[]>('restaurantes', {
        filters: {
          nomeRestaurante: {
            $containsi: name,
          },
        },
        populate: {
          usuario: {
            populate: {
              avatar: true,
            }
          }
        }
      });
      // @ts-ignore
      return response.data;
    } catch (error) {
      console.error('Failed to search restaurants:', error);
      return [];
    }
  },
};