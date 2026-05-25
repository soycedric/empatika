import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { withBaseUrl } from "@/lib/base-url";
import { whatsappHref } from "@/lib/whatsapp";
import restaurantsData from "@/data/restaurants.json";

type Restaurant = {
  name: string;
  location: string;
  mapUrl: string;
  logo: string;
  instagram: string;
};

const restaurants = (restaurantsData as Restaurant[]).map((restaurant) => ({
  ...restaurant,
  logo: withBaseUrl(restaurant.logo),
}));

const RestaurantsSection = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollByAmount = useMemo(() => {
    return () => {
      const element = scrollRef.current;
      if (!element) {
        return 0;
      }

      return Math.max(220, Math.round(element.clientWidth * 0.8));
    };
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }

    const updateState = () => {
      const maxScrollLeft = element.scrollWidth - element.clientWidth - 1;
      setCanScrollLeft(element.scrollLeft > 0);
      setCanScrollRight(element.scrollLeft < maxScrollLeft);
    };

    updateState();
    element.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);

    return () => {
      element.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }

    const amount = scrollByAmount();
    element.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="restaurantes" className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Tofucho cocinando flotante - Desktop */}
      <motion.div
        className="absolute top-10 right-10 hidden lg:block"
        animate={{ y: [0, -15, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={withBaseUrl("tofuchos/tofucho cocinando.png")} alt="" aria-hidden="true" loading="lazy" className="w-28 h-28 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Tofucho leyendo recetas - Desktop */}
      <motion.div
        className="absolute bottom-20 left-10 hidden lg:block"
        animate={{ y: [0, 10, 0], rotate: [2, -2, 2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <img src={withBaseUrl("tofuchos/tofucho leyendo.png")} alt="" aria-hidden="true" loading="lazy" className="w-22 h-22 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Tofucho cocinando - Mobile y Tablet */}
      <div className="flex justify-center w-full absolute top-6 left-0 lg:hidden z-40">
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={withBaseUrl("tofuchos/tofucho cocinando.png")} alt="" aria-hidden="true" loading="lazy" className="w-22 h-22 object-contain drop-shadow-lg" />
        </motion.div>
      </div>

      {/* Tofucho leyendo - Mobile y Tablet */}
      <motion.div
        className="flex justify-center w-full absolute bottom-0 left-0 lg:hidden z-40"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={withBaseUrl("tofuchos/tofucho leyendo.png")} alt="" aria-hidden="true" loading="lazy" className="w-18 h-18 object-contain drop-shadow-lg" />
      </motion.div>

      <div className="container mx-auto px-4 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-3"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-background">
            Restaurantes que <span className="bg-background text-foreground px-1">confían</span> en nosotros
          </h2>
          <p className="font-body text-sm text-background/70 max-w-2xl mx-auto">
            Restaurantes que ya sirven Empátika. ¿Qué esperas para formar parte de esta lista?
          </p>
        </motion.div>

        {/* Restaurant carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-6">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-background/70">
              Arrastra para explorar
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                className="border-2 border-background px-3 py-2 text-xs font-display uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed hover:bg-background hover:text-foreground transition-colors"
                aria-label="Desplazar carrusel hacia la izquierda"
              >
                ◀
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                className="border-2 border-background px-3 py-2 text-xs font-display uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed hover:bg-background hover:text-foreground transition-colors"
                aria-label="Desplazar carrusel hacia la derecha"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-foreground to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-foreground to-transparent" />
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-1 cursor-grab active:cursor-grabbing touch-pan-x"
              aria-label="Carrusel de restaurantes"
            >
              {restaurants.map((restaurant, index) => (
                <div key={restaurant.name} className="snap-center shrink-0 w-[240px] sm:w-[260px]">
                  <RestaurantCard restaurant={restaurant} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 font-body text-sm text-background/70"
        >
          ¿Tu restaurante usa Empátika?{" "}
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-background hover:text-background/70"
          >
            Contáctanos
          </a>
        </motion.p>
      </div>
    </section>
  );
};

/** Subcomponente con manejo de errores de imagen basado en estado */
const RestaurantCard = ({ restaurant, index }: { restaurant: Restaurant; index: number }) => {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="card-brutal bg-background text-foreground block group transition-all duration-200"
    >
      {/* Logo */}
      <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-lg border-2 border-foreground flex items-center justify-center overflow-hidden group-hover:border-foreground/70 transition-colors">
        {logoFailed ? (
          <span className="text-2xl" aria-hidden="true">🍽️</span>
        ) : (
          <img
            src={restaurant.logo}
            alt={`Logo de ${restaurant.name}`}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={() => setLogoFailed(true)}
          />
        )}
      </div>

      <h3 className="font-display text-lg text-center mb-2">{restaurant.name}</h3>
      <p className="font-body text-xs text-center mb-3 uppercase tracking-wider text-foreground/70">
        {restaurant.location}
      </p>

      <div className="flex flex-col gap-2">
        <a
          href={restaurant.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-foreground text-foreground text-xs font-display uppercase tracking-wider py-2 text-center hover:bg-foreground hover:text-background transition-colors"
          aria-label={`Ver ubicación de ${restaurant.name} en Google Maps`}
        >
          Ubicación
        </a>
        <a
          href={`https://instagram.com/${restaurant.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-foreground text-foreground text-xs font-display uppercase tracking-wider py-2 text-center hover:bg-foreground hover:text-background transition-colors"
          aria-label={`Instagram de ${restaurant.name}`}
        >
          Instagram
        </a>
      </div>
    </motion.article>
  );
};

export default RestaurantsSection;
