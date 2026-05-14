import { motion } from "framer-motion";
import { Store, ShoppingBag, Leaf, MapPin, Instagram } from "lucide-react";
import distributorsData from "@/data/distribuidores.json";
import { withBaseUrl } from "@/lib/base-url";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Icon, LatLngBounds } from "leaflet";

type Distributor = {
  name: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  type: "supermarket" | "organic" | "specialty" | "restaurant";
  instagram: string;
  mapUrl: string;
};

const distributors: Distributor[] = distributorsData;

const center: [number, number] = [19.04, -98.2];

const DistributorsSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const [leafletModule, setLeafletModule] = useState<typeof import("leaflet") | null>(null);
  const [reactLeafletModule, setReactLeafletModule] = useState<typeof import("react-leaflet") | null>(null);
  const [markerIcon, setMarkerIcon] = useState<Icon | null>(null);
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);

  useEffect(() => {
    if (!sectionRef.current || shouldLoadMap) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [shouldLoadMap]);

  useEffect(() => {
    if (!shouldLoadMap) {
      return;
    }

    let isActive = true;

    const loadMap = async () => {
      const [leafletResult, reactLeaflet] = await Promise.all([
        import("leaflet"),
        import("leaflet/dist/leaflet.css"),
        import("react-leaflet"),
      ]).then(([leafletModule, _leafletCss, reactLeafletModule]) => [leafletModule, reactLeafletModule]);

      const leaflet = ("default" in leafletResult ? leafletResult.default : leafletResult) as typeof import("leaflet");

      if (!isActive) {
        return;
      }

      const nextBounds = distributors.length
        ? leaflet.latLngBounds(distributors.map((dist) => [dist.lat, dist.lng] as [number, number]))
        : null;

      setLeafletModule(leaflet);
      setReactLeafletModule(reactLeaflet);
      setBounds(nextBounds);
      setMarkerIcon(
        leaflet.icon({
          iconUrl: withBaseUrl("tofuchos/tofucho corriendo.png"),
          iconSize: [24, 24],
          iconAnchor: [12, 24],
          popupAnchor: [0, -20],
        }),
      );
    };

    void loadMap();

    return () => {
      isActive = false;
    };
  }, [shouldLoadMap]);

  const mapContainerProps = useMemo(() => {
    if (bounds) {
      return { bounds, boundsOptions: { padding: [20, 20] as [number, number] } };
    }

    return { center, zoom: 11 };
  }, [bounds]);

  return (
    <section
      id="distribuidores"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-paper-texture"
    >
      {/* Tofucho sorprendido decorativo - Desktop */}
      <motion.div
        className="absolute top-10 right-10 hidden lg:block z-10"
        animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={withBaseUrl("tofuchos/tofucho sorprendido.png")} alt="" aria-hidden="true" loading="lazy" className="w-24 h-24 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Tofucho corriendo - Mobile y Tablet */}
      <motion.div
        className="absolute top-8 right-22 lg:hidden z-40"
        animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={withBaseUrl("tofuchos/tofucho corriendo.png")} alt="" aria-hidden="true" loading="lazy" className="w-18 h-18 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Tofucho sorprendido - Mobile y Tablet */}
      <motion.div
        className="absolute bottom-6 left-4 lg:hidden z-40"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={withBaseUrl("tofuchos/tofucho sorprendido.png")} alt="" aria-hidden="true" loading="lazy" className="w-14 h-14 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Tofucho pensando - Mobile y Tablet centro */}
      <motion.div
        className="absolute top-1/3 left-2 lg:hidden z-40"
        animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={withBaseUrl("tofuchos/tofucho pensando.png")} alt="" aria-hidden="true" loading="lazy" className="w-14 h-14 object-contain drop-shadow-lg" />
      </motion.div>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
          {/* Left - Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 order-first lg:order-first"
          >
            <span className="text-dymo text-xs inline-block">Puntos de venta</span>
            <h2 className="font-display text-4xl sm:text-5xl">
              <span className="inline-block bg-foreground text-background px-2">DÓNDE</span> COMPRAR
            </h2>

            <div className="relative aspect-video border-4 border-foreground shadow-brutal overflow-hidden">
              {reactLeafletModule && leafletModule && markerIcon ? (
                <reactLeafletModule.MapContainer
                  {...mapContainerProps}
                  scrollWheelZoom
                  zoomControl
                  dragging
                  doubleClickZoom
                  touchZoom
                  className="h-full w-full map-brutalist"
                >
                  <reactLeafletModule.TileLayer
                    attribution=""
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  />
                  {distributors.map((dist) => (
                    <reactLeafletModule.Marker
                      key={`${dist.name}-${dist.address}`}
                      position={[dist.lat, dist.lng]}
                      icon={markerIcon}
                    >
                      <reactLeafletModule.Popup>
                        <div className="font-body text-sm">
                          <p className="font-display text-base mb-1">{dist.name}</p>
                          <p className="text-xs text-muted-foreground">{dist.address}</p>
                          <p className="text-xs mt-1">{dist.city}, {dist.state}</p>
                        </div>
                      </reactLeafletModule.Popup>
                    </reactLeafletModule.Marker>
                  ))}
                </reactLeafletModule.MapContainer>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-background text-xs text-muted-foreground">
                  Cargando mapa...
                </div>
              )}
            </div>

            {/* Delivery Info (desktop only) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hidden lg:flex p-4 border-2 border-foreground bg-foreground/5 flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-display text-sm mb-1">📦 Todos los viernes entrega de productos en CDMX</p>
                <p className="text-dymo text-sm rotate-1">Parque Delta y Biblioteca Central UNAM</p>
              </div>
              <a
                href="https://wa.me/522215606205?text=Hola!%20Quiero%20hacer%20un%20pedido%20para%20CDMX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 font-display text-xs uppercase border-[3px] border-foreground bg-foreground text-background whitespace-nowrap shadow-brutal transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg"
              >
                Pedir ahora
              </a>
            </motion.div>
          </motion.div>

          {/* Right - List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 order-last lg:order-last"
          >
            <h3 className="font-display text-xl inline-block bg-foreground text-background px-2">DISTRIBUIDORES</h3>

            {distributors.map((dist, index) => {
              const Icon = dist.type === "supermarket" ? ShoppingBag : dist.type === "organic" ? Leaf : Store;
              return (
                <motion.div
                  key={dist.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 border-2 border-foreground bg-background hover:bg-foreground/5 transition-colors"
                >
                  <div className="p-2 bg-foreground text-background border-2 border-foreground shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-base mb-1">{dist.name}</h4>
                    <p className="font-body text-xs text-muted-foreground mb-1">{dist.address}</p>
                    <p className="font-body text-xs mb-2">{dist.city}, {dist.state}</p>

                    <div className="flex gap-3">
                      <a
                        href={dist.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-foreground hover:text-foreground/80 transition-colors"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>Ver en Maps</span>
                      </a>
                      <a
                        href={`https://instagram.com/${dist.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-foreground hover:text-foreground/80 transition-colors"
                      >
                        <Instagram className="w-3 h-3" />
                        <span>{dist.instagram}</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Delivery Info - Mobile (placed after grid so it's last on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:hidden p-4 border-2 border-foreground bg-foreground/5 flex items-center justify-between gap-4 mt-6 max-w-6xl mx-auto"
        >
          <div>
            <p className="font-display text-sm mb-1">📦 Todos los viernes entrega de productos en CDMX</p>
            <p className="text-dymo text-sm rotate-1">Parque Delta y Biblioteca Central UNAM</p>
          </div>
          <a
            href="https://wa.me/522215606205?text=Hola!%20Quiero%20hacer%20un%20pedido%20para%20CDMX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 font-display text-xs uppercase border-[3px] border-foreground bg-foreground text-background whitespace-nowrap shadow-brutal transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg"
          >
            Pedir ahora
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DistributorsSection;
