import { useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { searchAll, type SearchResult } from '@/shared/api/db/search';

export type { SearchResult };

/** Debounced, cached search across the whole dataset. */
export function useGlobalSearch(minLength = 2) {
  const [term, setTerm] = useState('');
  const [debounced] = useDebouncedValue(term, 200);
  const enabled = debounced.trim().length >= minLength;

  const query = useQuery({
    queryKey: ['search', debounced],
    queryFn: () => searchAll(debounced),
    enabled,
    staleTime: 15_000,
  });

  return {
    term,
    setTerm,
    enabled,
    results: query.data ?? [],
    isPending: enabled && query.isFetching,
  };
}
