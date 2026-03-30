import type { ComponentType } from 'react';
import type { LensGlassProps } from '../LensGlass';
import { LensGlass } from '../LensGlass';

export function withLens<P extends object>(
  Component: ComponentType<P>,
  lensConfig: Omit<LensGlassProps, 'children' | 'className'>
) {
  return function WithLensComponent(props: P & { className?: string }) {
    const { className, ...componentProps } = props;

    return (
      <LensGlass {...lensConfig} className={className}>
        <Component {...(componentProps as P)} />
      </LensGlass>
    );
  };
}
