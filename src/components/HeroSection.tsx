import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Tofuchos para decoración - posicionados en espacios en blanco sin interferir
const heroTofuchos = [
  // Arriba izquierda - en la esquina, lejos del texto
  { src: "/tofuchos/tofucho saludando.png", alt: "Tofucho saludando", position: "bottom-20 left-[45%] lg:bottom-24 lg:left-[45%] xl:left-[45%]", size: "w-32 h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40", animation: { y: [0, -8, 0], rotate: [-3, 3, -3] }, showOnMobile: false },
  // Centro-derecha arriba - entre texto y carrusel, arriba
  { src: "/tofuchos/tofucho riendo.png", alt: "Tofucho riendo", position: "top-28 left-[55%] lg:top-32 lg:left-[52%] xl:left-[50%]", size: "w-20 h-20 lg:w-28 lg:h-28 xl:w-32 xl:h-32", animation: { rotate: [-2, 4, -2], y: [0, -6, 0] }, showOnMobile: false },
  // Abajo derecha - en la esquina
  { src: "/tofuchos/tofucho saltando.png", alt: "Tofucho saltando", position: "bottom-16 right-4 lg:bottom-20 lg:right-6 xl:right-10", size: "w-24 h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36", animation: { y: [0, -18, 0], scale: [1, 1.04, 1] }, showOnMobile: false },
  // Arriba derecha - encima del carrusel en la esquina
  { src: "/tofuchos/tofucho sorprendido.png", alt: "Tofucho sorprendido", position: "top-20 right-8 lg:top-24 lg:right-12 xl:right-20", size: "w-20 h-20 lg:w-28 lg:h-28 xl:w-32 xl:h-32", animation: { y: [0, -10, 0], rotate: [0, 5, 0] }, showOnMobile: false },
];

// Tofuchos específicos para mobile - más grandes y distribuidos
const mobileTofuchos = [
  // Arriba izquierda
  { src: "/tofuchos/tofucho saludando.png", alt: "Tofucho saludando", position: "top-5/8 left-2", size: "w-20 h-20", animation: { y: [0, -10, 0], rotate: [-4, 4, -4] } },
  // Centro derecha
  { src: "/tofuchos/tofucho riendo.png", alt: "Tofucho riendo", position: "top-5/8 right-2", size: "w-22 h-22", animation: { y: [0, -10, 0], scale: [1, 1.05, 1] } },
];

// Platillos que se pueden hacer con tofu - agregar tus fotos aquí
const dishes = [
  {
    id: 1,
    name: "Tacos de Tofu",
    description: "Crujientes y sazonados",
    image: "/platillos/tacos-tofu.jpg",
  },
  {
    id: 2,
    name: "Bowl Asiático",
    description: "Con verduras salteadas",
    image: "/platillos/bowl-asiatico.jpg",
  },
  {
    id: 3,
    name: "Tofu a la Plancha",
    description: "Dorado y jugoso",
    image: "/platillos/tofu-plancha.jpg",
  },
  {
    id: 4,
    name: "Sandwich de Tofu",
    description: "Ahumado con aguacate",
    image: "/platillos/sandwich-tofu.jpg",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % dishes.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + dishes.length) % dishes.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  // Pause on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      setIsAutoPlaying(false);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      setIsAutoPlaying(false);
    }
  }, [prevSlide, nextSlide]);

  // Rotaciones para cada card cuando está activa (todas diferentes)
  const activeRotations = [-3, 4, -2, 3];
  // Rotaciones para cards en el fondo
  const stackRotations = [-8, 5, -6, 7];

  return (
    <section
      id="inicio"
      className="paper-texture relative min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-0"
    >
      {/* Tofuchos flotantes decorativos - Desktop */}
      {heroTofuchos.map((tofucho, index) => (
        <motion.div
          key={tofucho.alt}
          className={`absolute ${tofucho.position} z-20 hidden lg:block`}
          animate={tofucho.animation}
          transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={tofucho.src}
            alt=""
            aria-hidden="true"
            className={`${tofucho.size} object-contain drop-shadow-lg`}
          />
        </motion.div>
      ))}

      {/* Tofuchos flotantes decorativos - Mobile y Tablet */}
      {mobileTofuchos.map((tofucho, index) => (
        <motion.div
          key={`mobile-${tofucho.alt}`}
          className={`absolute ${tofucho.position} z-40 lg:hidden`}
          animate={tofucho.animation}
          transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={tofucho.src}
            alt=""
            aria-hidden="true"
            className={`${tofucho.size} object-contain drop-shadow-lg`}
          />
        </motion.div>
      ))}

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-16 items-center">
          {/* Dish Carousel - First on mobile, takes 2/5 on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative flex items-center justify-center order-first lg:order-last lg:col-span-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="region"
            aria-roledescription="carrusel"
            aria-label="Platillos que puedes hacer con tofu"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Container with side buttons */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Left Button */}
              <motion.button
                onClick={prevSlide}
                className="p-1.5 sm:p-3 border-2 border-foreground bg-background shadow-brutal hover:bg-primary transition-colors flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              {/* Cards Stack */}
              <div className="relative w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[340px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[420px]">
                <AnimatePresence mode="popLayout">
                  {dishes.map((dish, index) => {
                    // Calcular posición relativa al índice actual
                    const offset = index - currentIndex;
                    const isActive = index === currentIndex;
                    const isVisible = Math.abs(offset) <= 2;

                    if (!isVisible) return null;

                    return (
                      <motion.div
                        key={dish.id}
                        className="absolute inset-0"
                        initial={{
                          scale: 0.9,
                          opacity: 0,
                          rotate: stackRotations[index % stackRotations.length],
                          x: direction > 0 ? 100 : -100,
                        }}
                        animate={{
                          scale: isActive ? 1 : 0.9 - Math.abs(offset) * 0.05,
                          opacity: isActive ? 1 : 0.6 - Math.abs(offset) * 0.2,
                          rotate: isActive ? activeRotations[index % activeRotations.length] : stackRotations[index % stackRotations.length] + offset * 3,
                          x: offset * 15,
                          y: Math.abs(offset) * 8,
                          zIndex: dishes.length - Math.abs(offset),
                        }}
                        exit={{
                          scale: 0.8,
                          opacity: 0,
                          rotate: direction > 0 ? -15 : 15,
                          x: direction > 0 ? -150 : 150,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        style={{ zIndex: dishes.length - Math.abs(offset) }}
                      >
                        <div
                          className={`w-full h-full bg-background border-4 border-foreground shadow-brutal overflow-hidden ${isActive ? '' : 'pointer-events-none'
                            }`}
                        >
                          {/* Image */}
                          <div className="relative h-[calc(100%-40px)] sm:h-[calc(100%-45px)] md:h-[calc(100%-48px)] bg-muted overflow-hidden">
                            <img
                              src={dish.image}
                              alt={dish.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden absolute inset-0 flex items-center justify-center bg-muted">
                              <span className="text-5xl sm:text-7xl">🍳</span>
                            </div>
                          </div>

                          {/* Caption */}
                          <div className="h-[40px] sm:h-[45px] md:h-[48px] flex items-center justify-center bg-background border-t-2 border-foreground">
                            <p className="font-display text-sm sm:text-base md:text-lg lg:text-xl">{dish.name}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Right Button */}
              <motion.button
                onClick={nextSlide}
                className="p-1.5 sm:p-3 border-2 border-foreground bg-background shadow-brutal hover:bg-primary transition-colors flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 justify-center mt-4 absolute -bottom-8 left-1/2 -translate-x-1/2" role="tablist" aria-label="Seleccionar platillo">
              {dishes.map((dish, index) => (
                <button
                  key={dish.id}
                  onClick={() => goToSlide(index)}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`${dish.name} (${index + 1} de ${dishes.length})`}
                  className={`w-2.5 h-2.5 border-2 border-foreground transition-all ${index === currentIndex ? 'bg-primary scale-125' : 'bg-muted hover:bg-primary/50'
                    }`}
                />
              ))}
            </div>

            {/* Screen reader live region */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              Mostrando {dishes[currentIndex].name}: {dishes[currentIndex].description}
            </div>
          </motion.div>

          {/* Text Content - takes 3/5 on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4 sm:space-y-6 order-last lg:order-first lg:col-span-3 text-center lg:text-left"
          >
            {/* Social proof + badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm">
              <span className="text-dymo">Nuevo lote fresco cada semana</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 border border-foreground text-xs rotate-1">
                🚚 Envíos Puebla y CDMX
              </span>
              <span
                className="hidden lg:inline-block font-display text-[10px] border-4 border-primary text-primary px-2 py-0.5 uppercase"
                style={{ transform: "rotate(-3deg)", opacity: 0.85, mixBlendMode: "multiply", filter: "contrast(1.4)", letterSpacing: "0.05em" }}
                aria-hidden="true"
              >
                Punk Profesional
              </span>
            </div>

            {/* Main Headline - SEO H1 with 3D extrusion effect */}
            <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] uppercase">
              <motion.span
                className="block text-primary"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  WebkitTextStroke: '2px hsl(var(--ink))',
                  textShadow: `
                    1px 1px 0 hsl(var(--ink)),
                    2px 2px 0 hsl(var(--ink)),
                    3px 3px 0 hsl(var(--ink)),
                    4px 4px 0 hsl(var(--ink)),
                    5px 5px 0 hsl(var(--ink)),
                    6px 6px 0 hsl(var(--ink)),
                    7px 7px 0 hsl(var(--ink)),
                    8px 8px 0 hsl(var(--ink)),
                    9px 9px 0 rgba(0,0,0,0.2)
                  `,
                }}
              >
                El tofu dejó
              </motion.span>
              <motion.span
                className="block text-secondary"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  WebkitTextStroke: '2px hsl(var(--ink))',
                  textShadow: `
                    1px 1px 0 hsl(var(--ink)),
                    2px 2px 0 hsl(var(--ink)),
                    3px 3px 0 hsl(var(--ink)),
                    4px 4px 0 hsl(var(--ink)),
                    5px 5px 0 hsl(var(--ink)),
                    6px 6px 0 hsl(var(--ink)),
                    7px 7px 0 hsl(var(--ink)),
                    8px 8px 0 hsl(var(--ink)),
                    9px 9px 0 rgba(0,0,0,0.2)
                  `,
                }}
              >
                de ser aburrido
              </motion.span>
            </h1>

            <motion.p
              className="font-body text-xl lg:text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.2 }}
            >
              Nuestro tofu artesanal poblano tiene la firmeza exacta para aguantar cualquier receta:<b> marínalo, fríelo o cómelo directo.</b> </motion.p><motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.42, duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-dymo"> Cero complicaciones, 100% sabor brutal.            </motion.p>

            {/* CTA */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="#calculadora"
                className="btn-brutal"
                data-text="Comprar Tofu"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Comprar Tofu
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-3 bg-foreground rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
