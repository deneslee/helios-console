import { useState, type CSSProperties, type ReactNode } from 'react';
import { ScrollArea } from '@mantine/core';
import { Resizer } from '../Resizer/Resizer';
import classes from './DockablePanel.module.css';

export interface DockablePanelProps {
  side: 'left' | 'right';
  docked: boolean;
  width: number;
  label: string;
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  resize?: { min: number; max: number; onChange: (width: number) => void; onReset?: () => void };
  scroll?: boolean;
}

/**
 * The generic shell for a side panel: docked (in flow) or floating (over content),
 * optionally resizable. It knows nothing about navigation or context — pass content in.
 */
export function DockablePanel({
  side,
  docked,
  width,
  label,
  children,
  header,
  footer,
  resize,
  scroll = true,
}: DockablePanelProps) {
  const [isResizing, setIsResizing] = useState(false);

  return (
    <aside
      aria-label={label}
      data-side={side}
      data-docked={docked}
      data-resizing={isResizing}
      className={classes.panel}
      style={{ '--panel-width': `${width}px` } as CSSProperties}
    >
      {header && <div className={classes.header}>{header}</div>}

      {scroll ? (
        <ScrollArea className={classes.body} type="hover" scrollbarSize={8}>
          {children}
        </ScrollArea>
      ) : (
        <div className={classes.body}>{children}</div>
      )}

      {footer && <div className={classes.footer}>{footer}</div>}

      {resize && (
        <Resizer
          side={side === 'left' ? 'end' : 'start'}
          label={`Resize ${label}`}
          value={width}
          min={resize.min}
          max={resize.max}
          onChange={resize.onChange}
          onDoubleClick={resize.onReset}
          onResizingChange={setIsResizing}
        />
      )}
    </aside>
  );
}
