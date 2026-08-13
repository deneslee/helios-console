import { Link } from 'react-router-dom';
import { Button, Group, Menu, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import type { NavItem } from '@/shared/config/navigation';

export interface HeaderNavMenuProps {
  item: NavItem;
}

/** A single header dropdown, driven entirely by the navigation config. */
export function HeaderNavMenu({ item }: HeaderNavMenuProps) {
  if (!item.children?.length) {
    return (
      <Button component={Link} to={item.href ?? '/'} variant="subtle" color="gray" size="compact-sm">
        {item.label}
      </Button>
    );
  }

  return (
    <Menu trigger="click-hover" openDelay={80} closeDelay={120} position="bottom-start" width={264} shadow="md" withinPortal>
      <Menu.Target>
        <Button
          variant="subtle"
          color="gray"
          size="compact-sm"
          rightSection={<IconChevronDown size={14} />}
        >
          {item.label}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {item.children.map((child) => (
          <Menu.Item
            key={child.id}
            component={Link}
            to={child.href ?? '/'}
            leftSection={child.icon ? <child.icon size={16} /> : undefined}
          >
            <Group gap={2} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text size="sm">{child.label}</Text>
              {child.description && (
                <Text size="xs" c="dimmed">
                  {child.description}
                </Text>
              )}
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
