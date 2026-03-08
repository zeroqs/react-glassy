import type { ReactNode } from "react";
import { DefaultFilters } from "./DefaultFilters";
import styles from "./SVGFilters.module.css";

interface SVGFiltersProps {
  children: ReactNode;
}

function SVGFiltersRoot({ children }: SVGFiltersProps) {
  return (
    <svg className={styles.hidden} aria-hidden="true">
      <defs>{children}</defs>
    </svg>
  );
}

export const SVGFilters = Object.assign(SVGFiltersRoot, {
  DefaultFilters,
});
