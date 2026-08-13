import { Avatar, Group, Indicator, Stack, Text } from '@mantine/core';
import { initials, type User } from '../model/types';

export interface UserAvatarProps {
  user: User;
  withDetails?: boolean;
  size?: number;
}

export function UserAvatar({ user, withDetails = false, size = 30 }: UserAvatarProps) {
  const avatar = (
    <Avatar size={size} radius="xl" color="brand" variant="light">
      {initials(user.name)}
    </Avatar>
  );

  return (
    <Group gap="sm" wrap="nowrap">
      <Indicator
        inline
        size={9}
        offset={3}
        position="bottom-end"
        color={user.online ? 'teal' : 'gray.5'}
        withBorder
        disabled={!withDetails && !user.online}
      >
        {avatar}
      </Indicator>
      {withDetails && (
        <Stack gap={0} style={{ minWidth: 0 }}>
          <Text size="sm" fw={500} truncate>
            {user.name}
          </Text>
          <Text size="xs" c="dimmed" truncate>
            {user.role}
          </Text>
        </Stack>
      )}
    </Group>
  );
}
