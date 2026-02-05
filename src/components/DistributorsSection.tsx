import { motion } from "framer-motion";
import { Store, ShoppingBag, Leaf } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import distributorsData from "@/data/distribuidores.json";

type Distributor = {
  name: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  type: "supermarket" | "organic" | "specialty";
};

const distributors: Distributor[] = distributorsData;

const markerIcon = L.icon({
  iconUrl: "/tofuchos/tofucho corriendo.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -40],
});

const center: [number, number] = [19.04, -98.2];
const bounds = distributors.length
  ? L.latLngBounds(distributors.map((dist) => [dist.lat, dist.lng] as [number, number]))
  : null;

const DistributorsSection = () => {
  return (
    <section id="distribuidores" className="py-24 relative overflow-hidden bg-paper-texture">
      {/* Tofucho sorprendido decorativo - Desktop */}
      <motion.div
        className="absolute top-10 right-10 hidden lg:block z-10"
        animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/tofuchos/tofucho sorprendido.png" alt="Tofucho sorprendido" className="w-28 h-28 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Tofucho corriendo - Mobile y Tablet */}
      <motion.div
        className="absolute top-8 right-22 lg:hidden z-40"
        animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/tofuchos/tofucho corriendo.png" alt="Tofucho corriendo" className="w-24 h-24 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Tofucho sorprendido - Mobile y Tablet */}
      <motion.div
        className="absolute bottom-6 left-4 lg:hidden z-40"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/tofuchos/tofucho sorprendido.png" alt="Tofucho sorprendido" className="w-14 h-14 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Tofucho pensando - Mobile y Tablet centro */}
      <motion.div
        className="absolute top-1/3 left-2 lg:hidden z-40"
        animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/tofuchos/tofucho pensando.png" alt="Tofucho pensando" className="w-12 h-12 object-contain drop-shadow-lg" />
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
              <span className="inline-block bg-primary text-foreground px-2">DÓNDE</span> COMPRAR
            </h2>

            <div className="relative aspect-video border-4 border-foreground shadow-brutal overflow-hidden">
              <MapContainer
                {...(bounds
                  ? { bounds, boundsOptions: { padding: [20, 20] as [number, number] } }
                  : { center, zoom: 11 })}
                scrollWheelZoom
                zoomControl
                dragging
                doubleClickZoom
                touchZoom
                className="h-full w-full"
              >
                <TileLayer
                  attribution=''
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {distributors.map((dist) => (
                  <Marker
                    key={`${dist.name}-${dist.address}`}
                    position={[dist.lat, dist.lng]}
                    icon={markerIcon}
                  >
                    <Popup>
                      <div className="font-body text-sm">
                        <p className="font-display text-base mb-1">{dist.name}</p>
                        <p className="text-xs text-muted-foreground">{dist.address}</p>
                        <p className="text-xs mt-1">{dist.city}, {dist.state}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Delivery Info (desktop only) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hidden lg:flex p-4 border-2 border-foreground bg-primary/10 flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-display text-sm mb-1">📦 Todos los viernes entrega de productos en CDMX</p>
                <p className="text-dymo text-sm rotate-1">Parque Delta, Plaza Universidad, Oasis Coyacán, Biblioteca Central UNAM</p>
              </div>
              <a
                href="https://wa.me/522215606205?text=Hola!%20Quiero%20hacer%20un%20pedido%20para%20CDMX"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal text-xs whitespace-nowrap"
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
            <h3 className="font-display text-xl inline-block bg-secondary text-secondary-foreground px-2">DISTRIBUIDORES</h3>
            
            {distributors.map((dist, index) => {
              const Icon = dist.type === "supermarket" ? ShoppingBag : dist.type === "organic" ? Leaf : Store;
              return (
                <motion.div
                  key={dist.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 border-2 border-foreground bg-background hover:bg-primary/10 transition-colors"
                >
                  <div className="p-2 bg-primary border-2 border-foreground shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-display text-base">{dist.name}</h4>
                    <p className="font-body text-xs text-muted-foreground">{dist.address}</p>
                    <p className="font-body text-xs">{dist.city}, {dist.state}</p>
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
          className="lg:hidden p-4 border-2 border-foreground bg-primary/10 flex items-center justify-between gap-4 mt-6 max-w-6xl mx-auto"
        >
          <div>
            <p className="font-display text-sm mb-1">📦 Todos los viernes entrega de productos en CDMX</p>
            <p className="text-dymo text-sm rotate-1">Parque Delta, Plaza Universidad, Oasis Coyacán, Biblioteca Central UNAM</p>
          </div>
          <a
            href="https://wa.me/522215606205?text=Hola!%20Quiero%20hacer%20un%20pedido%20para%20CDMX"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal text-xs whitespace-nowrap"
          >
            Pedir ahora
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DistributorsSection;
