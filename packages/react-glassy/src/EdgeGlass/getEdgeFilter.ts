import { getEdgeDisplacementMap, type EdgeMapOptions } from "./getEdgeDisplacementMap";

export type EdgeFilterOptions = EdgeMapOptions & {
  /** tw-glass style strength: 20 → displacement of 10% of element size */
  strength: number;
  /** 0 = single-pass filter; > 0 enables the 3-pass RGB split (1 ≈ tw-glass default ratios) */
  chromaticAberration: number;
};

/**
 * Builds a displacement filter declared in objectBoundingBox units, so a single
 * filter works for elements of any size — displacement scales with the element.
 */
export function buildEdgeFilterXML(
  filterId: string,
  options: EdgeFilterOptions
): string {
  const { strength, chromaticAberration } = options;
  const scale = strength / 200;
  const mapDataUrl = getEdgeDisplacementMap(options);

  const filterOpen = `<filter id="${filterId}" filterUnits="objectBoundingBox" primitiveUnits="objectBoundingBox" color-interpolation-filters="sRGB">`;
  const feImage = `<feImage href="${mapDataUrl}" x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="map"/>`;

  if (chromaticAberration <= 0) {
    return `${filterOpen}
  ${feImage}
  <feDisplacementMap in="SourceGraphic" in2="map" scale="${+scale.toFixed(4)}" xChannelSelector="R" yChannelSelector="G"/>
</filter>`;
  }

  const scaleR = +(scale * (1 + 0.4 * chromaticAberration)).toFixed(4);
  const scaleG = +(scale * (1 + 0.2 * chromaticAberration)).toFixed(4);
  const scaleB = +scale.toFixed(4);

  return `${filterOpen}
  ${feImage}
  <feDisplacementMap in="SourceGraphic" in2="map" scale="${scaleR}" xChannelSelector="R" yChannelSelector="G"/>
  <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="dR"/>
  <feDisplacementMap in="SourceGraphic" in2="map" scale="${scaleG}" xChannelSelector="R" yChannelSelector="G"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="dG"/>
  <feDisplacementMap in="SourceGraphic" in2="map" scale="${scaleB}" xChannelSelector="R" yChannelSelector="G"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="dB"/>
  <feBlend in="dR" in2="dG" mode="screen" result="rg"/>
  <feBlend in="rg" in2="dB" mode="screen"/>
</filter>`;
}
