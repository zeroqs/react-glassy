import { useState, useMemo } from "react";
import { LensGlass } from "react-glassy";
import "react-glassy/styles.css";
import { LiveDemo } from "./live-demo";
import { cn } from "@/lib/cn";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

export function LensPlayground() {
  const [width, setWidth] = useState(220);
  const [height, setHeight] = useState(220);
  const [radius, setRadius] = useState(20);
  const [depth, setDepth] = useState(10);
  const [blur, setBlur] = useState(1);
  const [chromaticAberration, setChromaticAberration] = useState(1);
  const [strength, setStrength] = useState(100);
  const [brightness, setBrightness] = useState(1.1);
  const [saturate, setSaturate] = useState(1.5);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const code = useMemo(() => {
    const props = [
      `  width={${width}}`,
      `  height={${height}}`,
      `  radius={${radius}}`,
      `  depth={${depth}}`,
      `  blur={${blur}}`,
      `  chromaticAberration={${chromaticAberration}}`,
      strength !== 100 ? `  strength={${strength}}` : null,
      brightness !== 1.1 ? `  brightness={${brightness}}` : null,
      saturate !== 1.5 ? `  saturate={${saturate}}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    return `<LensGlass\n${props}\n/>`;
  }, [width, height, radius, depth, blur, chromaticAberration, strength]);

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
            Radius: {radius}px
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
            Depth: {depth}
          </label>
          <input
            type="range"
            min="1"
            max="40"
            value={depth}
            onChange={(e) => setDepth(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Blur: {blur}
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
            Chromatic Aberration: {chromaticAberration}
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={chromaticAberration}
            onChange={(e) => setChromaticAberration(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Strength: {strength}
          </label>
          <input
            type="range"
            min="10"
            max="300"
            value={strength}
            onChange={(e) => setStrength(parseInt(e.target.value))}
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
              <LensGlass
                width={width}
                height={height}
                radius={radius}
                depth={depth}
                blur={blur}
                chromaticAberration={chromaticAberration}
                strength={strength}
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
