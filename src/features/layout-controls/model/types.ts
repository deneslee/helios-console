export type SidenavMode = 'expanded' | 'compact' | 'hidden';

export interface SidenavState {
  mode: SidenavMode;
  /** docked = takes a grid column next to the content; undocked = floats above it. */
  docked: boolean;
  width: number;
  /** Restored when the user re-opens a hidden sidenav. */
  lastVisibleMode: Exclude<SidenavMode, 'hidden'>;
}

export interface ContextbarState {
  open: boolean;
  docked: boolean;
  width: number;
  panel: string;
}

export interface LayoutState {
  sidenav: SidenavState;
  contextbar: ContextbarState;
}

export type LayoutAction =
  | { type: 'sidenav/setMode'; mode: SidenavMode }
  | { type: 'sidenav/toggle' }
  | { type: 'sidenav/cycle' }
  | { type: 'sidenav/toggleCompact' }
  | { type: 'sidenav/toggleDock' }
  | { type: 'sidenav/setWidth'; width: number }
  | { type: 'contextbar/toggle' }
  | { type: 'contextbar/open'; panel?: string }
  | { type: 'contextbar/close' }
  | { type: 'contextbar/setPanel'; panel: string }
  | { type: 'contextbar/toggleDock' }
  | { type: 'contextbar/setWidth'; width: number }
  | { type: 'layout/reset' };
