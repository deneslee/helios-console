import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

export interface UseResizableOptions {
  value: number;
  onChange: (next: number) => void;
  min: number;
  max: number;
  /** true when the handle sits on the left edge of the panel (right-side panels). */
  invert?: boolean;
  /** Keyboard step in px. */
  step?: number;
  onDoubleClick?: () => void;
}

/**
 * Pointer + keyboard resizing for a vertical splitter.
 * Returns props to spread on the handle — the handle stays dumb, the hook owns the maths.
 */
export function useResizable({
  value,
  onChange,
  min,
  max,
  invert = false,
  step = 16,
  onDoubleClick,
}: UseResizableOptions) {
  const [isResizing, setIsResizing] = useState(false);
  const drag = useRef({ startX: 0, startValue: 0 });
  const latest = useRef({ onChange, min, max, invert });
  latest.current = { onChange, min, max, invert };

  const clamp = useCallback((n: number) => Math.min(max, Math.max(min, Math.round(n))), [min, max]);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (event.button !== 0) return;
      event.preventDefault();
      drag.current = { startX: event.clientX, startValue: value };
      setIsResizing(true);
    },
    [value],
  );

  useEffect(() => {
    if (!isResizing) return;

    const handleMove = (event: globalThis.PointerEvent) => {
      const { onChange: change, min: lo, max: hi, invert: flip } = latest.current;
      const delta = (event.clientX - drag.current.startX) * (flip ? -1 : 1);
      change(Math.min(hi, Math.max(lo, Math.round(drag.current.startValue + delta))));
    };
    const stop = () => setIsResizing(false);

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const direction = invert ? -1 : 1;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onChange(clamp(value - step * direction));
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onChange(clamp(value + step * direction));
      }
      if (event.key === 'Home') {
        event.preventDefault();
        onChange(min);
      }
      if (event.key === 'End') {
        event.preventDefault();
        onChange(max);
      }
    },
    [clamp, invert, max, min, onChange, step, value],
  );

  return {
    isResizing,
    separatorProps: {
      role: 'separator' as const,
      'aria-orientation': 'vertical' as const,
      'aria-valuenow': value,
      'aria-valuemin': min,
      'aria-valuemax': max,
      tabIndex: 0,
      onPointerDown: handlePointerDown,
      onKeyDown: handleKeyDown,
      onDoubleClick,
    },
  };
}
