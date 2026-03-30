import { getDisplacementMap, type LensMapOptions } from "./getDisplacementMap";

export type LensFilterOptions = LensMapOptions & {
  strength?: number;
  chromaticAberration?: number;
};

export function buildDisplacementFilterXML(
  filterId: string,
  {
    height,
    width,
    radius,
    depth,
    strength = 100,
    chromaticAberration = 0,
  }: LensFilterOptions
): string {
  const displacementMapDataUrl = getDisplacementMap({ height, width, radius, depth });

  return `<filter id="${filterId}" color-interpolation-filters="sRGB">
  <feImage x="0" y="0" height="${height}" width="${width}"
    href="${displacementMapDataUrl}"
    result="displacementMap"
  />
  <feDisplacementMap
    in="SourceGraphic" in2="displacementMap"
    scale="${strength + chromaticAberration * 2}"
    xChannelSelector="R" yChannelSelector="G"
  />
  <feColorMatrix type="matrix"
    values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
    result="displacedR"
  />
  <feDisplacementMap
    in="SourceGraphic" in2="displacementMap"
    scale="${strength + chromaticAberration}"
    xChannelSelector="R" yChannelSelector="G"
  />
  <feColorMatrix type="matrix"
    values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
    result="displacedG"
  />
  <feDisplacementMap
    in="SourceGraphic" in2="displacementMap"
    scale="${strength}"
    xChannelSelector="R" yChannelSelector="G"
  />
  <feColorMatrix type="matrix"
    values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
    result="displacedB"
  />
  <feBlend in="displacedR" in2="displacedG" mode="screen" />
  <feBlend in2="displacedB" mode="screen" />
</filter>`;
}
