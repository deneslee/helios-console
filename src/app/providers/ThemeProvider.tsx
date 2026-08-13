import type { ReactNode } from 'react';
import { MantineProvider, localStorageColorSchemeManager } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { STORAGE_KEYS } from '@/shared/config/app';
import { theme } from '../styles/theme';

const colorSchemeManager = localStorageColorSchemeManager({ key: STORAGE_KEYS.colorScheme });

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="auto"
      colorSchemeManager={colorSchemeManager}
    >
      <Notifications position="bottom-right" limit={3} />
      {children}
    </MantineProvider>
  );
}
