import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { BaseLayout } from '../layouts/BaseLayout';
import { DashboardPage } from '@/pages/dashboard';
import { SitesPage } from '@/pages/sites';
import { WorkOrdersPage } from '@/pages/work-orders';
import { SettingsPage } from '@/pages/settings';

export const routes: RouteObject[] = [
  {
    element: <BaseLayout />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/sites', element: <SitesPage /> },
      { path: '/work-orders', element: <WorkOrdersPage /> },
      { path: '/settings', element: <SettingsPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
