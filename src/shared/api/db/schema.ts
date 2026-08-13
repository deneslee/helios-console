/**
 * Raw record shapes stored in the fake database.
 * Entities re-export these as domain types — swap this file (and `seed.ts`)
 * for a real API client and nothing above the shared layer changes.
 */
export interface DbRecord {
  id: string;
}

export type SiteStatus = 'online' | 'degraded' | 'offline' | 'commissioning';

export interface SiteRecord extends DbRecord {
  name: string;
  region: string;
  status: SiteStatus;
  capacityMw: number;
  outputMw: number;
  uptime: number;
  leadId: string;
  commissionedAt: string;
}

export type WorkOrderPriority = 'low' | 'normal' | 'high' | 'critical';
export type WorkOrderStatus = 'open' | 'in_progress' | 'blocked' | 'done';

export interface WorkOrderRecord extends DbRecord {
  title: string;
  siteId: string;
  assigneeId: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  dueAt: string;
}

export interface UserRecord extends DbRecord {
  name: string;
  role: string;
  email: string;
  shift: 'day' | 'night' | 'on_call';
  online: boolean;
}

export type AlertSeverity = 'info' | 'warning' | 'critical';

export interface AlertRecord extends DbRecord {
  title: string;
  detail: string;
  severity: AlertSeverity;
  siteId: string;
  createdAt: string;
  acknowledged: boolean;
}

export interface DbSchema {
  users: UserRecord[];
  sites: SiteRecord[];
  workOrders: WorkOrderRecord[];
  alerts: AlertRecord[];
}
