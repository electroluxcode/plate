import type { SidebarNavItem } from '@/types/nav';

export const navToObject = (
  items: SidebarNavItem[] | { items: SidebarNavItem[] }[]
) =>
  Object.fromEntries(
    (Array.isArray(items)
      ? items.flatMap((item) => ('items' in item ? item.items : item))
      : items
    ).map((item) => [item!.href, item])
  );
