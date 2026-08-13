import type { ComponentType, ReactNode } from 'react';

type ProviderComponent = ComponentType<{ children: ReactNode }>;

/**
 * Flattens provider nesting: composeProviders([A, B, C]) renders <A><B><C/></B></A>.
 * Add a provider to the array in `providers/index.tsx` — no pyramid to edit.
 */
export function composeProviders(providers: ProviderComponent[]): ProviderComponent {
  return function Composed({ children }: { children: ReactNode }) {
    return providers.reduceRight<ReactNode>(
      (tree, Provider) => <Provider>{tree}</Provider>,
      children,
    );
  };
}
