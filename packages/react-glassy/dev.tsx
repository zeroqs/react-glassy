import React from "react";
import ReactDOM from "react-dom/client";
import { LiquidGlass, builtInPresets, withLiquid } from "./src/index";
import "./src/LiquidGlass/LiquidGlass.module.css";
import "./src/SVGFilters/SVGFilters.module.css";

// Пример компонента для HOC
function Card({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        padding: "24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          margin: "0 0 8px 0",
          fontSize: "18px",
          fontWeight: 600,
          color: "white",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          color: "rgba(255, 255, 255, 0.8)",
        }}
      >
        {description}
      </p>
    </div>
  );
}

// Создаем обернутый компонент с HOC
const GlassCardHOC = withLiquid(Card, {
  preset: "frost",
  config: { borderRadius: "16px" },
});

export function App() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "200px auto" }}>
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "32px",
            fontWeight: 700,
            marginBottom: "40px",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          React Glassy - Dev Preview
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            marginBottom: "48px",
            alignItems: "center",
          }}
        >
          {Object.entries(builtInPresets).map(([presetName]) => (
            <div
              key={presetName}
              style={{ width: "445px", height: "280px", display: "flex" }}
            >
              <LiquidGlass preset={presetName as keyof typeof builtInPresets}>
                <div
                  style={{
                    padding: "24px",
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "white",
                      textTransform: "capitalize",
                    }}
                  >
                    {presetName} Preset
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    Пример карточки с пресетом {presetName}
                  </p>
                </div>
              </LiquidGlass>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            marginBottom: "48px",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: "16px",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                textAlign: "center",
              }}
            >
              С кастомной конфигурацией
            </h2>
            <div style={{ width: "445px", height: "280px", display: "flex" }}>
              <LiquidGlass
                config={{
                  blur: "20px",
                  tint: "rgba(255, 100, 150, 0.2)",
                  borderRadius: "20px",
                }}
              >
                <div
                  style={{
                    padding: "24px",
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "white",
                    }}
                  >
                    Кастомная карточка
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    С увеличенным blur и розовым оттенком
                  </p>
                </div>
              </LiquidGlass>
            </div>
          </div>

          <div>
            <h2
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: "16px",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                textAlign: "center",
              }}
            >
              С HOC (withLiquid)
            </h2>
            <div style={{ width: "445px", height: "280px", display: "flex" }}>
              <GlassCardHOC
                title="Карточка через HOC"
                description="Этот компонент обернут с помощью withLiquid HOC"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
