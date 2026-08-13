import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { IconLayoutSidebarRight, IconPinned, IconPinnedOff, IconX } from '@tabler/icons-react';
import { useLayout } from '../model/layout-context';

export function ContextbarToggle({ compact = false }: { compact?: boolean }) {
  const { layout, actions } = useLayout();
  const open = layout.contextbar.open;

  if (compact) {
    return (
      <Tooltip label={open ? 'Hide context (⌘J)' : 'Show context (⌘J)'} withArrow>
        <ActionIcon
          variant={open ? 'light' : 'subtle'}
          color={open ? 'brand' : 'gray'}
          size="lg"
          onClick={actions.toggleContextbar}
          aria-label={open ? 'Hide context panel' : 'Show context panel'}
          aria-expanded={open}
        >
          <IconLayoutSidebarRight size={18} />
        </ActionIcon>
      </Tooltip>
    );
  }

  return (
    <Button
      variant={open ? 'light' : 'default'}
      size="xs"
      leftSection={<IconLayoutSidebarRight size={16} />}
      onClick={actions.toggleContextbar}
      aria-expanded={open}
    >
      Context
    </Button>
  );
}

export function ContextbarDockToggle() {
  const { layout, actions, isMobile } = useLayout();
  const docked = layout.contextbar.docked;

  return (
    <Tooltip label={docked ? 'Undock panel' : 'Dock panel'} withArrow>
      <ActionIcon
        variant="subtle"
        color="gray"
        disabled={isMobile}
        onClick={actions.toggleContextbarDock}
        aria-label={docked ? 'Undock context panel' : 'Dock context panel'}
      >
        {docked ? <IconPinnedOff size={16} /> : <IconPinned size={16} />}
      </ActionIcon>
    </Tooltip>
  );
}

export function ContextbarClose() {
  const { actions } = useLayout();
  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={actions.closeContextbar}
      aria-label="Close context panel"
    >
      <IconX size={16} />
    </ActionIcon>
  );
}
