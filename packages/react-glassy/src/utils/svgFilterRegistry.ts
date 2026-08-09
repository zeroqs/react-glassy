type RegistryEntry = {
  filterId: string;
  referenceCount: number;
};

const filterRegistry = new Map<string, RegistryEntry>();
let sharedSvgContainer: SVGSVGElement | null = null;
let filterIdCounter = 0;

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

export function acquireSharedFilter(
  registryKey: string,
  buildFilterXML: (filterId: string) => string
): string {
  const existingEntry = filterRegistry.get(registryKey);

  if (existingEntry) {
    existingEntry.referenceCount++;
    return existingEntry.filterId;
  }

  const filterId = `glassy-filter-${++filterIdCounter}`;
  const svgContainer = getOrCreateSvgContainer();
  svgContainer.insertAdjacentHTML("beforeend", buildFilterXML(filterId));

  filterRegistry.set(registryKey, { filterId, referenceCount: 1 });
  return filterId;
}

export function releaseSharedFilter(registryKey: string): void {
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
