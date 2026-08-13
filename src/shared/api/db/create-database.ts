import { storage } from '../../lib/storage/local-storage';
import type { DbRecord } from './schema';

export interface Table<T extends DbRecord> {
  list(predicate?: (item: T) => boolean): Promise<T[]>;
  get(id: string): Promise<T | null>;
  create(input: Omit<T, 'id'> & Partial<DbRecord>): Promise<T>;
  update(id: string, patch: Partial<Omit<T, 'id'>>): Promise<T>;
  remove(id: string): Promise<void>;
}

export type Database<S extends { [K in keyof S]: DbRecord[] }> = {
  [K in keyof S]: Table<S[K][number]>;
} & {
  reset(): Promise<void>;
  snapshot(): S;
};

interface CreateDatabaseOptions<S> {
  key: string;
  seed: S;
  /** Simulated latency range in ms — set to [0, 0] for instant responses in tests. */
  latency?: [number, number];
}

const wait = ([min, max]: [number, number]) =>
  new Promise<void>((resolve) => setTimeout(resolve, min + Math.random() * (max - min)));

const uid = () => Math.random().toString(36).slice(2, 10);

/**
 * A tiny persisted, promise-based "database".
 * It exists so the UI can be built against a real async data layer today and
 * swapped for HTTP tomorrow: only the api segment of each entity touches it.
 */
export function createDatabase<S extends { [K in keyof S]: DbRecord[] }>({
  key,
  seed,
  latency = [120, 320],
}: CreateDatabaseOptions<S>): Database<S> {
  const clone = (value: S): S => JSON.parse(JSON.stringify(value)) as S;
  let state: S = { ...clone(seed), ...storage.read<Partial<S>>(key, {}) } as S;

  const persist = () => storage.write(key, state);

  const makeTable = <T extends DbRecord>(name: keyof S): Table<T> => {
    const rows = () => state[name] as unknown as T[];
    const setRows = (next: T[]) => {
      state = { ...state, [name]: next } as S;
      persist();
    };

    return {
      async list(predicate) {
        await wait(latency);
        const all = rows().map((row) => ({ ...row }));
        return predicate ? all.filter(predicate) : all;
      },
      async get(id) {
        await wait(latency);
        const found = rows().find((row) => row.id === id);
        return found ? { ...found } : null;
      },
      async create(input) {
        await wait(latency);
        const record = { id: uid(), ...input } as unknown as T;
        setRows([...rows(), record]);
        return { ...record };
      },
      async update(id, patch) {
        await wait(latency);
        const current = rows().find((row) => row.id === id);
        if (!current) throw new Error(`${String(name)}: no record with id "${id}"`);
        const next = { ...current, ...patch } as unknown as T;
        setRows(rows().map((row) => (row.id === id ? next : row)));
        return { ...next };
      },
      async remove(id) {
        await wait(latency);
        setRows(rows().filter((row) => row.id !== id));
      },
    };
  };

  const tables: Record<string, unknown> = Object.fromEntries(
    Object.keys(seed).map((name) => [name, makeTable(name as keyof S)]),
  );

  return Object.assign(tables, {
    async reset() {
      state = clone(seed);
      storage.remove(key);
    },
    snapshot: () => clone(state),
  }) as unknown as Database<S>;
}
