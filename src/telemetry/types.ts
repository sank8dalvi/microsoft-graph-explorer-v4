import { ComponentType } from 'react';

export interface ITelemetry {
  initialize(): void;
  collect(eventName: string, payload: any): void;
  trackComponent(Component: ComponentType): ComponentType;
}
