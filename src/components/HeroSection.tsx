import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="paper-texture relative min-h-screen flex items-center justify-center overflow-hidden"
    >

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-center">
          {/* Image - First on mobile, takes 2/5 on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center order-first lg:order-last lg:col-span-2"
          >
            {/* Mascot Placeholder Area */}
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md aspect-square">
              {/* Background shape */}
              <div className="absolute inset-0 bg-primary/25 border-4 border-dashed border-foreground rotate-2" />
              
              {/* Main placeholder */}
              <div className="absolute inset-5 placeholder-tile -rotate-1">
                <div className="text-center p-8">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 border-4 border-dashed border-muted-foreground flex items-center justify-center">
                    <span className="text-4xl">🧊</span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground tracking-wide">
                    Ilustración / Mascota
                  </p>
                </div>
              </div>

              {/* Corner accent */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-secondary border-4 border-foreground"
                animate={{ rotate: [0, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Text Content - takes 3/5 on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 order-last lg:order-first lg:col-span-3"
          >
            {/* Social proof + badge */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
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
              className="font-body text-base max-w-md leading-relaxed text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Tofu artesanal hecho en Puebla. Proteína vegetal lista para dorar, marinar o comer directo. Textura firme y sabor brutal.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-wrap gap-4 pt-2"
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
              className="flex items-center gap-3 text-sm text-muted-foreground"
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

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
