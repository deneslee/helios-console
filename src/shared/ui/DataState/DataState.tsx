import type { ReactNode } from 'react';
import { Alert, Center, Loader, Stack, Text } from '@mantine/core';

export interface DataStateProps {
  isPending: boolean;
  error?: Error | null;
  isEmpty?: boolean;
  /** Shown instead of a spinner while loading — pass skeletons for list-shaped content. */
  pendingFallback?: ReactNode;
  emptyTitle?: string;
  emptyHint?: string;
  children: ReactNode;
}

/** One place to render pending / error / empty so every list behaves identically. */
export function DataState({
  isPending,
  error,
  isEmpty,
  pendingFallback,
  emptyTitle = 'Nothing here yet',
  emptyHint,
  children,
}: DataStateProps) {
  if (isPending) {
    return (
      pendingFallback ?? (
        <Center py="xl">
          <Loader size="sm" />
        </Center>
      )
    );
  }

  if (error) {
    return (
      <Alert color="red" variant="light" title="Could not load this data">
        {error.message} — retry, or check the connection to the operations gateway.
      </Alert>
    );
  }

  if (isEmpty) {
    return (
      <Stack gap={4} py="lg" align="center">
        <Text fw={500}>{emptyTitle}</Text>
        {emptyHint && (
          <Text size="sm" c="dimmed" ta="center">
            {emptyHint}
          </Text>
        )}
      </Stack>
    );
  }

  return <>{children}</>;
}
