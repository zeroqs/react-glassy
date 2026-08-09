import type { ComponentType } from 'react';
import type { EdgeGlassProps } from '../EdgeGlass';
import { EdgeGlass } from '../EdgeGlass';

export function withEdge<P extends object>(
  Component: ComponentType<P>,
  edgeConfig: Omit<EdgeGlassProps, 'children' | 'className'>
) {
  return function WithEdgeComponent(props: P & { className?: string }) {
    const { className, ...componentProps } = props;

    return (
      <EdgeGlass {...edgeConfig} className={className}>
        <Component {...(componentProps as P)} />
      </EdgeGlass>
    );
  };
}
