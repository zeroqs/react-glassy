# React Glassy

A React library for creating beautiful liquid glass morphism effects with customizable presets.

## Features

- 🎨 Beautiful glass morphism effects
- ⚙️ Customizable presets and configuration
- 🎭 Built-in SVG filters for distortion effects
- 🚀 Easy to use and lightweight
- 📦 TypeScript support

## Installation

```bash
npm install react-glassy
# or
pnpm add react-glassy
# or
yarn add react-glassy
```

## Quick Start

```tsx
import { SVGFilters, LiquidGlass } from "react-glassy";
import "react-glassy/styles.css";

function App() {
  return (
    <>
      <SVGFilters>
        <SVGFilters.DefaultFilters />
      </SVGFilters>

      <LiquidGlass preset="frost">
        <div>Your content here</div>
      </LiquidGlass>
    </>
  );
}
```

## Documentation

Visit t--

## License

MIT © [zeroqs](https://github.com/zeroqs)
