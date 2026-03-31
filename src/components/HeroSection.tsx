import { motion } from "framer-motion";

// Food photos from /platillos
const foodPhotos = [
  { src: "/platillos/tacos-tofu.jpg", alt: "Tacos de tofu" },
  { src: "/platillos/bowl-asiatico.jpg", alt: "Bowl asiático con tofu" },
  { src: "/platillos/sandwich-tofu.jpg", alt: "Sandwich de tofu" },
  { src: "/platillos/tofu-plancha.jpg", alt: "Tofu a la plancha" },
];

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "hsl(var(--paper))" }}
    >
      {/* Full-width photo grid as background */}
      <div className="absolute inset-0 grid grid-cols-2 lg:grid-cols-4 gap-0">
        {foodPhotos.map((photo, i) => (
          <div key={i} className="relative overflow-hidden">
            <motion.img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
            />
          </div>
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Tofuchos living in the Hero */}
      <motion.img
        src="/tofuchos/tofucho saludando.png"
        alt=""
        aria-hidden="true"
        className="absolute top-20 right-6 lg:right-20 w-16 h-16 lg:w-20 lg:h-20 object-contain z-20 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src="/tofuchos/tofucho saltando.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-32 left-6 lg:left-20 w-14 h-14 lg:w-18 lg:h-18 object-contain z-20 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        animate={{ y: [0, -14, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src="/tofuchos/tofucho cocinando.png"
        alt=""
        aria-hidden="true"
        className="absolute top-1/3 left-4 lg:left-12 w-12 h-12 lg:w-16 lg:h-16 object-contain z-20 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] hidden sm:block"
        animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Content — centered over photos */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Badge */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="bg-white/90 text-black font-body text-xs uppercase tracking-wider px-3 py-1.5 border border-black/20">
            🌱 100% Vegano
          </span>
          <span className="bg-white/90 text-black font-body text-xs uppercase tracking-wider px-3 py-1.5 border border-black/20">
            💪 13g Proteína
          </span>
          <span className="bg-white/90 text-black font-body text-xs uppercase tracking-wider px-3 py-1.5 border border-black/20">
            🇲🇽 Hecho en Puebla
          </span>
        </motion.div>

        {/* Headline — tight, impactful */}
        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase leading-[0.85] text-white mb-4 "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            textShadow: "3px 3px 0 rgba(0,0,0,0.3)",
          }}
        >
          El tofu dejó
          <br />
          de ser aburrido
        </motion.h1>

        {/* Subtitle — tight to heading */}
        <motion.p
          className="font-body text-sm sm:text-base text-white/80 max-w-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Tofu artesanal poblano con la firmeza exacta para cualquier receta.
          <strong className="text-white"> Marínalo, fríelo o cómelo directo.</strong>
        </motion.p>

        {/* CTAs — tight spacing */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="#calculadora"
            className="inline-flex items-center justify-center px-8 py-3 font-display text-base uppercase bg-white text-black border-[3px] border-white cursor-pointer shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.3)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Comprar Tofu
          </motion.a>
          <motion.a
            href="#productos"
            className="inline-flex items-center justify-center px-8 py-3 font-display text-base uppercase bg-transparent text-white border-[3px] border-white cursor-pointer shadow-[4px_4px_0_0_rgba(255,255,255,0.2)] transition-all duration-150 hover:bg-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver Productos
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 border-2 border-white/60 flex justify-center pt-1.5 rounded-full">
          <motion.div
            className="w-1 h-2 bg-white/80 rounded-full"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
