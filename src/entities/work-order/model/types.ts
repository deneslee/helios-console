import type { WorkOrderPriority, WorkOrderRecord, WorkOrderStatus } from '@/shared/api/db';

export type WorkOrder = WorkOrderRecord;
export type { WorkOrderPriority, WorkOrderStatus };

export const workOrderStatusMeta: Record<WorkOrderStatus, { label: string; color: string }> = {
  open: { label: 'Open', color: 'gray' },
  in_progress: { label: 'In progress', color: 'brand' },
  blocked: { label: 'Blocked', color: 'red' },
  done: { label: 'Done', color: 'teal' },
};

export const priorityMeta: Record<WorkOrderPriority, { label: string; color: string }> = {
  low: { label: 'Low', color: 'gray' },
  normal: { label: 'Normal', color: 'blue' },
  high: { label: 'High', color: 'solar' },
  critical: { label: 'Critical', color: 'red' },
};

export const isOpen = (order: WorkOrder) => order.status !== 'done';

export const dueLabel = (iso: string) => {
  const days = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return 'Due today';
  return `Due in ${days}d`;
};
