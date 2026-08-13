import type { CSSProperties, ReactNode } from 'react';
import { LAYOUT } from '@/shared/config/app';
import { useLayout } from '@/features/layout-controls';
import classes from './AppShellLayout.module.css';

export interface AppShellLayoutProps {
  header: ReactNode;
  sidenav: ReactNode;
  contextbar: ReactNode;
  children: ReactNode;
}

/**
 * Owns only geometry. Docked panels get a real grid column (same stacking level as
 * the content); undocked panels render into a fixed layer above it.
 */
export function AppShellLayout({ header, sidenav, contextbar, children }: AppShellLayoutProps) {
  const { layout, isMobile, actions } = useLayout();
  const { sidenav: nav, contextbar: context } = layout;

  const navVisible = nav.mode !== 'hidden';
  const navSize = nav.mode === 'compact' ? LAYOUT.sidenav.compactWidth : nav.width;
  const navDocked = navVisible && nav.docked;
  const contextDocked = context.open && context.docked;

  const showScrim = isMobile && ((navVisible && !nav.docked) || (context.open && !context.docked));

  return (
    <div
      className={classes.shell}
      style={
        {
          '--app-header-height': `${LAYOUT.headerHeight}px`,
          '--sidenav-col': `${navDocked ? navSize : 0}px`,
          '--contextbar-col': `${contextDocked ? context.width : 0}px`,
        } as CSSProperties
      }
    >
      <div className={classes.header}>{header}</div>

      <div className={classes.navSlot}>{navDocked && sidenav}</div>

      <main className={classes.main} id="main-content">
        {children}
      </main>

      <div className={classes.contextSlot}>{contextDocked && contextbar}</div>

      {showScrim && (
        <button
          type="button"
          className={classes.scrim}
          aria-label="Close open panels"
          onClick={() => {
            if (navVisible && !nav.docked) actions.toggleSidenav();
            if (context.open && !context.docked) actions.closeContextbar();
          }}
        />
      )}

      <div className={classes.floatingLayer}>
        {navVisible && !nav.docked && sidenav}
        {context.open && !context.docked && contextbar}
      </div>
    </div>
  );
}
