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

const markerIcon = new L.Icon({
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString(),
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const center: [number, number] = [19.04, -98.2];

const DistributorsSection = () => {
  return (
    <section id="distribuidores" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
          {/* Left - Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-dymo text-xs inline-block">Puntos de venta</span>
            <h2 className="font-display text-4xl sm:text-5xl">
              <span className="text-highlight-yellow">DÓNDE</span> COMPRAR
            </h2>

            <div className="relative aspect-video border-4 border-foreground shadow-brutal overflow-hidden">
              <MapContainer center={center} zoom={11} scrollWheelZoom={false} className="h-full w-full" zoomControl={false} dragging>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
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
          </motion.div>

          {/* Right - List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-display text-xl text-highlight-orange">DISTRIBUIDORES</h3>
            
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

            {/* CTA */}
            <div className="pt-2">
              <a
                href="https://wa.me/522215606205?text=Hola!%20Quiero%20saber%20dónde%20comprar%20Empatika"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal text-sm"
              >
                ¿No lo encuentras? Pregúntanos →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DistributorsSection;
