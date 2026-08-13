import { Badge, Card, Group, Progress, Stack, Text } from '@mantine/core';
import { siteStatusMeta, utilisation, type Site } from '../model/types';

export interface SiteCardProps {
  site: Site;
  onSelect?: (site: Site) => void;
  active?: boolean;
}

export function SiteCard({ site, onSelect, active }: SiteCardProps) {
  const status = siteStatusMeta[site.status];
  const percent = utilisation(site);

  return (
    <Card
      withBorder
      padding="md"
      radius="md"
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={() => onSelect?.(site)}
      onKeyDown={(event) => {
        if (onSelect && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onSelect(site);
        }
      }}
      style={{
        cursor: onSelect ? 'pointer' : undefined,
        borderColor: active ? 'var(--mantine-color-brand-5)' : undefined,
      }}
    >
      <Stack gap="xs">
        <Group justify="space-between" wrap="nowrap" align="flex-start">
          <Stack gap={2} style={{ minWidth: 0 }}>
            <Text fw={600} truncate>
              {site.name}
            </Text>
            <Text size="xs" c="dimmed" className="u-mono">
              {site.region.toUpperCase()}
            </Text>
          </Stack>
          <Badge color={status.color} variant="light" size="sm">
            {status.label}
          </Badge>
        </Group>

        <Group justify="space-between" gap="xs">
          <Text size="sm" className="u-mono">
            {site.outputMw.toFixed(1)} / {site.capacityMw} MW
          </Text>
          <Text size="sm" c="dimmed" className="u-mono">
            {percent}%
          </Text>
        </Group>
        <Progress value={percent} color={status.color} size="sm" radius="xl" />
      </Stack>
    </Card>
  );
}
