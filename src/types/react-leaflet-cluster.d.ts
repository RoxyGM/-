declare module 'react-leaflet-cluster' {
  import type { ComponentType, ReactNode } from 'react';

  interface MarkerClusterGroupProps {
    children?: ReactNode;
    chunkedLoading?: boolean;
    maxClusterRadius?: number;
    spiderfyOnMaxZoom?: boolean;
    showCoverageOnHover?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    polygonOptions?: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  const MarkerClusterGroup: ComponentType<MarkerClusterGroupProps>;
  export default MarkerClusterGroup;
}
