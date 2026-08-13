import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SegmentedControl, SimpleGrid, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { DataState, PageHeader } from '@/shared/ui';
import { SiteCard, siteQueries, siteStatusMeta, type SiteStatus } from '@/entities/site';
import { useLayout } from '@/features/layout-controls';

const statusOptions = [
  { value: 'all', label: 'All' },
  ...Object.entries(siteStatusMeta).map(([value, meta]) => ({ value, label: meta.label })),
];

export function SitesPage() {
  const [status, setStatus] = useState<SiteStatus | 'all'>('all');
  const [searchParams] = useSearchParams();
  const focus = searchParams.get('focus');
  const { actions } = useLayout();

  const sites = useQuery(siteQueries.list({ status }));

  return (
    <Stack gap="lg">
      <PageHeader
        eyebrow="Fleet"
        title="Sites"
        description="Filter by state, then open a site to see its work orders and alerts."
        actions={
          <SegmentedControl
            size="xs"
            value={status}
            onChange={(value) => setStatus(value as SiteStatus | 'all')}
            data={statusOptions}
          />
        }
      />

      <DataState
        isPending={sites.isPending}
        error={sites.error}
        isEmpty={sites.data?.length === 0}
        emptyTitle="No sites in this state"
        emptyHint="Switch the filter back to All to see the whole fleet."
      >
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {sites.data?.map((site) => (
            <SiteCard
              key={site.id}
              site={site}
              active={focus === site.id}
              onSelect={() => actions.openContextbar('alerts')}
            />
          ))}
        </SimpleGrid>
      </DataState>
    </Stack>
  );
}
