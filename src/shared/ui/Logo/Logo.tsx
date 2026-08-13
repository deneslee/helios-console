import { Box, Text, Group } from '@mantine/core';

export interface LogoProps {
  /** Hide the wordmark — used when the sidenav is compact or on narrow headers. */
  markOnly?: boolean;
  size?: number;
}

export function Logo({ markOnly = false, size = 26 }: LogoProps) {
  return (
    <Group gap={10} wrap="nowrap">
      <Box
        component="svg"
        viewBox="0 0 24 24"
        w={size}
        h={size}
        style={{ flex: 'none', display: 'block' }}
        aria-hidden
      >
        <circle cx="12" cy="12" r="5" fill="var(--mantine-color-solar-6)" />
        <g stroke="var(--mantine-color-brand-6)" strokeWidth="2" strokeLinecap="round">
          <path d="M12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M19.8 4.2l-2.1 2.1M6.3 17.7l-2.1 2.1" />
        </g>
      </Box>
      {!markOnly && (
        <Text fw={700} fz={17} lh={1} ff="var(--font-display)" style={{ letterSpacing: '-0.02em' }}>
          Helios
        </Text>
      )}
    </Group>
  );
}
