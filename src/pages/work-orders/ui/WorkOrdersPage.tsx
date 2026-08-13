import { useState } from 'react';
import { Card, SegmentedControl, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { DataState, PageHeader } from '@/shared/ui';
import { siteQueries } from '@/entities/site';
import { userQueries } from '@/entities/user';
import {
  useUpdateWorkOrderStatus,
  WorkOrderRow,
  workOrderQueries,
  workOrderStatusMeta,
  type WorkOrderStatus,
} from '@/entities/work-order';

const statusOptions = [
  { value: 'all', label: 'All' },
  ...Object.entries(workOrderStatusMeta).map(([value, meta]) => ({ value, label: meta.label })),
];

export function WorkOrdersPage() {
  const [status, setStatus] = useState<WorkOrderStatus | 'all'>('all');
  const orders = useQuery(workOrderQueries.list({ status }));
  const sites = useQuery(siteQueries.list());
  const users = useQuery(userQueries.list());
  const updateStatus = useUpdateWorkOrderStatus();

  return (
    <Stack gap="lg">
      <PageHeader
        eyebrow="Field work"
        title="Work orders"
        description="Marking an order done updates the cache immediately and rolls back if the write fails."
        actions={
          <SegmentedControl
            size="xs"
            value={status}
            onChange={(value) => setStatus(value as WorkOrderStatus | 'all')}
            data={statusOptions}
          />
        }
      />

      <Card withBorder radius="md" padding={0}>
        <DataState
          isPending={orders.isPending}
          error={orders.error}
          isEmpty={orders.data?.length === 0}
          emptyTitle="No work orders here"
          emptyHint="Change the filter, or raise one from a site."
        >
          {orders.data?.map((order) => (
            <WorkOrderRow
              key={order.id}
              order={order}
              siteName={sites.data?.find((site) => site.id === order.siteId)?.name}
              assigneeName={users.data?.find((user) => user.id === order.assigneeId)?.name}
              busy={updateStatus.isPending && updateStatus.variables?.id === order.id}
              onToggleDone={(next) =>
                updateStatus.mutate({
                  id: next.id,
                  status: next.status === 'done' ? 'open' : 'done',
                })
              }
            />
          ))}
        </DataState>
      </Card>
    </Stack>
  );
}
