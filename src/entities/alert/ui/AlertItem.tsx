import { ActionIcon, Group, Stack, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { IconAlertTriangle, IconCheck, IconInfoCircle, IconUrgent } from '@tabler/icons-react';
import { relativeTime, severityMeta, type SiteAlert } from '../model/types';

const icons = {
  info: IconInfoCircle,
  warning: IconAlertTriangle,
  critical: IconUrgent,
} as const;

export interface AlertItemProps {
  alert: SiteAlert;
  siteName?: string;
  onAcknowledge?: (alert: SiteAlert) => void;
  busy?: boolean;
}

export function AlertItem({ alert, siteName, onAcknowledge, busy }: AlertItemProps) {
  const meta = severityMeta[alert.severity];
  const Icon = icons[alert.severity];

  return (
    <Group align="flex-start" wrap="nowrap" gap="sm" py="xs">
      <ThemeIcon size={26} radius="sm" variant="light" color={meta.color}>
        <Icon size={15} />
      </ThemeIcon>

      <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
        <Text size="sm" fw={500} lh={1.3}>
          {alert.title}
        </Text>
        <Text size="xs" c="dimmed" lh={1.4}>
          {alert.detail}
        </Text>
        <Text size="xs" c="dimmed" className="u-mono">
          {[siteName, relativeTime(alert.createdAt)].filter(Boolean).join(' · ')}
        </Text>
      </Stack>

      {onAcknowledge && !alert.acknowledged && (
        <Tooltip label="Acknowledge" withArrow>
          <ActionIcon
            variant="subtle"
            color="gray"
            loading={busy}
            onClick={() => onAcknowledge(alert)}
            aria-label={`Acknowledge ${alert.title}`}
          >
            <IconCheck size={16} />
          </ActionIcon>
        </Tooltip>
      )}
    </Group>
  );
}
