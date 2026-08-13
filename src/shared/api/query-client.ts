import { QueryClient } from '@tanstack/react-query';
import { QUERY_DEFAULTS } from '../config/app';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_DEFAULTS.staleTime,
        gcTime: QUERY_DEFAULTS.gcTime,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
