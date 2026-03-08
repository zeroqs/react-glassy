import type { OnlyDefinedKeys } from '../types';

export function pickDefined<T extends object>(obj: T): OnlyDefinedKeys<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value != null)
  ) as unknown as OnlyDefinedKeys<T>;
}
