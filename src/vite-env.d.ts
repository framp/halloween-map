/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

declare namespace google.maps {
  class Map {
    constructor(mapDiv: HTMLElement, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setOptions(options: MapOptions): void;
    addListener(eventName: string, handler: (e: any) => void): MapsEventListener;
    getBounds(): LatLngBounds | undefined;
    getZoom(): number | undefined;
  }

  class LatLngBounds {
    getNorthEast(): LatLng;
    getSouthWest(): LatLng;
  }

  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    mapTypeId?: string;
    disableDefaultUI?: boolean;
    zoomControl?: boolean;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
    draggable?: boolean;
  }

  interface LatLng {
    lat(): number;
    lng(): number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapMouseEvent {
    latLng: LatLng | null;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    setMap(map: Map | null): void;
  }

  interface MarkerOptions {
    position?: LatLng | LatLngLiteral;
    map?: Map;
    label?: string | MarkerLabel;
    icon?: string | Icon | Symbol;
  }

  interface MarkerLabel {
    text: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
  }

  interface Icon {
    url: string;
    scaledSize?: Size;
  }

  interface Symbol {
    path: string | SymbolPath;
    scale?: number;
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeWeight?: number;
    rotation?: number;
    anchor?: Point;
  }

  class Point {
    constructor(x: number, y: number);
  }

  enum SymbolPath {
    CIRCLE = 0,
  }

  class Polyline {
    constructor(opts?: PolylineOptions);
    setMap(map: Map | null): void;
  }

  interface PolylineOptions {
    path?: Array<LatLng | LatLngLiteral>;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    map?: Map;
  }

  class Size {
    constructor(width: number, height: number);
  }

  interface MapsEventListener {
    remove(): void;
  }

  namespace event {
    function clearInstanceListeners(instance: any): void;
  }
}
