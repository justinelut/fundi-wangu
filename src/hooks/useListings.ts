// hooks/useListings.ts
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { pb } from '../src/lib/pocketbase';
import type { Listing } from '../types/listings';

export const useListings = (perPage: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['listings'],
    queryFn: async ({ pageParam = 1 }) => {
      const resultList = await pb
        .collection('listings')
        .getList(pageParam, perPage, {
          sort: '-created',
          filter: 'featured = false',
          expand: 'category',
        });

      return {
        items: resultList.items,
        total: resultList.totalItems,
        page: pageParam,
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.items.length < perPage) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });
};

export const useFeaturedListings = () => {
  return useQuery({
    queryKey: ['featuredListings'],
    queryFn: async () => {
      const resultList = await pb
        .collection('listings')
        .getList(1, 5, {
          filter: 'featured = true',
          expand: 'category',
        });

      return resultList.items;
    },
  });
};
