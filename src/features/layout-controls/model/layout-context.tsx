import { createContext, useContext, useMemo, type Dispatch, type ReactNode } from 'react';
import { useHotkeys, useMediaQuery } from '@mantine/hooks';
import { LAYOUT, STORAGE_KEYS } from '@/shared/config/app';
import { usePersistentReducer } from '@/shared/lib/hooks';
import { initialLayoutState, layoutReducer } from './layout-reducer';
import type { LayoutAction, LayoutState } from './types';

export interface LayoutActions {
  toggleSidenav: () => void;
  cycleSidenav: () => void;
  toggleSidenavCompact: () => void;
  toggleSidenavDock: () => void;
  setSidenavWidth: (width: number) => void;
  setSidenavMode: (mode: LayoutState['sidenav']['mode']) => void;
  toggleContextbar: () => void;
  openContextbar: (panel?: string) => void;
  closeContextbar: () => void;
  setContextbarPanel: (panel: string) => void;
  toggleContextbarDock: () => void;
  setContextbarWidth: (width: number) => void;
  resetLayout: () => void;
}

interface LayoutContextValue {
  /** What the shell should actually render right now (mobile rules applied). */
  layout: LayoutState;
  /** What the user chose — show this in settings, not the resolved value. */
  preferences: LayoutState;
  isMobile: boolean;
  actions: LayoutActions;
  dispatch: Dispatch<LayoutAction>;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

/** On narrow screens panels always float and the sidenav starts closed. */
function resolveForViewport(state: LayoutState, isMobile: boolean): LayoutState {
  if (!isMobile) return state;
  return {
    sidenav: {
      ...state.sidenav,
      docked: false,
      mode: state.sidenav.mode === 'compact' ? 'expanded' : state.sidenav.mode,
    },
    contextbar: { ...state.contextbar, docked: false },
  };
}

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = usePersistentReducer(
    STORAGE_KEYS.layout,
    layoutReducer,
    initialLayoutState,
  );
  const isMobile = useMediaQuery(LAYOUT.mobileQuery, false, { getInitialValueInEffect: false });

  const actions = useMemo<LayoutActions>(
    () => ({
      toggleSidenav: () => dispatch({ type: 'sidenav/toggle' }),
      cycleSidenav: () => dispatch({ type: 'sidenav/cycle' }),
      toggleSidenavCompact: () => dispatch({ type: 'sidenav/toggleCompact' }),
      toggleSidenavDock: () => dispatch({ type: 'sidenav/toggleDock' }),
      setSidenavWidth: (width) => dispatch({ type: 'sidenav/setWidth', width }),
      setSidenavMode: (mode) => dispatch({ type: 'sidenav/setMode', mode }),
      toggleContextbar: () => dispatch({ type: 'contextbar/toggle' }),
      openContextbar: (panel) => dispatch({ type: 'contextbar/open', panel }),
      closeContextbar: () => dispatch({ type: 'contextbar/close' }),
      setContextbarPanel: (panel) => dispatch({ type: 'contextbar/setPanel', panel }),
      toggleContextbarDock: () => dispatch({ type: 'contextbar/toggleDock' }),
      setContextbarWidth: (width) => dispatch({ type: 'contextbar/setWidth', width }),
      resetLayout: () => dispatch({ type: 'layout/reset' }),
    }),
    [dispatch],
  );

  useHotkeys([
    ['mod+B', actions.toggleSidenav],
    ['mod+J', actions.toggleContextbar],
    ['mod+shift+B', actions.toggleSidenavCompact],
  ]);

  const value = useMemo<LayoutContextValue>(
    () => ({
      layout: resolveForViewport(state, Boolean(isMobile)),
      preferences: state,
      isMobile: Boolean(isMobile),
      actions,
      dispatch,
    }),
    [state, isMobile, actions, dispatch],
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) throw new Error('useLayout must be used inside <LayoutProvider>');
  return context;
}
