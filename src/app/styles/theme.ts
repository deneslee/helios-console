import { createTheme, type MantineColorsTuple } from '@mantine/core';

/** Console blue: used for state and focus, never for decoration. */
const brand: MantineColorsTuple = [
  '#eef1ff',
  '#dbe0fb',
  '#b3bef7',
  '#8899f4',
  '#657bf1',
  '#5069f0',
  '#4460f0',
  '#3550d6',
  '#2c47c0',
  '#1f3daa',
];

/** Solar amber: reserved for output, warnings and the mark itself. */
const solar: MantineColorsTuple = [
  '#fff8e6',
  '#ffefcc',
  '#ffdd9a',
  '#ffca63',
  '#ffba37',
  '#ffb01a',
  '#f2a03d',
  '#d98a1f',
  '#c07709',
  '#a66400',
];

export const theme = createTheme({
  primaryColor: 'brand',
  primaryShade: { light: 6, dark: 4 },
  colors: { brand, solar },
  defaultRadius: 'md',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  fontFamilyMonospace: '"IBM Plex Mono", ui-monospace, monospace',
  headings: {
    fontFamily: '"Inter Tight", Inter, system-ui, sans-serif',
    fontWeight: '650',
  },
  fontSizes: { xs: '11px', sm: '13px', md: '14px', lg: '16px', xl: '19px' },
  components: {
    Card: { defaultProps: { shadow: 'none' } },
    Tooltip: { defaultProps: { openDelay: 250, withArrow: true } },
    Badge: { defaultProps: { radius: 'sm', tt: 'none', fw: 500 } },
  },
});
