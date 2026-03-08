import type { GlassConfig, GlassPreset } from "../types";
import { DEFAULT_GLASS_CONFIG } from "../constants";

export const builtInPresets: Record<string, GlassConfig> = {
  default: {
    blur: "12px",
    tint: "rgba(255, 255, 255, 0.15)",
    shine: "inset 2px 2px 3px rgba(255, 255, 255, 0.6)",
    frost: "none",
    specular: true,
  },
  pulse: {
    blur: "8px",
    tint: "rgba(255, 255, 255, 0.1)",
    shine: "none",
    frost: "light",
    specular: false,
  },
  frost: {
    blur: "10px",
    tint: "rgba(255, 255, 255, 0.18)",
    shine: "inset 2px 2px 4px rgba(255, 255, 255, 0.7)",
    frost: "medium",
    specular: true,
  },
  edge: {
    blur: "14px",
    tint: "rgba(255, 255, 255, 0.12)",
    shine: "inset 3px 3px 2px rgba(255, 255, 255, 0.5)",
    frost: "heavy",
    specular: true,
  },
};

export function mergeConfig(
  preset?: GlassPreset,
  customConfig?: Partial<GlassConfig>
): GlassConfig {
  const baseConfig = preset
    ? builtInPresets[preset] ?? builtInPresets.default
    : builtInPresets.default;
  return { ...baseConfig, ...customConfig };
}

export function createPreset(partial: Partial<GlassConfig>): GlassConfig {
  return { ...DEFAULT_GLASS_CONFIG, ...partial };
}
