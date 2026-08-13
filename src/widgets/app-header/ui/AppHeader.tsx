import { Link } from 'react-router-dom';
import { Divider, Indicator, Menu, Text, UnstyledButton, Tooltip, ActionIcon } from '@mantine/core';
import { IconBell, IconChevronDown, IconLogout, IconUserCog } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Logo } from '@/shared/ui';
import { headerNavigation } from '@/shared/config/navigation';
import { alertQueries } from '@/entities/alert';
import { userQueries, UserAvatar } from '@/entities/user';
import { GlobalSearch } from '@/features/global-search';
import { ThemeToggle } from '@/features/theme-toggle';
import { ContextbarToggle, SidenavToggle, useLayout } from '@/features/layout-controls';
import { HeaderNavMenu } from './HeaderNavMenu';
import classes from './AppHeader.module.css';

export function AppHeader() {
  const { actions } = useLayout();
  const { data: alerts = [] } = useQuery(alertQueries.list({ acknowledged: false }));
  const { data: users = [] } = useQuery(userQueries.list());
  const currentUser = users[0];

  return (
    <header className={classes.header}>
      <SidenavToggle />

      <Link to="/" className={classes.brand} aria-label="Helios home">
        <Logo />
        <Text size="xs" c="dimmed" className={`${classes.tagline} u-mono`}>
          grid ops
        </Text>
      </Link>

      <Divider orientation="vertical" my="sm" />

      <nav className={classes.nav} aria-label="Primary">
        {headerNavigation.map((item) => (
          <HeaderNavMenu key={item.id} item={item} />
        ))}
      </nav>

      <div className={classes.search}>
        <GlobalSearch />
      </div>

      <div className={classes.actions}>
        <Tooltip label="Alerts" withArrow>
          <Indicator
            disabled={alerts.length === 0}
            label={alerts.length}
            size={16}
            color="red"
            offset={6}
          >
            <ActionIcon
              variant="subtle"
              color="gray"
              size="lg"
              aria-label={`Alerts (${alerts.length} unacknowledged)`}
              onClick={() => actions.openContextbar('alerts')}
            >
              <IconBell size={18} />
            </ActionIcon>
          </Indicator>
        </Tooltip>

        <ThemeToggle />
        <ContextbarToggle compact />

        <Menu position="bottom-end" width={220} shadow="md" withinPortal>
          <Menu.Target>
            <UnstyledButton aria-label="Account menu" px={4}>
              {currentUser ? (
                <UserAvatar user={currentUser} size={28} />
              ) : (
                <IconChevronDown size={16} />
              )}
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{currentUser?.email ?? 'Signed out'}</Menu.Label>
            <Menu.Item
              component={Link}
              to="/settings"
              leftSection={<IconUserCog size={16} />}
            >
              Preferences
            </Menu.Item>
            <Menu.Item leftSection={<IconLogout size={16} />}>Sign out</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  );
}
