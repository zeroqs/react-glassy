import { source } from '@/lib/source';
import { createFileRoute } from '@tanstack/react-router';

const LIBRARY_OVERVIEW = `# React Glassy

> A React library for glass morphism effects combining CSS \`backdrop-filter\` with SVG displacement filters. Provides two distinct approaches: turbulence-based distortion (\`LiquidGlass\`) and geometry-aware lens refraction (\`LensGlass\`).

React Glassy is composable, tree-shakeable, and ships a single CSS bundle. It works with any styling approach — plain CSS, Tailwind, styled-components, etc.

## Browser Compatibility

All SVG distortion effects require Chromium-based browsers (Chrome, Edge, Arc).

- \`LiquidGlass\` — in Safari: blur and tint render correctly, \`filter: url(#...)\` distortion is silently ignored.
- \`LensGlass\` — in Safari: completely transparent (no blur, no distortion). Use \`LiquidGlass\` as a fallback.
- Safari has a compositor limitation with \`backdrop-filter: blur()\`: many blurred elements simultaneously cause frame drops. Chrome and Firefox are unaffected.

## Architecture

\`LiquidGlass\` applies an SVG filter (turbulence → displacement) to a div that also has \`backdrop-filter: blur()\`. The SVG filters are defined once via \`<SVGFilters>\` anywhere in the tree and referenced by ID — required for frost effects.

\`LensGlass\` generates a geometry-aware displacement map (linear gradients sized to the element's exact dimensions and border radius) as a DOM \`<filter>\` element injected into a shared hidden \`<svg>\`. Multiple elements with identical configs share one filter via ref-counting. When \`width\`/\`height\` are omitted, a \`ResizeObserver\` measures the element and snaps dimensions to 4px increments.

## Installation

\`\`\`bash
npm install react-glassy
# or
pnpm add react-glassy
\`\`\`

\`\`\`tsx
import "react-glassy/styles.css";
\`\`\`

## Quick API Reference

### LiquidGlass

\`\`\`tsx
import { SVGFilters, LiquidGlass } from "react-glassy";

// SVGFilters must be rendered once in the app (anywhere in the tree)
<SVGFilters>
  <SVGFilters.DefaultFilters />
</SVGFilters>

<LiquidGlass preset="frost" config={{ blur: "10px", borderRadius: "16px" }}>
  <div>content</div>
</LiquidGlass>
\`\`\`

Props: \`preset\` ("default" | "pulse" | "frost" | "edge"), \`config\` (Partial<GlassConfig>), \`children\`, \`className\`

GlassConfig fields: \`blur\` (string), \`tint\` (string), \`shine\` (string), \`frost\` (FrostLevel), \`specular\` (boolean), \`borderRadius\` (string)

### LensGlass

\`\`\`tsx
import { LensGlass } from "react-glassy";

// No SVGFilters setup needed — self-contained
<LensGlass
  width={300}   // optional — measured via ResizeObserver if omitted
  height={200}  // optional — measured via ResizeObserver if omitted
  radius={20}
  depth={10}
  blur={1}
  chromaticAberration={1}
  strength={100}
  brightness={1.1}
  saturate={1.5}
/>
\`\`\`

Props: \`width?\`, \`height?\`, \`radius\` (20), \`depth\` (10), \`blur\` (1), \`chromaticAberration\` (1), \`strength\` (100), \`brightness\` (1.1), \`saturate\` (1.5), \`children?\`, \`className?\`

### withLiquid HOC

\`\`\`tsx
import { withLiquid } from "react-glassy";

const GlassCard = withLiquid(Card, { preset: "frost", config: { borderRadius: "16px" } });
\`\`\`

### withLens HOC

\`\`\`tsx
import { withLens } from "react-glassy";

const GlassCard = withLens(Card, { width: 300, height: 200, radius: 20, depth: 10 });
// width/height optional — ResizeObserver measures automatically
\`\`\`

### Custom SVG Filters

\`\`\`tsx
<SVGFilters>
  <SVGFilters.DefaultFilters />
  <filter id="my-filter" x="0%" y="0%" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="4" seed="55" />
    <feGaussianBlur stdDeviation="3" result="blur" />
    <feDisplacementMap in="SourceGraphic" in2="blur" scale="100" xChannelSelector="R" yChannelSelector="G" />
  </filter>
</SVGFilters>

<LiquidGlass config={{ frost: "my-filter" }}>...</LiquidGlass>
\`\`\`

## Documentation Pages
`;

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () => {
        const lines: string[] = [LIBRARY_OVERVIEW];
        for (const page of source.getPages()) {
          lines.push(`- [${page.data.title}](${page.url}): ${page.data.description}`);
        }
        lines.push('');
        lines.push('## Full Content');
        lines.push('');
        lines.push('For complete page content in LLM-readable format: /llms-full.txt');
        return new Response(lines.join('\n'));
      },
    },
  },
});
