declare module 'leaflet' {
  export type LatLngTuple = [number, number];

  export interface Map {
    remove(): void;
    fitBounds(bounds: any, options?: any): this;
    setMaxBounds(bounds: any): this;
    setMinZoom(zoom: number): this;
    setMaxZoom(zoom: number): this;
    getZoom(): number;
    addLayer(layer: any): this;
  }

  export interface Polyline {
    remove(): void;
    getBounds(): any;
    addTo(map: Map): this;
  }

  export interface Marker {
    remove(): void;
    bindPopup(content: string): void;
    addTo(map: Map): this;
  }

  export interface ImageOverlay {
    addTo(map: Map): this;
    remove(): void;
  }

  export interface IconNamespace {
    Default: {
      mergeOptions(options: Record<string, unknown>): void;
    };
  }

  export interface Leaflet {
    map(element: HTMLElement, options?: Record<string, unknown>): Map;
    polyline(latLngs: LatLngTuple[], options?: Record<string, unknown>): Polyline;
    marker(latLng: LatLngTuple, options?: Record<string, unknown>): Marker;
    divIcon(options?: Record<string, unknown>): any;
    imageOverlay(url: string, bounds: any, options?: Record<string, unknown>): ImageOverlay;
    latLngBounds(southWest: LatLngTuple, northEast: LatLngTuple): any;
    Icon: IconNamespace;
  }

  const L: Leaflet;
  export default L;
  export { Map, Polyline, Marker, ImageOverlay, LatLngTuple };
}
