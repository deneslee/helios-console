import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/shared/api/db';
import type { WorkOrder, WorkOrderStatus } from '../model/types';

export interface WorkOrderFilters {
  status?: WorkOrderStatus | 'all';
  siteId?: string;
  assigneeId?: string;
}

export const workOrderKeys = {
  all: ['work-orders'] as const,
  list: (filters: WorkOrderFilters = {}) => [...workOrderKeys.all, 'list', filters] as const,
};

export const workOrderQueries = {
  list: (filters: WorkOrderFilters = {}) =>
    queryOptions({
      queryKey: workOrderKeys.list(filters),
      queryFn: () =>
        db.workOrders.list(
          (order) =>
            (!filters.status || filters.status === 'all' || order.status === filters.status) &&
            (!filters.siteId || order.siteId === filters.siteId) &&
            (!filters.assigneeId || order.assigneeId === filters.assigneeId),
        ),
    }),
};

/** Optimistic status change — the pattern to copy for every other mutation. */
export function useUpdateWorkOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: WorkOrderStatus }) =>
      db.workOrders.update(id, { status }),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: workOrderKeys.all });
      const previous = queryClient.getQueriesData<WorkOrder[]>({ queryKey: workOrderKeys.all });
      previous.forEach(([key, orders]) => {
        if (!orders) return;
        queryClient.setQueryData(
          key,
          orders.map((order) => (order.id === id ? { ...order, status } : order)),
        );
      });
      return { previous };
    },
    onError: (_error, _variables, context) => {
      context?.previous.forEach(([key, orders]) => queryClient.setQueryData(key, orders));
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: workOrderKeys.all }),
  });
}
