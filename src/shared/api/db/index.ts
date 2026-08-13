import { STORAGE_KEYS } from '../../config/app';
import { createDatabase } from './create-database';
import { seed } from './seed';
import type { DbSchema } from './schema';

export const db = createDatabase<DbSchema>({ key: STORAGE_KEYS.db, seed });

export type { Table, Database } from './create-database';
export * from './schema';
export { seed };
