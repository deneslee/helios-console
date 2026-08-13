import { LayoutProvider } from '@/features/layout-controls';
import { composeProviders } from './compose-providers';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

/** Order matters top-down: theme wraps data wraps layout state. */
export const AppProviders = composeProviders([ThemeProvider, QueryProvider, LayoutProvider]);

export { composeProviders };
