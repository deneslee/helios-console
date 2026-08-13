import { Outlet } from 'react-router-dom';
import { Box } from '@mantine/core';
import { AppShellLayout } from '@/widgets/app-shell';
import { AppHeader } from '@/widgets/app-header';
import { SideNav } from '@/widgets/side-nav';
import { ContextBar } from '@/widgets/context-bar';

export function BaseLayout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <AppShellLayout header={<AppHeader />} sidenav={<SideNav />} contextbar={<ContextBar />}>
        <Box p="lg" maw={1440} mx="auto">
          <Outlet />
        </Box>
      </AppShellLayout>
    </>
  );
}
