import { useState } from "react";
import { motion } from "framer-motion";
import { withBaseUrl } from "@/lib/base-url";

// Data - Will be loaded from JSON
const restaurants = [
  {
    name: "Musabbaha",
    location: "Puebla",
    mapUrl: "https://maps.app.goo.gl/acYy1r5QcNHhzHJL9", // Agregar enlace real de Google Maps
    logo: withBaseUrl("logos/musabbaha.jpg"), // Agregar logo en /public/logos/
    instagram: "@musabbaha.veggie",
  },
  {
    name: "Britches",
    location: "Puebla",
    mapUrl: "https://maps.app.goo.gl/P6L7wXYzVSfwPWuJ6", // Agregar enlace real de Google Maps
    logo: withBaseUrl("logos/britches.jpg"), // Agregar logo en /public/logos/
    instagram: "@britches.puebla",
  },
  {
    name: "Plant Neta Café",
    location: "Puebla",
    mapUrl: "https://maps.app.goo.gl/8DJ8dWRCXnWiQeJE8", // Agregar enlace real de Google Maps
    logo: withBaseUrl("logos/plantneta.jpg"), // Agregar logo en /public/logos/
    instagram: "@plantnetacafe",
  },
  {
    name: "Break Free",
    location: "Puebla",
    mapUrl: "https://maps.app.goo.gl/uteK8Us41AHfd7Z26", // Agregar enlace real de Google Maps
    logo: withBaseUrl("logos/breakfree.jpg"), // Agregar logo en /public/logos/
    instagram: "@breakfree_rest",
  },
];

const RestaurantsSection = () => {
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

        {/* Restaurant logos/cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={restaurant.name} restaurant={restaurant} index={index} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 font-body text-sm text-background/70"
        >
          ¿Tu restaurante usa Empátika?{" "}
          <a href="https://wa.me/522215606205" className="underline text-background hover:text-background/70">
            Contáctanos
          </a>
        </motion.p>
      </div>
    </section>
  );
};

/** Subcomponente con manejo de errores de imagen basado en estado */
const RestaurantCard = ({ restaurant, index }: { restaurant: typeof restaurants[number]; index: number }) => {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <motion.a
      href={restaurant.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card-brutal bg-background text-foreground block cursor-pointer group hover:-translate-y-1 hover:shadow-brutal-lg transition-all duration-200"
      aria-label={`Ver ubicación de ${restaurant.name} en Google Maps`}
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

      <h3 className="font-display text-lg text-center mb-1">{restaurant.name}</h3>
      <p className="font-body text-xs text-center mb-2">
        📍 {restaurant.location}
      </p>
      <span
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(`https://instagram.com/${restaurant.instagram.replace('@', '')}`, '_blank', 'noopener,noreferrer');
        }}
        className="font-body text-xs text-foreground hover:text-foreground/60 text-center block transition-colors font-medium cursor-pointer"
        role="link"
        aria-label={`Instagram de ${restaurant.name}`}
      >
        {restaurant.instagram}
      </span>
    </motion.a>
  );
};

export default RestaurantsSection;
