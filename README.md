# Helios — dockable app shell

React 19 + Vite + Mantine 9.5.1 + TanStack Query 5, organised with **Feature-Sliced Design**.

The demo subject is a grid operations console, but the shell is the point: a top navbar,
a left sidenav that docks / undocks / compacts / closes, and a right context bar that
docks / undocks and resizes with a splitter.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
npm run typecheck
```

## Layer map

```
src/
  app/        providers, theme, router, base layout      — composition root
  pages/      dashboard, sites, work-orders, settings    — route screens
  widgets/    app-shell, app-header, side-nav, context-bar
  features/   layout-controls, global-search, theme-toggle
  entities/   user, site, work-order, alert              — types + queries + presentational UI
  shared/     config, lib (hooks, storage), api (db), ui kit
```

Import direction is strictly downward: `app → pages → widgets → features → entities → shared`.
Every slice exposes a public API through its `index.ts`; nothing reaches into another slice's internals.

## The shell

`widgets/app-shell` owns geometry and nothing else. It's a CSS grid with two variable columns:

- **Docked** panel → real grid column, so it sits *beside* the content at the same stacking level.
- **Undocked** panel → column collapses to `0`, the panel renders into a fixed layer above the content.

State lives in one reducer (`features/layout-controls/model/layout-reducer.ts`) and persists to
`localStorage`. Below `62em` the provider resolves both panels to floating regardless of preference,
so preferences are never overwritten by a narrow viewport.

| Control | Where |
|---|---|
| Open / close sidenav | Header button, `⌘B` |
| Compact (icons only) | Sidenav footer menu, `⌘⇧B`, Settings |
| Dock / undock | Sidenav footer menu, context bar header, Settings |
| Resize | Drag the panel edge, or arrow keys on the focused splitter, or Settings sliders. Double-click resets. |
| Context bar | Header button, `⌘J`, or `actions.openContextbar('alerts')` from anywhere |

Compact mode keeps nested items reachable by turning them into a flyout menu instead of a collapse.

## Changing the data

`shared/api/db` is a promise-based, `localStorage`-backed fake database with simulated latency.

- **Content** — edit `shared/api/db/seed.ts`.
- **Shape** — edit `shared/api/db/schema.ts`; entities re-export those records as domain types.
- **Real backend** — replace the `db.*` calls inside `entities/*/api/*.queries.ts` with `fetch`.
  Nothing above the entity layer knows where data comes from.

Queries use `queryOptions` factories with structured keys, so a screen reads:

```ts
const sites = useQuery(siteQueries.list({ status: 'degraded' }));
```

`useUpdateWorkOrderStatus` in `entities/work-order` is the reference mutation: optimistic update
across every cached list, rollback on error, invalidate on settle.

## Changing navigation

`shared/config/navigation.tsx` holds both trees. Add an entry and it appears in the header
dropdowns or the sidenav, including badge counts (`badge: 'alerts' | 'openWorkOrders'`).

`shared/config/app.ts` holds every dimension and storage key.

## Adding a context panel

```ts
// widgets/context-bar/model/panels.ts
{ id: 'weather', label: 'Weather', icon: IconCloud, Component: WeatherPanel }
```

That's the whole registration — the switcher, the state and the deep-link (`openContextbar('weather')`)
follow automatically.

## Reusable pieces

- `shared/ui/DockablePanel` — docked/floating/resizable panel shell. Knows nothing about its content.
- `shared/ui/Resizer` + `shared/lib/hooks/use-resizable` — pointer and keyboard splitter with ARIA
  `separator` semantics.
- `shared/ui/DataState` — one place for pending / error / empty across every list.
- `shared/lib/hooks/use-persistent-reducer` — `useReducer` with storage and a migration hook.
- `app/providers/compose-providers` — flattens the provider pyramid.

## Notes

- Mantine 9 requires React 19.2+. `Collapse` uses `expanded` (not `in`), and the color scheme is
  wired through `localStorageColorSchemeManager`.
- Shell chrome tokens (`--app-border`, `--app-surface`, `--app-hover`, `--app-active`) are declared
  per scheme in `app/styles/global.css` rather than via `light-dark()`, because `:root` is the element
  that carries `data-mantine-color-scheme`.
- Accessibility floor: skip link, visible focus rings, `aria-current` on the active nav item,
  keyboard-resizable splitters, `prefers-reduced-motion` respected.
