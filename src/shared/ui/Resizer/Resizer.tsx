import { useEffect } from 'react';
import { useResizable, type UseResizableOptions } from '../../lib/hooks';
import classes from './Resizer.module.css';

export interface ResizerProps extends UseResizableOptions {
  /** Which edge of the parent panel the handle sits on. */
  side: 'start' | 'end';
  label: string;
  onResizingChange?: (isResizing: boolean) => void;
}

/** A keyboard-accessible vertical splitter. Purely presentational; state lives in the caller. */
export function Resizer({ side, label, onResizingChange, ...options }: ResizerProps) {
  const { separatorProps, isResizing } = useResizable({ ...options, invert: side === 'start' });

  useEffect(() => {
    onResizingChange?.(isResizing);
  }, [isResizing, onResizingChange]);

  return (
    <div
      {...separatorProps}
      aria-label={label}
      data-side={side}
      data-active={isResizing || undefined}
      className={classes.resizer}
    />
  );
}
