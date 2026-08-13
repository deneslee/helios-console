import type { Icon } from '@tabler/icons-react';
import {
  IconActivityHeartbeat,
  IconBolt,
  IconBook2,
  IconChartHistogram,
  IconClipboardList,
  IconLifebuoy,
  IconMap2,
  IconSettings,
  IconSolarPanel2,
  IconUsers,
} from '@tabler/icons-react';

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: Icon;
  description?: string;
  /** Rendered as a Collapse when expanded, and as a dropdown when compact. */
  children?: NavItem[];
  badge?: 'alerts' | 'openWorkOrders';
}

export interface NavSection {
  id: string;
  label?: string;
  items: NavItem[];
}

/** Left sidebar. Add an item here and it appears in every sidenav mode. */
export const sideNavigation: NavSection[] = [
  {
    id: 'operate',
    label: 'Operate',
    items: [
      { id: 'overview', label: 'Overview', href: '/', icon: IconActivityHeartbeat },
      { id: 'sites', label: 'Sites', href: '/sites', icon: IconSolarPanel2 },
      {
        id: 'work',
        label: 'Work orders',
        href: '/work-orders',
        icon: IconClipboardList,
        badge: 'openWorkOrders',
      },
    ],
  },
  {
    id: 'analyse',
    label: 'Analyse',
    items: [
      {
        id: 'output',
        label: 'Output',
        icon: IconChartHistogram,
        children: [
          { id: 'output-live', label: 'Live curve', href: '/sites?view=live' },
          { id: 'output-forecast', label: 'Day-ahead forecast', href: '/sites?view=forecast' },
        ],
      },
      { id: 'map', label: 'Grid map', href: '/sites?view=map', icon: IconMap2 },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    items: [
      { id: 'team', label: 'Team', href: '/settings?tab=team', icon: IconUsers },
      { id: 'settings', label: 'Settings', href: '/settings', icon: IconSettings },
    ],
  },
];

/** Header dropdowns. Items with children render as a Menu. */
export const headerNavigation: NavItem[] = [
  {
    id: 'dispatch',
    label: 'Dispatch',
    icon: IconBolt,
    children: [
      { id: 'curtail', label: 'Curtailment plan', href: '/sites?view=curtailment', description: 'Set output caps per site' },
      { id: 'reserve', label: 'Reserve bids', href: '/sites?view=reserve', description: 'Tomorrow’s balancing market' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: IconBook2,
    children: [
      { id: 'runbooks', label: 'Runbooks', href: '/work-orders?view=runbooks', description: 'Isolation, restart, storm mode' },
      { id: 'support', label: 'Vendor support', href: '/settings?tab=support', description: 'Escalation contacts', icon: IconLifebuoy },
    ],
  },
];
