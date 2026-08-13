import type { ReactNode } from 'react';
import {
  Button,
  Card,
  Group,
  SegmentedControl,
  Slider,
  Stack,
  Switch,
  Text,
} from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { LAYOUT } from '@/shared/config/app';
import { db } from '@/shared/api/db';
import { PageHeader } from '@/shared/ui';
import { useLayout, type SidenavMode } from '@/features/layout-controls';

function Row({
  label,
  hint,
  control,
}: {
  label: string;
  hint?: string;
  control: ReactNode;
}) {
  return (
    <Group justify="space-between" align="flex-start" wrap="nowrap" gap="xl" py="xs">
      <Stack gap={2} style={{ minWidth: 0 }}>
        <Text size="sm" fw={500}>
          {label}
        </Text>
        {hint && (
          <Text size="xs" c="dimmed">
            {hint}
          </Text>
        )}
      </Stack>
      <div style={{ flex: 'none', minWidth: 220 }}>{control}</div>
    </Group>
  );
}

export function SettingsPage() {
  const { preferences, actions, isMobile } = useLayout();
  const queryClient = useQueryClient();

  const resetData = async () => {
    await db.reset();
    await queryClient.invalidateQueries();
  };

  return (
    <Stack gap="lg" maw={760}>
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Layout preferences are stored on this device and survive a reload."
      />

      <Card withBorder radius="md" padding="lg">
        <Text fw={600} mb="xs">
          Navigation
        </Text>
        <Row
          label="Display"
          hint="Full labels, icons only, or hidden entirely. ⌘B toggles, ⌘⇧B collapses."
          control={
            <SegmentedControl
              fullWidth
              size="xs"
              value={preferences.sidenav.mode}
              onChange={(value) => actions.setSidenavMode(value as SidenavMode)}
              data={[
                { value: 'expanded', label: 'Full' },
                { value: 'compact', label: 'Icons' },
                { value: 'hidden', label: 'Hidden' },
              ]}
            />
          }
        />
        <Row
          label="Docked"
          hint={
            isMobile
              ? 'Narrow screens always float panels over the page.'
              : 'Docked sits beside the page. Undocked floats above it.'
          }
          control={
            <Switch
              checked={preferences.sidenav.docked}
              disabled={isMobile}
              onChange={actions.toggleSidenavDock}
              label={preferences.sidenav.docked ? 'Docked' : 'Floating'}
            />
          }
        />
        <Row
          label="Width"
          hint="Or drag the edge of the panel."
          control={
            <Slider
              value={preferences.sidenav.width}
              min={LAYOUT.sidenav.minWidth}
              max={LAYOUT.sidenav.maxWidth}
              step={4}
              label={(value) => `${value}px`}
              onChange={actions.setSidenavWidth}
            />
          }
        />
      </Card>

      <Card withBorder radius="md" padding="lg">
        <Text fw={600} mb="xs">
          Context panel
        </Text>
        <Row
          label="Visible"
          hint="⌘J toggles it from anywhere."
          control={
            <Switch
              checked={preferences.contextbar.open}
              onChange={actions.toggleContextbar}
              label={preferences.contextbar.open ? 'Shown' : 'Hidden'}
            />
          }
        />
        <Row
          label="Docked"
          control={
            <Switch
              checked={preferences.contextbar.docked}
              disabled={isMobile}
              onChange={actions.toggleContextbarDock}
              label={preferences.contextbar.docked ? 'Docked' : 'Floating'}
            />
          }
        />
        <Row
          label="Width"
          control={
            <Slider
              value={preferences.contextbar.width}
              min={LAYOUT.contextbar.minWidth}
              max={LAYOUT.contextbar.maxWidth}
              step={4}
              label={(value) => `${value}px`}
              onChange={actions.setContextbarWidth}
            />
          }
        />
      </Card>

      <Card withBorder radius="md" padding="lg">
        <Text fw={600} mb={4}>
          Reset
        </Text>
        <Text size="sm" c="dimmed" mb="md">
          Layout returns to the default arrangement. Data returns to the seeded fleet.
        </Text>
        <Group>
          <Button variant="default" size="xs" onClick={actions.resetLayout}>
            Reset layout
          </Button>
          <Button variant="default" size="xs" onClick={resetData}>
            Reset data
          </Button>
        </Group>
      </Card>
    </Stack>
  );
}
