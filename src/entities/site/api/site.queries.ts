import { queryOptions } from '@tanstack/react-query';
import { db } from '@/shared/api/db';
import type { SiteStatus } from '../model/types';

export interface SiteFilters {
  status?: SiteStatus | 'all';
  region?: string | null;
}

export const siteKeys = {
  all: ['sites'] as const,
  list: (filters: SiteFilters = {}) => [...siteKeys.all, 'list', filters] as const,
  detail: (id: string) => [...siteKeys.all, 'detail', id] as const,
};

export const siteQueries = {
  list: (filters: SiteFilters = {}) =>
    queryOptions({
      queryKey: siteKeys.list(filters),
      queryFn: () =>
        db.sites.list(
          (site) =>
            (!filters.status || filters.status === 'all' || site.status === filters.status) &&
            (!filters.region || site.region === filters.region),
        ),
    }),
  detail: (id: string) =>
    queryOptions({ queryKey: siteKeys.detail(id), queryFn: () => db.sites.get(id) }),
};
