import { useState } from "react";
import { LensGlass, type LensGlassProps } from "react-glassy";
import "react-glassy/styles.css";
import { LiveDemo } from "./live-demo";
import { cn } from "@/lib/cn";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { type ReactNode } from "react";

interface LensDemoProps {
  lensProps: Omit<LensGlassProps, "children" | "className">;
  children?: ReactNode;
  minHeight?: string;
}

const LENS_DEFAULTS: Partial<LensGlassProps> = {
  radius: 20,
  depth: 10,
  blur: 1,
  chromaticAberration: 1,
  strength: 100,
  brightness: 1.1,
  saturate: 1.5,
};

function buildCode(
  lensProps: Omit<LensGlassProps, "children" | "className">,
  hasChildren: boolean
): string {
  const optional = (
    Object.entries(lensProps) as [keyof LensGlassProps, number][]
  )
    .filter(
      ([k, v]) =>
        k !== "width" && k !== "height" && v !== LENS_DEFAULTS[k]
    )
    .map(([k, v]) => `  ${k}={${v}}`);

  const propStr = [
    `  width={${lensProps.width}}`,
    `  height={${lensProps.height}}`,
    ...optional,
  ].join("\n");

  if (hasChildren) {
    return `<LensGlass\n${propStr}\n>\n  {/* your content */}\n</LensGlass>`;
  }
  return `<LensGlass\n${propStr}\n/>`;
}

export function LensDemo({
  lensProps,
  children,
  minHeight = "280px",
}: LensDemoProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const code = buildCode(lensProps, !!children);

  return (
    <div className="border rounded-lg overflow-hidden my-4">
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

      {activeTab === "preview" && (
        <LiveDemo className="flex items-center justify-center" style={{ minHeight }}>
          <LensGlass {...lensProps}>{children}</LensGlass>
        </LiveDemo>
      )}

      {activeTab === "code" && (
        <CodeBlock>
          <Pre>{code}</Pre>
        </CodeBlock>
      )}
    </div>
  );
}
