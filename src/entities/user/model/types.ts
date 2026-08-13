import type { UserRecord } from '@/shared/api/db';

export type User = UserRecord;

export const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const shiftLabel: Record<User['shift'], string> = {
  day: 'Day shift',
  night: 'Night shift',
  on_call: 'On call',
};
