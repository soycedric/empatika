import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Platillos que se pueden hacer con tofu - agregar tus fotos aquí
const dishes = [
  {
    id: 1,
    name: "Tacos de Tofu",
    description: "Crujientes y sazonados",
    image: "/platillos/tacos-tofu.jpg",
    tag: "Popular",
  },
  {
    id: 2,
    name: "Bowl Asiático",
    description: "Con verduras salteadas",
    image: "/platillos/bowl-asiatico.jpg",
    tag: "Saludable",
  },
  {
    id: 3,
    name: "Tofu a la Plancha",
    description: "Dorado y jugoso",
    image: "/platillos/tofu-plancha.jpg",
    tag: "Clásico",
  },
  {
    id: 4,
    name: "Sandwich de Tofu",
    description: "Ahumado con aguacate",
    image: "/platillos/sandwich-tofu.jpg",
    tag: "Rápido",
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

  // Rotaciones para cada card cuando está activa (todas diferentes)
  const activeRotations = [-3, 4, -2, 3];
  // Rotaciones para cards en el fondo
  const stackRotations = [-8, 5, -6, 7];

  return (
    <section
      id="inicio"
      className="paper-texture relative min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-0"
    >
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-16 items-center">
          {/* Dish Carousel - First on mobile, takes 2/5 on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center order-first lg:order-last lg:col-span-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
              <div className="relative w-[240px] sm:w-[340px] lg:w-[420px] h-[300px] sm:h-[420px] lg:h-[520px]">
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
                          className={`w-full h-full bg-background border-4 border-foreground shadow-brutal overflow-hidden ${
                            isActive ? '' : 'pointer-events-none'
                          }`}
                        >
                          {/* Image */}
                          <div className="relative h-[calc(100%-48px)] sm:h-[calc(100%-60px)] bg-muted overflow-hidden">
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
                          <div className="h-[48px] sm:h-[60px] flex items-center justify-center bg-background border-t-2 border-foreground">
                            <p className="font-display text-base sm:text-xl lg:text-2xl">{dish.name}</p>
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
          </motion.div>

          {/* Text Content - takes 3/5 on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 sm:space-y-6 order-last lg:order-first lg:col-span-3 text-center lg:text-left"
          >
            {/* Social proof + badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm">
              <span className="text-dymo">Nuevo lote fresco cada semana</span>
            </div>

            {/* Main Headline - SEO H1 with 3D extrusion effect */}
            <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] uppercase">
              <motion.span
                className="block text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
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
              className="font-body text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Tofu artesanal hecho en Puebla. Proteína vegetal lista para dorar, marinar o comer directo. Textura firme y sabor brutal.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="#productos"
                className="btn-brutal"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver productos
              </motion.a>
              <motion.a
                href="#distribuidores"
                className="btn-brutal-orange"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Comprar cerca
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-primary border border-foreground" />
                Lote semanal, stock limitado
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Envíos Puebla y CDMX</span>
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
