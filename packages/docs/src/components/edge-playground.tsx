import { useState, useMemo } from "react";
import { EdgeGlass } from "react-glassy";
import "react-glassy/styles.css";
import { LiveDemo } from "./live-demo";
import { cn } from "@/lib/cn";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

export function EdgePlayground() {
  const [width, setWidth] = useState(240);
  const [height, setHeight] = useState(240);
  const [radius, setRadius] = useState(16);
  const [strength, setStrength] = useState(20);
  const [chromaticAberration, setChromaticAberration] = useState(0);
  const [inset, setInset] = useState(8);
  const [cornerRadius, setCornerRadius] = useState(4);
  const [innerBlur, setInnerBlur] = useState(4);
  const [outerBlur, setOuterBlur] = useState(1.5);
  const [shape, setShape] = useState<"rect" | "circle">("rect");
  const [blur, setBlur] = useState(2);
  const [brightness, setBrightness] = useState(1.05);
  const [saturate, setSaturate] = useState(1.2);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const code = useMemo(() => {
    const props = [
      `  width={${width}}`,
      `  height={${height}}`,
      `  radius={${radius}}`,
      `  strength={${strength}}`,
      chromaticAberration !== 0
        ? `  chromaticAberration={${chromaticAberration}}`
        : null,
      inset !== 8 ? `  inset={${inset}}` : null,
      cornerRadius !== 4 ? `  cornerRadius={${cornerRadius}}` : null,
      innerBlur !== 4 ? `  innerBlur={${innerBlur}}` : null,
      outerBlur !== 1.5 ? `  outerBlur={${outerBlur}}` : null,
      shape !== "rect" ? `  shape="${shape}"` : null,
      blur !== 2 ? `  blur={${blur}}` : null,
      brightness !== 1.05 ? `  brightness={${brightness}}` : null,
      saturate !== 1.2 ? `  saturate={${saturate}}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    return `<EdgeGlass\n${props}\n/>`;
  }, [
    width,
    height,
    radius,
    strength,
    chromaticAberration,
    inset,
    cornerRadius,
    innerBlur,
    outerBlur,
    shape,
    blur,
    brightness,
    saturate,
  ]);

  return (
    <div className="space-y-6">
      <div className="space-y-4 p-4 border rounded-lg bg-card resize-y overflow-auto min-h-[400px] max-h-[800px]">
        <h3 className="text-lg font-semibold">Configuration</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Width: {width}px
            </label>
            <input
              type="range"
              min="80"
              max="400"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Height: {height}px
            </label>
            <input
              type="range"
              min="80"
              max="400"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Border radius: {radius}px
          </label>
          <input
            type="range"
            min="0"
            max={Math.floor(Math.min(width, height) / 2)}
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Strength: {strength}
          </label>
          <input
            type="range"
            min="5"
            max="50"
            value={strength}
            onChange={(e) => setStrength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Chromatic Aberration: {chromaticAberration}
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={chromaticAberration}
            onChange={(e) => setChromaticAberration(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Edge band (inset): {inset}%
          </label>
          <input
            type="range"
            min="2"
            max="30"
            value={inset}
            onChange={(e) => setInset(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Center corner radius: {cornerRadius}
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={cornerRadius}
            onChange={(e) => setCornerRadius(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Inner blur: {innerBlur}
          </label>
          <input
            type="range"
            min="0"
            max="12"
            step="0.5"
            value={innerBlur}
            onChange={(e) => setInnerBlur(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Outer blur: {outerBlur}
          </label>
          <input
            type="range"
            min="0"
            max="6"
            step="0.25"
            value={outerBlur}
            onChange={(e) => setOuterBlur(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Center shape</label>
          <div className="flex gap-2">
            {(["rect", "circle"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md border transition-colors",
                  shape === s
                    ? "bg-fd-accent text-fd-accent-foreground border-fd-accent"
                    : "text-fd-muted-foreground hover:text-fd-foreground"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Blur: {blur}px
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={blur}
            onChange={(e) => setBlur(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Brightness: {brightness}
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.05"
            value={brightness}
            onChange={(e) => setBrightness(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Saturate: {saturate}
          </label>
          <input
            type="range"
            min="0"
            max="4"
            step="0.1"
            value={saturate}
            onChange={(e) => setSaturate(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
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

        <div className="relative">
          {activeTab === "preview" && (
            <LiveDemo className="min-h-[340px] flex items-center justify-center">
              <EdgeGlass
                width={width}
                height={height}
                radius={radius}
                strength={strength}
                chromaticAberration={chromaticAberration}
                inset={inset}
                cornerRadius={cornerRadius}
                innerBlur={innerBlur}
                outerBlur={outerBlur}
                shape={shape}
                blur={blur}
                brightness={brightness}
                saturate={saturate}
              />
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
