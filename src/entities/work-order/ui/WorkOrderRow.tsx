import { ActionIcon, Badge, Group, Stack, Text, Tooltip } from '@mantine/core';
import { IconCheck, IconRotateClockwise } from '@tabler/icons-react';
import { dueLabel, priorityMeta, workOrderStatusMeta, type WorkOrder } from '../model/types';

export interface WorkOrderRowProps {
  order: WorkOrder;
  siteName?: string;
  assigneeName?: string;
  onToggleDone?: (order: WorkOrder) => void;
  busy?: boolean;
}

export function WorkOrderRow({
  order,
  siteName,
  assigneeName,
  onToggleDone,
  busy,
}: WorkOrderRowProps) {
  const status = workOrderStatusMeta[order.status];
  const priority = priorityMeta[order.priority];
  const done = order.status === 'done';

  return (
    <Group
      justify="space-between"
      wrap="nowrap"
      py="xs"
      px="sm"
      style={{ borderBottom: '1px solid var(--app-border)' }}
    >
      <Stack gap={2} style={{ minWidth: 0 }}>
        <Group gap="xs" wrap="nowrap">
          <Text size="sm" fw={500} truncate td={done ? 'line-through' : undefined}>
            {order.title}
          </Text>
          <Badge size="xs" variant="light" color={priority.color}>
            {priority.label}
          </Badge>
        </Group>
        <Text size="xs" c="dimmed" truncate>
          {[siteName, assigneeName, dueLabel(order.dueAt)].filter(Boolean).join(' · ')}
        </Text>
      </Stack>

      <Group gap="xs" wrap="nowrap">
        <Badge size="sm" variant="dot" color={status.color}>
          {status.label}
        </Badge>
        {onToggleDone && (
          <Tooltip label={done ? 'Reopen' : 'Mark done'} withArrow>
            <ActionIcon
              variant="subtle"
              color={done ? 'gray' : 'teal'}
              loading={busy}
              onClick={() => onToggleDone(order)}
              aria-label={done ? `Reopen ${order.title}` : `Mark ${order.title} done`}
            >
              {done ? <IconRotateClockwise size={16} /> : <IconCheck size={16} />}
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </Group>
  );
}
