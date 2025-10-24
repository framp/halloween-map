import { Component, onMount, onCleanup, createEffect } from 'solid-js';

interface GoogleMapProps {
  apiKey: string;
  center: google.maps.LatLngLiteral;
  zoom: number;
  mapTypeId?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  onMapReady?: (map: google.maps.Map) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
}

let googleMapsLoaded = false;
let googleMapsLoading = false;
const loadCallbacks: (() => void)[] = [];

const loadGoogleMaps = (apiKey: string): Promise<void> => {
  return new Promise((resolve) => {
    if (googleMapsLoaded) {
      resolve();
      return;
    }

    if (googleMapsLoading) {
      loadCallbacks.push(resolve);
      return;
    }

    googleMapsLoading = true;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      googleMapsLoaded = true;
      googleMapsLoading = false;
      resolve();
      loadCallbacks.forEach((callback) => callback());
      loadCallbacks.length = 0;
    };
    document.head.appendChild(script);
  });
};

export const GoogleMapComponent: Component<GoogleMapProps> = (props) => {
  let mapDiv: HTMLDivElement | undefined;
  let map: google.maps.Map | undefined;

  onMount(async () => {
    if (!mapDiv) return;

    await loadGoogleMaps(props.apiKey);

    map = new google.maps.Map(mapDiv, {
      center: props.center,
      zoom: props.zoom,
      mapTypeId: props.mapTypeId || 'satellite',
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    if (props.onClick) {
      map.addListener('click', props.onClick);
    }

    if (props.onMapReady) {
      props.onMapReady(map);
    }
  });

  createEffect(() => {
    if (map) {
      map.setCenter(props.center);
    }
  });

  onCleanup(() => {
    if (map) {
      google.maps.event.clearInstanceListeners(map);
    }
  });

  return <div ref={mapDiv} style={{ width: '100%', height: '100%' }} />;
};

export default GoogleMapComponent;
