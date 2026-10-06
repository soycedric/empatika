/**
 * Mapa Leaflet de puntos de venta con flyTo, fitBounds por región, popups y resize handling.
 * Usa OpenFreeMap con estilo vectorial open source sin API key.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import { maplibreGL } from '@maplibre/maplibre-gl-leaflet';
import { setWorkerUrl } from 'maplibre-gl';
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import { withBaseUrl } from '@/lib/base-url';
import type { Distributor } from '@/components/distributors/types';
import { getDistributorId } from '@/components/distributors/types';

setWorkerUrl(new URL('maplibre-gl/dist/maplibre-gl-worker.mjs', import.meta.url).toString());

const DEFAULT_CENTER: [number, number] = [19.04, -98.2];
const FLY_ZOOM = 15;
const OPENFREEMAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/positron';
const HIDDEN_LAYER_IDS = new Set([
  'highway-name-major',
  'road_shield_us',
  'road_shield_non_us',
  'road_one_way_arrow',
  'road_one_way_arrow_opposite',
]);

interface DistributorsMapProps {
  distributors: Distributor[];
  shouldLoad: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

type MapLibreStyle = {
  version: number;
  sources: Record<string, unknown>;
  layers: Array<{ id: string; [key: string]: unknown }>;
  sprite?: string;
  glyphs?: string;
  [key: string]: unknown;
};

const markerIcon = L.icon({
  iconUrl: withBaseUrl('tofuchos/tofucho corriendo.png'),
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -24],
});

const activeMarkerIcon = L.icon({
  iconUrl: withBaseUrl('tofuchos/tofucho corriendo.png'),
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -30],
});

function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const runInvalidate = () => {
      map.invalidateSize({ animate: false });
    };

    const timeoutId = window.setTimeout(runInvalidate, 0);
    const container = map.getContainer();
    const observer = new ResizeObserver(runInvalidate);
    observer.observe(container);

    return () => {
      window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [map]);

  return null;
}

/** Vuela a los bounds de los distribuidores actuales cuando la lista cambia */
function MapBoundsHandler({ distributors }: { distributors: Distributor[] }) {
  const map = useMap();

  useEffect(() => {
    if (distributors.length === 0) return;

    const bounds = L.latLngBounds(
      distributors.map((d) => [d.lat, d.lng] as [number, number])
    );
    // Pequeño delay para dejar que el mapa termine de renderizar tras el cambio de ciudad
    const id = window.setTimeout(() => {
      map.fitBounds(bounds, { padding: [32, 32], animate: true, duration: 0.6 });
    }, 80);
    return () => window.clearTimeout(id);
  }, [distributors, map]);

  return null;
}

function MapSelectionHandler({
  distributors,
  selectedId,
  markerRefs,
}: {
  distributors: Distributor[];
  selectedId: string | null;
  markerRefs: React.MutableRefObject<Record<string, L.Marker | null>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;

    const dist = distributors.find((d) => getDistributorId(d) === selectedId);
    if (!dist) return;

    map.flyTo([dist.lat, dist.lng], FLY_ZOOM, { duration: 0.5 });
    const marker = markerRefs.current[selectedId];
    if (marker) {
      const popupTimeout = window.setTimeout(() => marker.openPopup(), 400);
      return () => window.clearTimeout(popupTimeout);
    }
  }, [selectedId, distributors, map, markerRefs]);

  return null;
}

function OpenFreeMapLayer({ style }: { style: MapLibreStyle }) {
  const map = useMap();

  useEffect(() => {
    const layer = maplibreGL({ style }).addTo(map);

    return () => {
      layer.remove();
    };
  }, [map, style]);

  return null;
}

const DistributorPopup = ({ dist }: { dist: Distributor }) => (
  <div className="map-popup-content font-body text-sm min-w-[180px]">
    <p className="font-display text-base mb-1">{dist.name}</p>
    <p className="text-xs text-muted-foreground leading-snug">{dist.address}</p>
    <p className="text-xs mt-1">
      {dist.city}, {dist.state}
    </p>
  </div>
);

const DistributorsMap = ({
  distributors,
  shouldLoad,
  selectedId,
  onSelect,
}: DistributorsMapProps) => {
  const markerRefs = useRef<Record<string, L.Marker | null>>({});
  const [mapStyle, setMapStyle] = useState<MapLibreStyle | null>(null);

  // Región derivada de los distribuidores para remontar el mapa cuando cambia
  const regionKey = distributors[0]?.region ?? 'puebla';

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    let cancelled = false;

    const loadStyle = async () => {
      const response = await fetch(OPENFREEMAP_STYLE_URL);
      if (!response.ok) {
        throw new Error(`Failed to load map style: ${response.status}`);
      }

      const style = (await response.json()) as MapLibreStyle;
      const filteredStyle: MapLibreStyle = {
        ...style,
        layers: style.layers.filter(
          (layer) => !HIDDEN_LAYER_IDS.has(layer.id) && !layer.id.startsWith('road_shield_')
        ),
      };

      if (!cancelled) {
        setMapStyle(filteredStyle);
      }
    };

    loadStyle().catch((error) => {
      console.error('Failed to load OpenFreeMap style', error);
    });

    return () => {
      cancelled = true;
    };
  }, [shouldLoad]);

  const initialMapProps = useMemo(() => {
    if (distributors.length === 0) {
      return { center: DEFAULT_CENTER, zoom: 11 };
    }

    const bounds = L.latLngBounds(
      distributors.map((dist) => [dist.lat, dist.lng] as [number, number])
    );

    return {
      bounds,
      boundsOptions: { padding: [32, 32] as [number, number] },
    };
  // Solo se usa al montar; MapBoundsHandler se encarga de las actualizaciones
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionKey]);

  return (
    <div
      className="relative min-h-[min(52vh,420px)] lg:min-h-[480px] h-[min(52vh,420px)] lg:h-[480px] border-4 border-foreground shadow-brutal bg-background"
      aria-label="Mapa de puntos de venta Empátika"
      role="region"
    >
      {shouldLoad && mapStyle ? (
        <MapContainer
          key={regionKey}
          {...initialMapProps}
          maxBounds={[[180, -Infinity], [-180, Infinity]]}
          maxBoundsViscosity={1}
          minZoom={1}
          scrollWheelZoom={false}
          zoomControl
          dragging
          doubleClickZoom
          touchZoom
          className="h-full w-full map-brutalist z-0"
        >
          <OpenFreeMapLayer style={mapStyle} />
          <MapResizeHandler />
          <MapBoundsHandler distributors={distributors} />
          <MapSelectionHandler
            distributors={distributors}
            selectedId={selectedId}
            markerRefs={markerRefs}
          />
          {distributors.map((dist) => {
            const id = getDistributorId(dist);
            const isSelected = selectedId === id;

            return (
              <Marker
                key={id}
                position={[dist.lat, dist.lng]}
                icon={isSelected ? activeMarkerIcon : markerIcon}
                ref={(marker) => {
                  markerRefs.current[id] = marker;
                }}
                eventHandlers={{
                  click: () => onSelect(id),
                }}
              >
                <Popup className="map-popup-brutal">
                  <DistributorPopup dist={dist} />
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground font-display uppercase tracking-wider">
          Cargando mapa...
        </div>
      )}
    </div>
  );
};

export default DistributorsMap;
