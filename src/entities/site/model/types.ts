import type { SiteRecord, SiteStatus } from '@/shared/api/db';

export type Site = SiteRecord;
export type { SiteStatus };

export const siteStatusMeta: Record<SiteStatus, { label: string; color: string }> = {
  online: { label: 'Online', color: 'teal' },
  degraded: { label: 'Degraded', color: 'solar' },
  offline: { label: 'Offline', color: 'red' },
  commissioning: { label: 'Commissioning', color: 'brand' },
};

export const utilisation = (site: Site) =>
  site.capacityMw === 0 ? 0 : Math.round((site.outputMw / site.capacityMw) * 100);
