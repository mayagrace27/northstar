import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type LazyWhenVisibleProps = {
  children: ReactNode;
  /** Start loading before the block enters the viewport. */
  rootMargin?: string;
  /** Reserve space to limit layout shift while deferred content mounts. */
  minHeight?: CSSProperties['minHeight'];
};

/** Mount children only when the placeholder nears the viewport. */
export function LazyWhenVisible({
  children,
  rootMargin = '320px',
  minHeight,
}: LazyWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={minHeight != null ? { minHeight } : undefined}>
      {visible ? children : null}
    </div>
  );
}
