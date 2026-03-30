import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { acquireFilter, releaseFilter, type LensFilterConfig } from "./filterRegistry";
import styles from "./LensGlass.module.css";

const RESIZE_SNAP_PIXELS = 4;

export interface LensGlassProps {
  width?: number;
  height?: number;
  radius?: number;
  depth?: number;
  blur?: number;
  chromaticAberration?: number;
  strength?: number;
  brightness?: number;
  saturate?: number;
  children?: ReactNode;
  className?: string;
}

export function LensGlass({
  width: widthProp,
  height: heightProp,
  radius = 20,
  depth = 10,
  blur = 1,
  chromaticAberration = 1,
  strength = 100,
  brightness = 1.1,
  saturate = 1.5,
  children,
  className,
}: LensGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [measuredSize, setMeasuredSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);

  // Measure element when width/height are not provided as props
  useEffect(() => {
    if (widthProp !== undefined && heightProp !== undefined) return;
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const observedEntry = entries[0];
      if (!observedEntry) return;

      const snappedWidth =
        Math.round(observedEntry.contentRect.width / RESIZE_SNAP_PIXELS) *
        RESIZE_SNAP_PIXELS;
      const snappedHeight =
        Math.round(observedEntry.contentRect.height / RESIZE_SNAP_PIXELS) *
        RESIZE_SNAP_PIXELS;

      setMeasuredSize({ width: snappedWidth, height: snappedHeight });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [widthProp, heightProp]);

  const resolvedWidth = widthProp ?? measuredSize?.width ?? 0;
  const resolvedHeight = heightProp ?? measuredSize?.height ?? 0;

  // Acquire a shared DOM filter, release it when config changes or on unmount
  useEffect(() => {
    if (!resolvedWidth || !resolvedHeight) return;

    const filterConfig: LensFilterConfig = {
      width: resolvedWidth,
      height: resolvedHeight,
      radius,
      depth,
      strength,
      chromaticAberration,
    };

    const filterId = acquireFilter(filterConfig);
    setActiveFilterId(filterId);

    return () => {
      releaseFilter(filterConfig);
    };
  }, [resolvedWidth, resolvedHeight, radius, depth, strength, chromaticAberration]);

  const backdropFilterValue = activeFilterId
    ? `blur(${blur / 2}px) url(#${activeFilterId}) blur(${blur}px) brightness(${brightness}) saturate(${saturate})`
    : undefined;

  const style: CSSProperties = {
    width: widthProp !== undefined ? `${widthProp}px` : "100%",
    height: heightProp !== undefined ? `${heightProp}px` : "100%",
    borderRadius: `${radius}px`,
    backdropFilter: backdropFilterValue,
    WebkitBackdropFilter: backdropFilterValue,
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.lens}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
