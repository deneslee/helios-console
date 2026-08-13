import { db } from './index';

export type SearchResultKind = 'site' | 'work-order' | 'person';

export interface SearchResult {
  id: string;
  kind: SearchResultKind;
  title: string;
  subtitle: string;
  href: string;
}

const matches = (term: string, ...fields: string[]) =>
  fields.some((field) => field.toLowerCase().includes(term));

/** One query across every table — add a table here and search picks it up. */
export async function searchAll(rawTerm: string, limit = 8): Promise<SearchResult[]> {
  const term = rawTerm.trim().toLowerCase();
  if (term.length < 2) return [];

  const [sites, workOrders, users] = await Promise.all([
    db.sites.list(),
    db.workOrders.list(),
    db.users.list(),
  ]);

  const results: SearchResult[] = [
    ...sites
      .filter((site) => matches(term, site.name, site.region))
      .map((site) => ({
        id: site.id,
        kind: 'site' as const,
        title: site.name,
        subtitle: `${site.region} · ${site.capacityMw} MW`,
        href: `/sites?focus=${site.id}`,
      })),
    ...workOrders
      .filter((order) => matches(term, order.title))
      .map((order) => ({
        id: order.id,
        kind: 'work-order' as const,
        title: order.title,
        subtitle: `Work order · ${order.status.replace('_', ' ')}`,
        href: `/work-orders?focus=${order.id}`,
      })),
    ...users
      .filter((user) => matches(term, user.name, user.role))
      .map((user) => ({
        id: user.id,
        kind: 'person' as const,
        title: user.name,
        subtitle: user.role,
        href: `/settings?person=${user.id}`,
      })),
  ];

  return results.slice(0, limit);
}
