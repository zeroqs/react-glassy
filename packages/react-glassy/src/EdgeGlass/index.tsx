import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  acquireSharedFilter,
  releaseSharedFilter,
} from "../utils/svgFilterRegistry";
import { buildEdgeFilterXML, type EdgeFilterOptions } from "./getEdgeFilter";
import styles from "./EdgeGlass.module.css";

export interface EdgeGlassProps {
  /** Fixed width in px. If omitted, the element fills its container */
  width?: number;
  /** Fixed height in px. If omitted, the element fills its container */
  height?: number;
  /** Border radius in px */
  radius?: number;
  /** Displacement intensity (tw-glass scale: 20 → 10% of element size) */
  strength?: number;
  /** RGB channel split; 0 disables, 1 matches tw-glass chromatic ratios */
  chromaticAberration?: number;
  /** Width of the refracting edge band, in % of element size */
  inset?: number;
  /** Corner radius of the undistorted center zone (map units, 0-50) */
  cornerRadius?: number;
  /** Softness of the transition between edge band and center */
  innerBlur?: number;
  /** Smoothing of the displacement gradients */
  outerBlur?: number;
  /** Shape of the undistorted center zone */
  shape?: "rect" | "circle";
  /** Backdrop blur in px, applied after the displacement filter */
  blur?: number;
  brightness?: number;
  saturate?: number;
  children?: ReactNode;
  className?: string;
}

export function EdgeGlass({
  width,
  height,
  radius = 16,
  strength = 20,
  chromaticAberration = 0,
  inset = 8,
  cornerRadius = 4,
  innerBlur = 4,
  outerBlur = 1.5,
  shape = "rect",
  blur = 2,
  brightness = 1.05,
  saturate = 1.2,
  children,
  className,
}: EdgeGlassProps) {
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);

  // The filter is declared in objectBoundingBox units, so it is size-independent:
  // every EdgeGlass with the same config shares a single DOM filter.
  useEffect(() => {
    const filterConfig: EdgeFilterOptions = {
      strength,
      chromaticAberration,
      inset,
      cornerRadius,
      innerBlur,
      outerBlur,
      shape,
    };
    const registryKey = `edge:${JSON.stringify(filterConfig)}`;

    const filterId = acquireSharedFilter(registryKey, (id) =>
      buildEdgeFilterXML(id, filterConfig)
    );
    setActiveFilterId(filterId);

    return () => {
      releaseSharedFilter(registryKey);
    };
  }, [
    strength,
    chromaticAberration,
    inset,
    cornerRadius,
    innerBlur,
    outerBlur,
    shape,
  ]);

  const backdropFilterValue = activeFilterId
    ? `url(#${activeFilterId}) blur(${blur}px) brightness(${brightness}) saturate(${saturate})`
    : undefined;

  const style: CSSProperties = {
    width: width !== undefined ? `${width}px` : "100%",
    height: height !== undefined ? `${height}px` : "100%",
    borderRadius: `${radius}px`,
    backdropFilter: backdropFilterValue,
    WebkitBackdropFilter: backdropFilterValue,
  };

  return (
    <div
      className={`${styles.edge}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
