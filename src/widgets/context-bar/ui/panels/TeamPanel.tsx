import { Badge, Group, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { DataState } from '@/shared/ui';
import { shiftLabel, UserAvatar, userQueries } from '@/entities/user';

export function TeamPanel() {
  const users = useQuery(userQueries.list());

  return (
    <Stack gap="sm" p="sm">
      <DataState isPending={users.isPending} error={users.error} isEmpty={users.data?.length === 0}>
        {users.data?.map((user) => (
          <Group key={user.id} justify="space-between" wrap="nowrap" gap="xs">
            <UserAvatar user={user} withDetails />
            <Badge
              size="xs"
              variant="light"
              color={user.shift === 'on_call' ? 'solar' : 'gray'}
              style={{ flex: 'none' }}
            >
              {shiftLabel[user.shift]}
            </Badge>
          </Group>
        ))}
      </DataState>
    </Stack>
  );
}
