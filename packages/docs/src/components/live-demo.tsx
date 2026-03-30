import { CSSProperties, ReactNode } from "react";
import bgImage from "@/../assets/bg.webp";

interface LiveDemoProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function LiveDemo({ children, className, style }: LiveDemoProps) {
  return (
    <div
      className={`relative rounded-lg overflow-hidden p-8 ${className ?? ""}`}
      style={style}
    >
      <div
        className="absolute inset-0 rounded-lg live-demo-background"
        style={{
          backgroundImage: `url(${
            typeof bgImage === "string"
              ? bgImage
              : (bgImage as { src: string }).src
          }), linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)`,
          backgroundSize: "cover, cover",
          backgroundPosition: "center center, center center",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundBlendMode: "overlay",
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
