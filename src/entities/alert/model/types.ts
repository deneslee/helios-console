import type { AlertRecord, AlertSeverity } from '@/shared/api/db';

export type SiteAlert = AlertRecord;
export type { AlertSeverity };

export const severityMeta: Record<AlertSeverity, { label: string; color: string }> = {
  info: { label: 'Info', color: 'blue' },
  warning: { label: 'Warning', color: 'solar' },
  critical: { label: 'Critical', color: 'red' },
};

export const relativeTime = (iso: string) => {
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60_000);
  if (minutes < 60) return `${Math.max(1, minutes)}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
};
