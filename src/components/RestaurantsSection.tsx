import { motion } from "framer-motion";

// Data - Will be loaded from JSON
const restaurants = [
  {
    name: "Forever Vegano",
    location: "CDMX",
    type: "Restaurante 100% vegano",
  },
  {
    name: "Por Siempre Vegana Taquería",
    location: "CDMX",
    type: "Taquería vegana",
  },
  {
    name: "Vegamo",
    location: "Monterrey",
    type: "Cocina plant-based",
  },
  {
    name: "La Pitahaya Vegana",
    location: "Guadalajara",
    type: "Restaurante vegano",
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
        <img src="/tofuchos/tofucho cocinando.png" alt="Tofucho cocinando" className="w-36 h-36 object-contain opacity-90 drop-shadow-lg" />
      </motion.div>

      {/* Tofucho leyendo recetas - Desktop */}
      <motion.div
        className="absolute bottom-20 left-10 hidden lg:block"
        animate={{ y: [0, 10, 0], rotate: [2, -2, 2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <img src="/tofuchos/tofucho leyendo.png" alt="Tofucho leyendo recetas" className="w-28 h-28 object-contain opacity-80 drop-shadow-lg" />
      </motion.div>

      {/* Tofucho cocinando - Mobile y Tablet */}
      <div className="flex justify-center w-full absolute top-6 left-0 lg:hidden z-40">
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src="/tofuchos/tofucho cocinando.png" alt="Tofucho cocinando" className="w-28 h-28 object-contain drop-shadow-lg" />
        </motion.div>
      </div>

      {/* Tofucho leyendo - Mobile y Tablet */}
      <motion.div
        className="flex justify-center w-full absolute bottom-0 left-0 lg:hidden z-40"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/tofuchos/tofucho leyendo.png" alt="Tofucho leyendo" className="w-24 h-24 object-contain drop-shadow-lg" />
      </motion.div>

      <div className="container mx-auto px-4 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-3"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-background">
            Restaurantes que <span className="text-highlight-yellow">confían</span> en nosotros
          </h2>
          <p className="font-body text-sm text-background/70 max-w-2xl mx-auto">
            Menús plant-based, taquerías y hoteles ya sirven Empátika. Próximamente añadiremos sus logos oficiales.
          </p>
        </motion.div>

        {/* Restaurant logos/cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-brutal bg-background text-foreground"
            >
              {/* Logo placeholder */}
              <div className="placeholder-tile w-16 h-16 mx-auto mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              
              <h3 className="font-display text-lg text-center mb-1">{restaurant.name}</h3>
              <p className="font-body text-xs text-muted-foreground text-center">
                {restaurant.location} · {restaurant.type}
              </p>
            </motion.div>
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
          <a href="#contacto" className="underline text-primary hover:text-primary/80">
            Contáctanos
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default RestaurantsSection;
