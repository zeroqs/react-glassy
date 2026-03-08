import type { ComponentType } from 'react';
import type { GlassConfig, GlassPreset, GlassProps } from '../types';
import { LiquidGlass } from '../LiquidGlass';

export function withLiquid<P extends object>(
  Component: ComponentType<P>,
  glassConfig?: { preset?: GlassPreset; config?: Partial<GlassConfig> }
) {
  return function WithLiquidComponent(
    props: P & Omit<GlassProps, 'children'> & { className?: string }
  ) {
    const { className, ...componentProps } = props;

    return (
      <LiquidGlass
        preset={glassConfig?.preset}
        config={glassConfig?.config}
        className={className}
      >
        <Component {...(componentProps as P)} />
      </LiquidGlass>
    );
  };
}
