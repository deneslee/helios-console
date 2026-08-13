import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import {
  IconLayoutSidebar,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconPinned,
  IconPinnedOff,
} from '@tabler/icons-react';
import { useLayout } from '../model/layout-context';

/** Header button: click toggles open/closed, the caret menu holds the finer states. */
export function SidenavToggle() {
  const { layout, actions } = useLayout();
  const hidden = layout.sidenav.mode === 'hidden';

  return (
    <Tooltip label={hidden ? 'Show navigation (⌘B)' : 'Hide navigation (⌘B)'} withArrow>
      <ActionIcon
        variant="subtle"
        color="gray"
        size="lg"
        onClick={actions.toggleSidenav}
        aria-label={hidden ? 'Show navigation' : 'Hide navigation'}
        aria-expanded={!hidden}
      >
        <IconLayoutSidebar size={18} />
      </ActionIcon>
    </Tooltip>
  );
}

/** In-panel controls: compact/expand and dock/undock. */
export function SidenavModeMenu() {
  const { layout, actions, isMobile } = useLayout();
  const { mode, docked } = layout.sidenav;

  return (
    <Menu shadow="md" width={210} position="bottom-start" withinPortal>
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray" aria-label="Navigation display options">
          <IconLayoutSidebarLeftCollapse size={17} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Navigation</Menu.Label>
        <Menu.Item
          leftSection={
            mode === 'compact' ? (
              <IconLayoutSidebarLeftExpand size={16} />
            ) : (
              <IconLayoutSidebarLeftCollapse size={16} />
            )
          }
          onClick={actions.toggleSidenavCompact}
        >
          {mode === 'compact' ? 'Expand to full width' : 'Collapse to icons'}
        </Menu.Item>
        <Menu.Item
          disabled={isMobile}
          leftSection={docked ? <IconPinnedOff size={16} /> : <IconPinned size={16} />}
          onClick={actions.toggleSidenavDock}
        >
          {docked ? 'Undock — float over page' : 'Dock — sit beside page'}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={actions.toggleSidenav}>Close navigation</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
