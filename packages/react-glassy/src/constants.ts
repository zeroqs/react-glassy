export const FILTER_IDS = {
  CARD_DISTORTION: "card-distortion",
  PRESET_PULSE: "preset-pulse",
  PRESET_FROST: "preset-frost",
  PRESET_EDGE: "preset-edge",
} as const;

export const FROST_LEVELS: Record<string, string> = {
  none: FILTER_IDS.CARD_DISTORTION,
  light: FILTER_IDS.PRESET_PULSE,
  medium: FILTER_IDS.PRESET_FROST,
  heavy: FILTER_IDS.PRESET_EDGE,
};

export const DEFAULT_GLASS_CONFIG = {
  blur: "12px",
  tint: "rgba(255, 255, 255, 0.15)",
  shine: "inset 2px 2px 3px rgba(255, 255, 255, 0.6)",
  frost: "none" as const,
  specular: true,
  borderRadius: "24px",
};
