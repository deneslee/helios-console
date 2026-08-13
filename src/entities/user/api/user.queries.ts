import { queryOptions } from '@tanstack/react-query';
import { db } from '@/shared/api/db';

export const userKeys = {
  all: ['users'] as const,
  list: () => [...userKeys.all, 'list'] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
};

export const userQueries = {
  list: () => queryOptions({ queryKey: userKeys.list(), queryFn: () => db.users.list() }),
  detail: (id: string) =>
    queryOptions({ queryKey: userKeys.detail(id), queryFn: () => db.users.get(id) }),
};
