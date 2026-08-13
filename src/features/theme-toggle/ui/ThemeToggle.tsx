import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme({ keepTransitions: true });
  const dark = colorScheme === 'dark';

  return (
    <Tooltip label={dark ? 'Light appearance' : 'Dark appearance'} withArrow>
      <ActionIcon
        variant="subtle"
        color="gray"
        size="lg"
        onClick={() => setColorScheme(dark ? 'light' : 'dark')}
        aria-label={dark ? 'Switch to light appearance' : 'Switch to dark appearance'}
      >
        {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
      </ActionIcon>
    </Tooltip>
  );
}
