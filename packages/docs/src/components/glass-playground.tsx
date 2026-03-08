"use client";

import { useState, useMemo } from "react";
import {
  LiquidGlass,
  SVGFilters,
  type GlassConfig,
  type GlassPreset,
} from "react-glassy";
import { builtInPresets, DEFAULT_GLASS_CONFIG } from "react-glassy";
import "react-glassy/styles.css";
import { LiveDemo } from "./live-demo";
import { cn } from "@/lib/cn";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

const FROST_LEVELS = ["none", "light", "medium", "heavy"] as const;
const PRESETS = ["default", "pulse", "frost", "edge"] as const;

function parseBlur(blur: string): number {
  return parseFloat(blur.replace("px", "")) || 12;
}

function formatBlur(px: number): string {
  return `${px}px`;
}

function parseBorderRadius(radius: string): number {
  return parseFloat(radius.replace("px", "")) || 24;
}

function formatBorderRadius(px: number): string {
  return `${px}px`;
}

function parseTint(tint: string): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  const match = tint.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
      a: parseFloat(match[4] ?? "1"),
    };
  }
  return { r: 255, g: 255, b: 255, a: 0.15 };
}

function formatTint(r: number, g: number, b: number, a: number): string {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function GlassPlayground() {
  const [preset, setPreset] = useState<GlassPreset | "">("default");
  const [blur, setBlur] = useState(12);
  const [borderRadius, setBorderRadius] = useState(24);
  const [tintR, setTintR] = useState(255);
  const [tintG, setTintG] = useState(255);
  const [tintB, setTintB] = useState(255);
  const [tintA, setTintA] = useState(0.15);
  const [frost, setFrost] = useState<(typeof FROST_LEVELS)[number]>("none");
  const [specular, setSpecular] = useState(true);
  const [shine, setShine] = useState(
    "inset 2px 2px 3px rgba(255, 255, 255, 0.6)"
  );
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const config: Partial<GlassConfig> = useMemo(() => {
    const baseConfig = preset
      ? builtInPresets[preset] ?? builtInPresets.default
      : builtInPresets.default;
    return {
      blur: formatBlur(blur),
      tint: formatTint(tintR, tintG, tintB, tintA),
      shine,
      frost,
      specular,
      borderRadius: formatBorderRadius(borderRadius),
    };
  }, [
    preset,
    blur,
    borderRadius,
    tintR,
    tintG,
    tintB,
    tintA,
    frost,
    specular,
    shine,
  ]);

  const code = useMemo(() => {
    const configStr = Object.entries(config)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `    ${key}: '${value}'`;
        }
        return `    ${key}: ${value}`;
      })
      .join(",\n");
    return `<LiquidGlass${
      preset ? ` preset="${preset}"` : ""
    } config={{\n${configStr}\n}}>\n  <div>Your content here</div>\n</LiquidGlass>`;
  }, [preset, config]);

  const handlePresetChange = (newPreset: (typeof PRESETS)[number]) => {
    setPreset(newPreset);
    if (newPreset) {
      const presetConfig = builtInPresets[newPreset];
      setBlur(parseBlur(presetConfig.blur));
      setBorderRadius(
        parseBorderRadius(
          presetConfig.borderRadius ?? DEFAULT_GLASS_CONFIG.borderRadius
        )
      );
      const tint = parseTint(presetConfig.tint);
      setTintR(tint.r);
      setTintG(tint.g);
      setTintB(tint.b);
      setTintA(tint.a);
      setFrost(presetConfig.frost as (typeof FROST_LEVELS)[number]);
      setSpecular(presetConfig.specular);
      setShine(presetConfig.shine);
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <div className="space-y-4 p-4 border rounded-lg bg-card resize-y overflow-auto min-h-[400px] max-h-[800px]">
        <h3 className="text-lg font-semibold">Configuration</h3>

        {/* Preset */}
        <div>
          <label className="block text-sm font-medium mb-2">Preset</label>
          <select
            value={preset}
            onChange={(e) =>
              handlePresetChange(e.target.value as (typeof PRESETS)[number])
            }
            className="w-full px-3 py-2 border rounded-md bg-fd-background text-fd-foreground"
          >
            <option value="">None (custom)</option>
            {PRESETS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Blur */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Blur: {blur}px
          </label>
          <input
            type="range"
            min="0"
            max="30"
            value={blur}
            onChange={(e) => setBlur(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Border Radius */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Border Radius: {borderRadius}px
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={borderRadius}
            onChange={(e) => setBorderRadius(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Tint Color */}
        <div>
          <label className="block text-sm font-medium mb-2">Tint Color</label>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="text-xs text-muted-foreground">R</label>
              <input
                type="number"
                min="0"
                max="255"
                value={tintR}
                onChange={(e) => setTintR(parseInt(e.target.value) || 0)}
                className="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">G</label>
              <input
                type="number"
                min="0"
                max="255"
                value={tintG}
                onChange={(e) => setTintG(parseInt(e.target.value) || 0)}
                className="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">B</label>
              <input
                type="number"
                min="0"
                max="255"
                value={tintB}
                onChange={(e) => setTintB(parseInt(e.target.value) || 0)}
                className="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">A</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={tintA}
                onChange={(e) => setTintA(parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>
          <div
            className="mt-2 h-8 rounded border"
            style={{
              backgroundColor: formatTint(tintR, tintG, tintB, tintA),
            }}
          />
        </div>

        {/* Frost Level */}
        <div>
          <label className="block text-sm font-medium mb-2">Frost Level</label>
          <select
            value={frost}
            onChange={(e) =>
              setFrost(e.target.value as (typeof FROST_LEVELS)[number])
            }
            className="w-full px-3 py-2 border rounded-md bg-fd-background text-fd-foreground"
          >
            {FROST_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Specular */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="specular"
            checked={specular}
            onChange={(e) => setSpecular(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="specular" className="text-sm font-medium">
            Specular
          </label>
        </div>

        {/* Shine */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Shine (box-shadow)
          </label>
          <input
            type="text"
            value={shine}
            onChange={(e) => setShine(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-background text-sm font-mono"
            placeholder="inset 2px 2px 3px rgba(255, 255, 255, 0.6)"
          />
        </div>
      </div>

      {/* Preview/Code Tabs */}
      <div className="border rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex-1 px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "preview"
                ? "bg-fd-accent text-fd-accent-foreground"
                : "text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent/50"
            )}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "flex-1 px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "code"
                ? "bg-fd-accent text-fd-accent-foreground"
                : "text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent/50"
            )}
          >
            Code
          </button>
        </div>

        {/* Tab Content */}
        <div className="relative">
          {activeTab === "preview" && (
            <LiveDemo className="min-h-[300px] flex items-center justify-center">
              <LiquidGlass {...(preset ? { preset } : {})} config={config}>
                <div className="text-center p-6">
                  <h4 className="text-xl font-semibold mb-2">Glass Effect</h4>
                  <p className="text-sm text-muted-foreground">
                    Adjust the controls to see changes in real-time
                  </p>
                </div>
              </LiquidGlass>
            </LiveDemo>
          )}

          {activeTab === "code" && (
            <CodeBlock>
              <Pre>{code}</Pre>
            </CodeBlock>
          )}
        </div>
      </div>
    </div>
  );
}
