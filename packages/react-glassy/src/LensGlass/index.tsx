import { useMemo, type CSSProperties, type ReactNode } from "react";
import { getDisplacementFilter } from "./getDisplacementFilter";
import styles from "./LensGlass.module.css";

export interface LensGlassProps {
  width: number;
  height: number;
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
  width,
  height,
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
  const filterUrl = useMemo(
    () =>
      getDisplacementFilter({
        width,
        height,
        radius,
        depth,
        strength,
        chromaticAberration,
      }),
    [width, height, radius, depth, strength, chromaticAberration]
  );

  const style: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: `${radius}px`,
    backdropFilter: `blur(${blur / 2}px) url('${filterUrl}') blur(${blur}px) brightness(${brightness}) saturate(${saturate})`,
    WebkitBackdropFilter: `blur(${blur / 2}px) url('${filterUrl}') blur(${blur}px) brightness(${brightness}) saturate(${saturate})`,
  };

  return (
    <div className={`${styles.lens}${className ? ` ${className}` : ""}`} style={style}>
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
