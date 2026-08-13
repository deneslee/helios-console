/**
 * Single source of truth for shell dimensions and persistence keys.
 * Change a number here and every panel, transition and CSS variable follows.
 */
export const APP = {
  name: 'Helios',
  tagline: 'grid operations console',
} as const;

export const LAYOUT = {
  headerHeight: 56,
  sidenav: {
    defaultWidth: 248,
    minWidth: 200,
    maxWidth: 420,
    compactWidth: 64,
  },
  contextbar: {
    defaultWidth: 340,
    minWidth: 260,
    maxWidth: 640,
  },
  /** Below this width the shell forces both panels into floating (undocked) mode. */
  mobileQuery: '(max-width: 62em)',
} as const;

export const STORAGE_KEYS = {
  layout: 'helios.layout.v1',
  colorScheme: 'helios.color-scheme',
  db: 'helios.db.v1',
} as const;

export const QUERY_DEFAULTS = {
  staleTime: 30_000,
  gcTime: 5 * 60_000,
} as const;
