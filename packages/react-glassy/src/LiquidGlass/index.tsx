import { useMemo } from "react";
import type { GlassProps } from "../types";
import { FROST_LEVELS, DEFAULT_GLASS_CONFIG } from "../constants";
import { mergeConfig } from "../utils/presets";
import styles from "./LiquidGlass.module.css";

export function LiquidGlass({
  preset,
  config,
  children,
  className,
}: GlassProps) {
  const mergedConfig = useMemo(
    () => mergeConfig(preset, config),
    [preset, config]
  );
  const frostFilterId = FROST_LEVELS[mergedConfig.frost] ?? mergedConfig.frost;

  const cssVariables = {
    "--blur": mergedConfig.blur,
    "--tint": mergedConfig.tint,
    "--shine": mergedConfig.shine,
    "--glass-border-radius":
      mergedConfig.borderRadius ?? DEFAULT_GLASS_CONFIG.borderRadius,
  } as React.CSSProperties;

  const filterStyle = frostFilterId ? `url(#${frostFilterId})` : "none";

  return (
    <div
      className={`${styles.wrapper} ${className ?? ""}`}
      style={cssVariables}
    >
      <div className={styles.effect} style={{ filter: filterStyle }} />
      <div className={styles.tint} />
      <div
        className={styles.shine}
        data-specular={mergedConfig.specular}
        data-shine={mergedConfig.shine}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
