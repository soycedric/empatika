import { motion, AnimatePresence } from 'framer-motion';
import { Store, ShoppingBag, Leaf, MapPin, Instagram } from 'lucide-react';
import allDistributorsData from '@/data/distribuidores.json';
import { withBaseUrl } from '@/lib/base-url';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import DistributorsMap from '@/components/distributors/DistributorsMap';
import DeliveryFridaysBanner from '@/components/distributors/DeliveryFridaysBanner';
import CitySlider from '@/components/distributors/CitySlider';
import type { Distributor, Region } from '@/components/distributors/types';
import { getDistributorId } from '@/components/distributors/types';

const allDistributors: Distributor[] = allDistributorsData as Distributor[];

const DistributorsSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<Region>('puebla');

  // Distribuidores filtrados por región activa
  const distributors = allDistributors.filter((d) => d.region === activeRegion);

  useEffect(() => {
    if (!sectionRef.current || shouldLoadMap) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [shouldLoadMap]);

  // Al cambiar de ciudad: resetear selección
  const handleRegionChange = (region: Region) => {
    setActiveRegion(region);
    setSelectedId(null);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedId(id);
    }
  };

  return (
    <section
      id="distribuidores"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-paper-texture"
    >
      <motion.div
        className="absolute top-10 right-10 hidden lg:block z-0 pointer-events-none"
        animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src={withBaseUrl('tofuchos/tofucho sorprendido.png')}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-24 h-24 object-contain drop-shadow-lg opacity-80"
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Encabezado de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-6 text-center lg:text-left"
        >
          <span className="text-dymo text-xs inline-block">Puntos de venta</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-2">
            <span className="inline-block bg-foreground text-background px-2">DÓNDE</span> COMPRAR
          </h2>
        </motion.div>

        {/* Grid principal */}
        <div className="grid max-w-6xl mx-auto gap-8 lg:grid-cols-2 lg:gap-x-10 lg:items-start">
          {/* Col 1: Mapa (sticky en desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 space-y-4 lg:order-none lg:sticky lg:top-20 lg:self-start"
          >
            <DistributorsMap
              distributors={distributors}
              shouldLoad={shouldLoadMap}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            <div className="hidden lg:block">
              <DeliveryFridaysBanner />
            </div>
          </motion.div>

          {/* Col 2: Header + tarjetas (misma celda del grid) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 flex flex-col gap-4 lg:order-none"
          >
            {/* Encabezado lista */}
            <div className="space-y-3">
              <h3 className="font-display text-xl inline-block bg-foreground text-background px-2">
                DISTRIBUIDORES
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Toca un punto en la lista para verlo en el mapa.
              </p>
              <CitySlider activeRegion={activeRegion} onChange={handleRegionChange} />
            </div>

            {/* Tarjetas con AnimatePresence para transición al cambiar ciudad */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRegion}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                {distributors.map((dist, index) => {
                  const id = getDistributorId(dist);
                  const isSelected = selectedId === id;
                  const TypeIcon =
                    dist.type === 'supermarket'
                      ? ShoppingBag
                      : dist.type === 'organic'
                        ? Leaf
                        : Store;

                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedId(id)}
                      onKeyDown={(event) => handleCardKeyDown(event, id)}
                      className={cn(
                        'flex items-start gap-4 p-4 border-2 border-foreground bg-background cursor-pointer transition-all',
                        'hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2',
                        isSelected && 'ring-2 ring-foreground ring-offset-2 bg-foreground/5 shadow-brutal'
                      )}
                    >
                      <div className="p-2 bg-foreground text-background border-2 border-foreground shrink-0">
                        <TypeIcon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-base mb-1">{dist.name}</h4>
                        <p className="font-body text-xs text-muted-foreground mb-1">{dist.address}</p>
                        <p className="font-body text-xs mb-2">
                          {dist.city}, {dist.state}
                        </p>

                        <div className="flex flex-wrap gap-3">
                          <a
                            href={dist.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="flex items-center gap-1 text-xs text-foreground hover:text-foreground/80 transition-colors underline-offset-2 hover:underline"
                          >
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span>Ver en Maps</span>
                          </a>
                          <a
                            href={`https://instagram.com/${dist.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="flex items-center gap-1 text-xs text-foreground hover:text-foreground/80 transition-colors underline-offset-2 hover:underline"
                          >
                            <Instagram className="w-3 h-3 shrink-0" />
                            <span>{dist.instagram}</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <div className="lg:hidden">
              <DeliveryFridaysBanner />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DistributorsSection;
