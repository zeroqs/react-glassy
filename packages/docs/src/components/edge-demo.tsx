import { useState } from "react";
import { EdgeGlass, type EdgeGlassProps } from "react-glassy";
import "react-glassy/styles.css";
import { LiveDemo } from "./live-demo";
import { cn } from "@/lib/cn";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { type ReactNode } from "react";

interface EdgeDemoProps {
  edgeProps: Omit<EdgeGlassProps, "children" | "className">;
  children?: ReactNode;
  minHeight?: string;
}

const EDGE_DEFAULTS: Partial<EdgeGlassProps> = {
  radius: 16,
  strength: 20,
  chromaticAberration: 0,
  inset: 8,
  cornerRadius: 4,
  innerBlur: 4,
  outerBlur: 1.5,
  shape: "rect",
  blur: 2,
  brightness: 1.05,
  saturate: 1.2,
};

function buildCode(
  edgeProps: Omit<EdgeGlassProps, "children" | "className">,
  hasChildren: boolean
): string {
  const optional = (
    Object.entries(edgeProps) as [keyof EdgeGlassProps, number | string][]
  )
    .filter(
      ([k, v]) => k !== "width" && k !== "height" && v !== EDGE_DEFAULTS[k]
    )
    .map(([k, v]) =>
      typeof v === "string" ? `  ${k}="${v}"` : `  ${k}={${v}}`
    );

  const propStr = [
    `  width={${edgeProps.width}}`,
    `  height={${edgeProps.height}}`,
    ...optional,
  ].join("\n");

  if (hasChildren) {
    return `<EdgeGlass\n${propStr}\n>\n  {/* your content */}\n</EdgeGlass>`;
  }
  return `<EdgeGlass\n${propStr}\n/>`;
}

export function EdgeDemo({
  edgeProps,
  children,
  minHeight = "280px",
}: EdgeDemoProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const code = buildCode(edgeProps, !!children);

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
        <LiveDemo
          className="flex items-center justify-center"
          style={{ minHeight }}
        >
          <EdgeGlass {...edgeProps}>{children}</EdgeGlass>
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
