import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Masonry.css';

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get());
    queries.forEach((q) => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach((q) => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

export default function Masonry({
  items,
  renderItem,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.96,
  blurToFocus = true
}) {
  const columns = useMedia(['(min-width:1200px)', '(min-width:760px)'], [2, 2], 1);
  const [containerRef, { width }] = useMeasure();
  const hasMounted = useRef(false);

  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    return items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = item.height || 220;
      const y = colHeights[col];
      colHeights[col] += height;
      return { ...item, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const containerHeight = grid.reduce((max, item) => Math.max(max, item.y + item.h), 0);

  const getInitialPosition = (item) => {
    if (animateFrom === 'left') return { x: -200, y: item.y };
    if (animateFrom === 'right') return { x: window.innerWidth + 200, y: item.y };
    if (animateFrom === 'top') return { x: item.x, y: -200 };
    return { x: item.x, y: item.y + 120 };
  };

  useLayoutEffect(() => {
    if (!grid.length) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: initialPos.x,
            y: initialPos.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' })
          },
          {
            opacity: 1,
            ...animationProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        gsap.to(selector, { ...animationProps, duration, ease, overwrite: 'auto' });
      }
    });

    hasMounted.current = true;
  }, [grid, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (item) => {
    if (!scaleOnHover) return;
    gsap.to(`[data-key="${item.id}"]`, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = (item) => {
    if (!scaleOnHover) return;
    gsap.to(`[data-key="${item.id}"]`, { scale: 1, duration: 0.3, ease: 'power2.out' });
  };

  return (
    <div ref={containerRef} className="masonry-list" style={{ height: containerHeight || 1 }}>
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className="masonry-item-wrapper"
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={() => handleMouseLeave(item)}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}
