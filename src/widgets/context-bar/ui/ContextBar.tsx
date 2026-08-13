import { Group, SegmentedControl } from '@mantine/core';
import { LAYOUT } from '@/shared/config/app';
import { DockablePanel } from '@/shared/ui';
import {
  ContextbarClose,
  ContextbarDockToggle,
  useLayout,
} from '@/features/layout-controls';
import { contextPanels, findPanel } from '../model/panels';

export function ContextBar() {
  const { layout, actions } = useLayout();
  const { docked, width, panel } = layout.contextbar;
  const active = findPanel(panel);
  const ActivePanel = active.Component;

  return (
    <DockablePanel
      side="right"
      label="Context panel"
      docked={docked}
      width={width}
      resize={{
        min: LAYOUT.contextbar.minWidth,
        max: LAYOUT.contextbar.maxWidth,
        onChange: actions.setContextbarWidth,
        onReset: () => actions.setContextbarWidth(LAYOUT.contextbar.defaultWidth),
      }}
      header={
        <Group gap={4} wrap="nowrap" style={{ width: '100%' }}>
          <SegmentedControl
            size="xs"
            value={active.id}
            onChange={actions.setContextbarPanel}
            style={{ flex: 1, minWidth: 0 }}
            data={contextPanels.map((item) => ({ value: item.id, label: item.label }))}
          />
          <ContextbarDockToggle />
          <ContextbarClose />
        </Group>
      }
    >
      <ActivePanel />
    </DockablePanel>
  );
}
