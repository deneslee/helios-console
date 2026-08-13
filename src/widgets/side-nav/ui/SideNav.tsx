import { Fragment } from 'react';
import { Group, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { LAYOUT } from '@/shared/config/app';
import { sideNavigation, type NavItem } from '@/shared/config/navigation';
import { DockablePanel } from '@/shared/ui';
import { alertQueries } from '@/entities/alert';
import { isOpen, workOrderQueries } from '@/entities/work-order';
import { SidenavModeMenu, useLayout } from '@/features/layout-controls';
import { SideNavItem } from './SideNavItem';
import classes from './SideNav.module.css';

export function SideNav() {
  const { layout, isMobile, actions } = useLayout();
  const { mode, docked, width } = layout.sidenav;
  const compact = mode === 'compact';

  const { data: alerts = [] } = useQuery(alertQueries.list({ acknowledged: false }));
  const { data: workOrders = [] } = useQuery(workOrderQueries.list());

  const badges: Record<NonNullable<NavItem['badge']>, number> = {
    alerts: alerts.length,
    openWorkOrders: workOrders.filter(isOpen).length,
  };

  // Close a floating sidenav after navigating — a docked one stays put.
  const handleNavigate = () => {
    if (!docked || isMobile) actions.toggleSidenav();
  };

  return (
    <DockablePanel
      side="left"
      label="Main navigation"
      docked={docked}
      width={compact ? LAYOUT.sidenav.compactWidth : width}
      resize={
        compact
          ? undefined
          : {
              min: LAYOUT.sidenav.minWidth,
              max: LAYOUT.sidenav.maxWidth,
              onChange: actions.setSidenavWidth,
              onReset: () => actions.setSidenavWidth(LAYOUT.sidenav.defaultWidth),
            }
      }
      footer={
        <Group className={classes.footer} justify={compact ? 'center' : 'space-between'}>
          {!compact && (
            <Text size="xs" c="dimmed" className="u-mono">
              {docked ? 'DOCKED' : 'FLOATING'}
            </Text>
          )}
          <SidenavModeMenu />
        </Group>
      }
    >
      <nav className={classes.inner} aria-label="Sections">
        {sideNavigation.map((section, index) => (
          <Fragment key={section.id}>
            {index > 0 && compact && <div className={classes.divider} />}
            {section.label && !compact && (
              <div className={classes.sectionLabel}>{section.label}</div>
            )}
            {section.items.map((item) => (
              <SideNavItem
                key={item.id}
                item={item}
                compact={compact}
                badgeCount={item.badge ? badges[item.badge] : undefined}
                onNavigate={handleNavigate}
              />
            ))}
          </Fragment>
        ))}
      </nav>
    </DockablePanel>
  );
}
