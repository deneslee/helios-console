import { Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { DataState } from '@/shared/ui';
import { AlertItem, alertQueries, useAcknowledgeAlert } from '@/entities/alert';
import { siteQueries } from '@/entities/site';

export function AlertsPanel() {
  const alerts = useQuery(alertQueries.list());
  const sites = useQuery(siteQueries.list());
  const acknowledge = useAcknowledgeAlert();

  const siteName = (id: string) => sites.data?.find((site) => site.id === id)?.name;

  return (
    <Stack gap={0} p="sm">
      <DataState
        isPending={alerts.isPending}
        error={alerts.error}
        isEmpty={alerts.data?.length === 0}
        emptyTitle="No alerts"
        emptyHint="Every site is reporting inside its normal range."
      >
        {alerts.data?.map((alert) => (
          <AlertItem
            key={alert.id}
            alert={alert}
            siteName={siteName(alert.siteId)}
            busy={acknowledge.isPending && acknowledge.variables === alert.id}
            onAcknowledge={(next) => acknowledge.mutate(next.id)}
          />
        ))}
      </DataState>
    </Stack>
  );
}
