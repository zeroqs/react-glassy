import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import Iridescence from "@/components/iridescence";
import { LiquidGlass, SVGFilters } from "react-glassy";

import "react-glassy/styles.css";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <SVGFilters>
        <SVGFilters.DefaultFilters />
      </SVGFilters>
      <div className="w-full h-screen absolute inset-0">
        <Iridescence
          color={[0.5, 0.6, 0.8]}
          mouseReact
          amplitude={0.1}
          speed={1}
        />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 w-[650px] mx-auto">
        <LiquidGlass config={{ blur: "1px" }} preset="default">
          <div className="flex flex-col items-center justify-center text-center px-4 py-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-2xl animate-fade-in">
              React Glassy
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-2 drop-shadow-lg animate-fade-in-delay">
              Try the{" "}
              <span className="font-semibold text-white">liquid-glass</span>{" "}
              effect, implemented with SVG
            </p>
            <p className="text-sm md:text-base text-white/80 mb-6 drop-shadow-lg animate-fade-in-delay-2">
              If you're interested or your client has gone crazy
            </p>

            <Link
              to="/docs/$"
              params={{
                _splat: "",
              }}
              className="px-6 py-4 block text-white font-semibold text-base transition-all duration-300 hover:scale-105"
            >
              Open Documentation
            </Link>
          </div>
        </LiquidGlass>
      </div>
    </HomeLayout>
  );
}
