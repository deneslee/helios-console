import { LAYOUT } from '@/shared/config/app';
import type { LayoutAction, LayoutState, SidenavMode } from './types';

export const initialLayoutState: LayoutState = {
  sidenav: {
    mode: 'expanded',
    docked: true,
    width: LAYOUT.sidenav.defaultWidth,
    lastVisibleMode: 'expanded',
  },
  contextbar: {
    open: false,
    docked: true,
    width: LAYOUT.contextbar.defaultWidth,
    panel: 'alerts',
  },
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Math.round(value)));

const nextInCycle: Record<SidenavMode, SidenavMode> = {
  expanded: 'compact',
  compact: 'hidden',
  hidden: 'expanded',
};

/** Pure — every shell behaviour is expressible as one of these transitions. */
export function layoutReducer(state: LayoutState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case 'sidenav/setMode':
      return {
        ...state,
        sidenav: {
          ...state.sidenav,
          mode: action.mode,
          lastVisibleMode: action.mode === 'hidden' ? state.sidenav.lastVisibleMode : action.mode,
        },
      };

    case 'sidenav/toggle': {
      const mode = state.sidenav.mode === 'hidden' ? state.sidenav.lastVisibleMode : 'hidden';
      return { ...state, sidenav: { ...state.sidenav, mode } };
    }

    case 'sidenav/cycle': {
      const mode = nextInCycle[state.sidenav.mode];
      return {
        ...state,
        sidenav: {
          ...state.sidenav,
          mode,
          lastVisibleMode: mode === 'hidden' ? state.sidenav.lastVisibleMode : mode,
        },
      };
    }

    case 'sidenav/toggleCompact': {
      const mode = state.sidenav.mode === 'compact' ? 'expanded' : 'compact';
      return { ...state, sidenav: { ...state.sidenav, mode, lastVisibleMode: mode } };
    }

    case 'sidenav/toggleDock':
      return { ...state, sidenav: { ...state.sidenav, docked: !state.sidenav.docked } };

    case 'sidenav/setWidth':
      return {
        ...state,
        sidenav: {
          ...state.sidenav,
          width: clamp(action.width, LAYOUT.sidenav.minWidth, LAYOUT.sidenav.maxWidth),
        },
      };

    case 'contextbar/toggle':
      return { ...state, contextbar: { ...state.contextbar, open: !state.contextbar.open } };

    case 'contextbar/open':
      return {
        ...state,
        contextbar: {
          ...state.contextbar,
          open: true,
          panel: action.panel ?? state.contextbar.panel,
        },
      };

    case 'contextbar/close':
      return { ...state, contextbar: { ...state.contextbar, open: false } };

    case 'contextbar/setPanel':
      return { ...state, contextbar: { ...state.contextbar, panel: action.panel, open: true } };

    case 'contextbar/toggleDock':
      return { ...state, contextbar: { ...state.contextbar, docked: !state.contextbar.docked } };

    case 'contextbar/setWidth':
      return {
        ...state,
        contextbar: {
          ...state.contextbar,
          width: clamp(action.width, LAYOUT.contextbar.minWidth, LAYOUT.contextbar.maxWidth),
        },
      };

    case 'layout/reset':
      return initialLayoutState;

    default:
      return state;
  }
}
