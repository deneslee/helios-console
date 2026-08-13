import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/shared/api/db';

export interface AlertFilters {
  acknowledged?: boolean;
  siteId?: string;
}

export const alertKeys = {
  all: ['alerts'] as const,
  list: (filters: AlertFilters = {}) => [...alertKeys.all, 'list', filters] as const,
};

export const alertQueries = {
  list: (filters: AlertFilters = {}) =>
    queryOptions({
      queryKey: alertKeys.list(filters),
      queryFn: () =>
        db.alerts.list(
          (alert) =>
            (filters.acknowledged === undefined || alert.acknowledged === filters.acknowledged) &&
            (!filters.siteId || alert.siteId === filters.siteId),
        ),
      refetchInterval: 60_000,
    }),
};

export function useAcknowledgeAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => db.alerts.update(id, { acknowledged: true }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: alertKeys.all }),
  });
}
