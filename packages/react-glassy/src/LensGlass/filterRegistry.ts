import { buildDisplacementFilterXML } from "./getDisplacementFilter";

export type LensFilterConfig = {
  width: number;
  height: number;
  radius: number;
  depth: number;
  strength: number;
  chromaticAberration: number;
};

type RegistryEntry = {
  filterId: string;
  referenceCount: number;
};

const filterRegistry = new Map<string, RegistryEntry>();
let sharedSvgContainer: SVGSVGElement | null = null;
let filterIdCounter = 0;

function buildRegistryKey(config: LensFilterConfig): string {
  return JSON.stringify(config);
}

function getOrCreateSvgContainer(): SVGSVGElement {
  if (sharedSvgContainer) return sharedSvgContainer;

  sharedSvgContainer = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  sharedSvgContainer.setAttribute(
    "style",
    "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none"
  );
  sharedSvgContainer.setAttribute("aria-hidden", "true");
  document.body.appendChild(sharedSvgContainer);

  return sharedSvgContainer;
}

export function acquireFilter(config: LensFilterConfig): string {
  const registryKey = buildRegistryKey(config);
  const existingEntry = filterRegistry.get(registryKey);

  if (existingEntry) {
    existingEntry.referenceCount++;
    return existingEntry.filterId;
  }

  const filterId = `lens-filter-${++filterIdCounter}`;
  const svgContainer = getOrCreateSvgContainer();
  svgContainer.insertAdjacentHTML(
    "beforeend",
    buildDisplacementFilterXML(filterId, config)
  );

  filterRegistry.set(registryKey, { filterId, referenceCount: 1 });
  return filterId;
}

export function releaseFilter(config: LensFilterConfig): void {
  const registryKey = buildRegistryKey(config);
  const registryEntry = filterRegistry.get(registryKey);
  if (!registryEntry) return;

  registryEntry.referenceCount--;

  if (registryEntry.referenceCount === 0) {
    sharedSvgContainer
      ?.querySelector(`#${registryEntry.filterId}`)
      ?.remove();
    filterRegistry.delete(registryKey);
  }
}
