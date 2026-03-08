import type { ReactNode } from "react";

export type OnlyDefinedKeys<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]: Exclude<
    T[K],
    undefined
  >;
};

export type BuiltInFrostLevel = "none" | "light" | "medium" | "heavy";
export type FrostLevel = BuiltInFrostLevel | (string & {});

export type BuiltInPreset = "default" | "pulse" | "frost" | "edge";
export type GlassPreset = BuiltInPreset | (string & {});

export interface GlassConfig {
  blur: string;
  tint: string;
  shine: string;
  frost: FrostLevel;
  specular: boolean;
  borderRadius?: string;
}

export interface GlassProps {
  preset?: GlassPreset;
  config?: Partial<GlassConfig>;
  children: ReactNode;
  className?: string;
}

export interface CustomPresetEntry {
  name: string;
  config: GlassConfig;
}
