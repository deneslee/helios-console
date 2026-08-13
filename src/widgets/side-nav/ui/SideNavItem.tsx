import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Badge, Collapse, Menu, Tooltip, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import type { NavItem } from '@/shared/config/navigation';
import classes from './SideNav.module.css';

export interface SideNavItemProps {
  item: NavItem;
  compact: boolean;
  badgeCount?: number;
  /** Called after navigation so floating panels can close themselves. */
  onNavigate?: () => void;
  depth?: number;
}

export function useIsActive(href?: string) {
  const location = useLocation();
  if (!href) return false;
  const [path, search] = href.split('?');
  if (location.pathname !== path) return false;
  return search ? location.search.includes(search) : true;
}

export function SideNavItem({
  item,
  compact,
  badgeCount,
  onNavigate,
  depth = 0,
}: SideNavItemProps) {
  const isActive = useIsActive(item.href);
  const location = useLocation();
  const hasChildren = Boolean(item.children?.length);
  const childActive = Boolean(
    item.children?.some((child) => child.href && location.pathname + location.search === child.href),
  );
  const [opened, setOpened] = useState(childActive);

  const content = (
    <>
      {item.icon && (
        <span className={classes.icon}>
          <item.icon size={compact ? 19 : 17} stroke={1.7} />
        </span>
      )}
      {!compact && <span className={classes.label}>{item.label}</span>}
      {!compact && badgeCount ? (
        <Badge size="xs" variant="light" color="brand" circle>
          {badgeCount}
        </Badge>
      ) : null}
      {!compact && hasChildren && (
        <IconChevronRight
          size={14}
          style={{
            transition: 'transform 140ms ease',
            transform: opened ? 'rotate(90deg)' : undefined,
            color: 'var(--mantine-color-dimmed)',
          }}
        />
      )}
    </>
  );

  // Compact + children: dropdown, so nothing becomes unreachable when collapsed.
  if (compact && hasChildren) {
    return (
      <Menu position="right-start" width={220} shadow="md" withinPortal offset={6}>
        <Menu.Target>
          <UnstyledButton
            className={classes.item}
            data-compact="true"
            data-active={childActive}
            aria-label={item.label}
          >
            {content}
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{item.label}</Menu.Label>
          {item.children?.map((child) => (
            <Menu.Item key={child.id} component={Link} to={child.href ?? '/'} onClick={onNavigate}>
              {child.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  }

  if (hasChildren) {
    return (
      <>
        <UnstyledButton
          className={classes.item}
          data-active={childActive && !opened}
          aria-expanded={opened}
          onClick={() => setOpened((value) => !value)}
        >
          {content}
        </UnstyledButton>
        <Collapse expanded={opened}>
          <div className={classes.children}>
            {item.children?.map((child) => (
              <SideNavItem
                key={child.id}
                item={child}
                compact={false}
                onNavigate={onNavigate}
                depth={depth + 1}
              />
            ))}
          </div>
        </Collapse>
      </>
    );
  }

  const link = (
    <UnstyledButton
      component={Link}
      to={item.href ?? '/'}
      className={classes.item}
      data-compact={compact}
      data-active={isActive}
      aria-current={isActive ? 'page' : undefined}
      onClick={onNavigate}
    >
      {content}
    </UnstyledButton>
  );

  return compact ? (
    <Tooltip
      label={badgeCount ? `${item.label} · ${badgeCount}` : item.label}
      position="right"
      withArrow
      openDelay={200}
    >
      {link}
    </Tooltip>
  ) : (
    link
  );
}
