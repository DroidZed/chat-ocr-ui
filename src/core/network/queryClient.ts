import { QueryClient } from '@tanstack/react-query';

export const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      staleTime: Infinity,
    },
    mutations: {
      retry: 5,
    },
  },
});
