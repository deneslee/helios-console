import { useEffect, useReducer, type Reducer } from 'react';
import { storage } from '../storage/local-storage';

/**
 * useReducer + localStorage. `migrate` lets you reconcile a persisted shape
 * with the current defaults, so adding a field never breaks a returning user.
 */
export function usePersistentReducer<S, A>(
  key: string,
  reducer: Reducer<S, A>,
  initialState: S,
  migrate: (persisted: unknown, initial: S) => S = (persisted, initial) =>
    persisted && typeof persisted === 'object' ? { ...initial, ...(persisted as S) } : initial,
) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) =>
    migrate(storage.read<unknown>(key, null), initial),
  );

  useEffect(() => {
    storage.write(key, state);
  }, [key, state]);

  return [state, dispatch] as const;
}
