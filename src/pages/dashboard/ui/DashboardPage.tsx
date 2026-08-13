import { Button, Card, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DataState, PageHeader } from '@/shared/ui';
import { SiteCard, siteQueries } from '@/entities/site';
import { isOpen, WorkOrderRow, workOrderQueries } from '@/entities/work-order';
import { alertQueries } from '@/entities/alert';
import { useLayout } from '@/features/layout-controls';

function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card withBorder padding="md" radius="md">
      <Text size="xs" c="dimmed" className="u-mono">
        {label.toUpperCase()}
      </Text>
      <Text fz={28} fw={600} lh={1.2} mt={6} ff="var(--font-display)">
        {value}
      </Text>
      {hint && (
        <Text size="xs" c="dimmed" mt={2}>
          {hint}
        </Text>
      )}
    </Card>
  );
}

export function DashboardPage() {
  const sites = useQuery(siteQueries.list());
  const workOrders = useQuery(workOrderQueries.list());
  const alerts = useQuery(alertQueries.list({ acknowledged: false }));
  const { actions } = useLayout();

  const output = sites.data?.reduce((sum, site) => sum + site.outputMw, 0) ?? 0;
  const capacity = sites.data?.reduce((sum, site) => sum + site.capacityMw, 0) ?? 0;
  const openOrders = workOrders.data?.filter(isOpen) ?? [];

  return (
    <Stack gap="lg">
      <PageHeader
        eyebrow="Fleet · live"
        title="Overview"
        description="Everything currently exporting to the grid, and what needs a person today."
        actions={
          <Button variant="light" size="xs" onClick={() => actions.openContextbar('alerts')}>
            Review alerts
          </Button>
        }
      />

      <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md">
        <Metric
          label="Output now"
          value={`${output.toFixed(1)} MW`}
          hint={`of ${capacity} MW installed`}
        />
        <Metric
          label="Sites online"
          value={`${sites.data?.filter((site) => site.status === 'online').length ?? 0}/${sites.data?.length ?? 0}`}
        />
        <Metric label="Open work orders" value={String(openOrders.length)} />
        <Metric label="Unacknowledged alerts" value={String(alerts.data?.length ?? 0)} />
      </SimpleGrid>

      <Group justify="space-between" align="baseline">
        <Text fw={600}>Sites</Text>
        <Button component={Link} to="/sites" variant="subtle" size="compact-xs" rightSection={<IconArrowRight size={14} />}>
          All sites
        </Button>
      </Group>

      <DataState isPending={sites.isPending} error={sites.error} isEmpty={sites.data?.length === 0}>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {sites.data?.slice(0, 6).map((site) => <SiteCard key={site.id} site={site} />)}
        </SimpleGrid>
      </DataState>

      <Text fw={600} mt="sm">
        Due next
      </Text>
      <Card withBorder radius="md" padding={0}>
        <DataState
          isPending={workOrders.isPending}
          error={workOrders.error}
          isEmpty={openOrders.length === 0}
          emptyTitle="Nothing scheduled"
          emptyHint="Raise a work order from the site page when something needs attention."
        >
          {openOrders.slice(0, 5).map((order) => (
            <WorkOrderRow
              key={order.id}
              order={order}
              siteName={sites.data?.find((site) => site.id === order.siteId)?.name}
            />
          ))}
        </DataState>
      </Card>
    </Stack>
  );
}
