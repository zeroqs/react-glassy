import { buildDisplacementFilterXML } from "./getDisplacementFilter";
import {
  acquireSharedFilter,
  releaseSharedFilter,
} from "../utils/svgFilterRegistry";

export type LensFilterConfig = {
  width: number;
  height: number;
  radius: number;
  depth: number;
  strength: number;
  chromaticAberration: number;
};

function buildRegistryKey(config: LensFilterConfig): string {
  return `lens:${JSON.stringify(config)}`;
}

export function acquireFilter(config: LensFilterConfig): string {
  return acquireSharedFilter(buildRegistryKey(config), (filterId) =>
    buildDisplacementFilterXML(filterId, config)
  );
}

export function releaseFilter(config: LensFilterConfig): void {
  releaseSharedFilter(buildRegistryKey(config));
}
