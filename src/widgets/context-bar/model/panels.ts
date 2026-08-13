import type { ComponentType } from 'react';
import type { Icon } from '@tabler/icons-react';
import { IconBell, IconNotes, IconUsers } from '@tabler/icons-react';
import { AlertsPanel } from '../ui/panels/AlertsPanel';
import { TeamPanel } from '../ui/panels/TeamPanel';
import { NotesPanel } from '../ui/panels/NotesPanel';

export interface ContextPanel {
  id: string;
  label: string;
  icon: Icon;
  Component: ComponentType;
}

/** Register a panel here and it appears in the switcher. Nothing else to change. */
export const contextPanels: ContextPanel[] = [
  { id: 'alerts', label: 'Alerts', icon: IconBell, Component: AlertsPanel },
  { id: 'team', label: 'Team', icon: IconUsers, Component: TeamPanel },
  { id: 'notes', label: 'Notes', icon: IconNotes, Component: NotesPanel },
];

export const findPanel = (id: string) => contextPanels.find((panel) => panel.id === id) ?? contextPanels[0];
