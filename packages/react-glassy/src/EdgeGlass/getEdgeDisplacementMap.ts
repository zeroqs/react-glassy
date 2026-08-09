export type EdgeMapOptions = {
  /** Inset of the neutral (undistorted) zone from the edges, in % of element size */
  inset: number;
  /** Corner radius of the neutral zone, in map units (viewBox 0-100) */
  cornerRadius: number;
  /** Blur of the neutral zone edge — controls how soft the refraction band is */
  innerBlur: number;
  /** Blur wrapping the whole map — smooths the displacement gradients */
  outerBlur: number;
  /** Shape of the neutral zone */
  shape: "rect" | "circle";
};

/**
 * Builds a scale-independent displacement map (viewBox 0-100, stretched to the
 * element via preserveAspectRatio="none"). The center is neutral gray (#808080),
 * so only the edge band refracts — the content behind the center stays intact.
 *
 * Based on tw-glass by assistant-ui (MIT):
 * https://github.com/assistant-ui/assistant-ui/tree/main/packages/tw-glass
 */
export const getEdgeDisplacementMap = ({
  inset,
  cornerRadius,
  innerBlur,
  outerBlur,
  shape,
}: EdgeMapOptions): string => {
  const size = 100 - inset * 2;
  const neutralShape =
    shape === "circle"
      ? `<circle cx="50" cy="50" r="${size / 2}" fill="#808080" filter="url(#ib)"/>`
      : `<rect x="${inset}" y="${inset}" width="${size}" height="${size}" rx="${cornerRadius}" ry="${cornerRadius}" fill="#808080" filter="url(#ib)"/>`;

  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
  <defs>
    <linearGradient id="x" x1="5%" y1="0" x2="95%" y2="0">
      <stop offset="0%" stop-color="#F00"/>
      <stop offset="100%" stop-color="#000"/>
    </linearGradient>
    <linearGradient id="y" x1="0" y1="5%" x2="0" y2="95%">
      <stop offset="0%" stop-color="#0F0"/>
      <stop offset="100%" stop-color="#000"/>
    </linearGradient>
    <filter id="ob"><feGaussianBlur stdDeviation="${outerBlur}"/></filter>
    <filter id="ib"><feGaussianBlur stdDeviation="${innerBlur}"/></filter>
  </defs>
  <rect width="100" height="100" fill="#808080"/>
  <g filter="url(#ob)">
    <rect width="100" height="100" fill="#000080"/>
    <rect width="100" height="100" fill="url(#y)" style="mix-blend-mode:screen"/>
    <rect width="100" height="100" fill="url(#x)" style="mix-blend-mode:screen"/>
    ${neutralShape}
  </g>
</svg>`
    )
  );
};
