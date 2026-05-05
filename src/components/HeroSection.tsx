import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { useEffect, useState, type KeyboardEvent } from "react";

const platePlaceholders = [
  {
    id: "tofu-bowl",
    label: "Placeholder platillo 01",
    shape: "rounded-full",
    base: "bg-foreground",
    accent: "bg-background/20",
    size: "h-36 w-36 sm:h-40 sm:w-40 lg:h-44 lg:w-44",
    tilt: "rotate-[-4deg]",
  },
  {
    id: "tofu-wrap",
    label: "Placeholder platillo 02",
    shape: "rounded-2xl",
    base: "bg-card",
    accent: "bg-foreground/15",
    size: "h-32 w-32 sm:h-36 sm:w-36 lg:h-40 lg:w-40",
    tilt: "rotate-[3deg]",
  },
  {
    id: "tofu-tacos",
    label: "Placeholder platillo 03",
    shape: "rounded-full",
    base: "bg-muted",
    accent: "bg-foreground/10",
    size: "h-40 w-40 sm:h-44 sm:w-44 lg:h-52 lg:w-52",
    tilt: "rotate-[2deg]",
  },
  {
    id: "tofu-salad",
    label: "Placeholder platillo 04",
    shape: "rounded-2xl",
    base: "bg-foreground",
    accent: "bg-background/25",
    size: "h-[8.5rem] w-[8.5rem] sm:h-[9.5rem] sm:w-[9.5rem] lg:h-[10.5rem] lg:w-[10.5rem]",
    tilt: "rotate-[-3deg]",
  },
];

const vanishParticles = [
  { x: -34, y: -26, size: "h-1.5 w-1.5", delay: 0 },
  { x: 36, y: -22, size: "h-2 w-2", delay: 0.02 },
  { x: -42, y: 8, size: "h-1.5 w-1.5", delay: 0.04 },
  { x: 44, y: 12, size: "h-2 w-2", delay: 0.06 },
  { x: -20, y: 34, size: "h-1.5 w-1.5", delay: 0.08 },
  { x: 16, y: 38, size: "h-2 w-2", delay: 0.1 },
  { x: 0, y: -42, size: "h-1.5 w-1.5", delay: 0.12 },
  { x: 0, y: 44, size: "h-2 w-2", delay: 0.14 },
];

const heroTitleLines = [
  {
    text: "TOFU",
    sizeClass: "text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[7.5rem] xl:text-[8rem]",
  },
  {
    text: "EXTRA FIRME",
    sizeClass: "text-[2.2rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem]",
    inverted: true,
  },
  {
    text: "PARA",
    sizeClass: "text-[2.3rem] sm:text-[3.3rem] md:text-[4.3rem] lg:text-[5rem] xl:text-[5.3rem]",
  },
  {
    text: "CUALQUIER",
    sizeClass: "text-[2.2rem] sm:text-[3.2rem] md:text-[4.2rem] lg:text-[4.8rem] xl:text-[5rem]",
  },
  {
    text: "RECETA",
    sizeClass: "font-black text-[2.7rem] sm:text-[3.8rem] md:text-[5rem] lg:text-[5.8rem] xl:text-[6.3rem]",
  },
];

const sliderBubbles = [
  {
    label: "🌱 100% VEGANO",
    className: "-left-2 top-4 sm:-left-4 sm:top-6 lg:-left-8 lg:top-8",
    delay: 0,
  },
  {
    label: "💪 PROTEÍNA DE CALIDAD",
    className: "right-0 top-10 sm:-right-3 sm:top-14 lg:-right-8 lg:top-16",
    delay: 0.7,
  },
  {
    label: "🔥 SE DORA PERFECTO",
    className: "left-1 top-1/2 sm:left-2 sm:top-[52%] lg:-left-12 lg:top-[47%]",
    delay: 1.1,
  },
  {
    label: "🧂 ABSORBE SABOR RÁPIDO",
    className: "right-1 top-1/2 sm:right-2 sm:top-[56%] lg:-right-14 lg:top-[52%]",
    delay: 1.6,
  },
  {
    label: "🇲🇽 HECHO EN PUEBLA",
    className: "left-4 bottom-3 sm:left-7 sm:bottom-4 lg:left-10 lg:bottom-7",
    delay: 2,
  },
  {
    label: "🧊 EXTRA FIRME",
    className: "right-4 bottom-2 sm:right-6 sm:bottom-3 lg:right-8 lg:bottom-8",
    delay: 2.4,
  },
  {
    label: "✨ SIN CONSERVADORES",
    className: "left-8 -top-1 sm:left-14 sm:-top-2 lg:left-20 lg:-top-4",
    delay: 2.8,
  },
];

const renderJustifiedLine = (text: string) => {
  return (
    <span className="block w-full" aria-hidden="true" style={{ height: "1.012em" }}>
      <svg viewBox="0 0 100 16" preserveAspectRatio="none" className="block h-full w-full overflow-visible">
        <text
          x="0"
          y="13.2"
          textLength="100"
          lengthAdjust="spacingAndGlyphs"
          className="fill-current"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "0",
            fontSize: 13.2,
          }}
        >
          {text}
        </text>
      </svg>
    </span>
  );
};

const HeroSection = () => {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBreakingPlate, setIsBreakingPlate] = useState(false);
  const [isSliderInteracting, setIsSliderInteracting] = useState(false);

  useEffect(() => {
    if (reducedMotion || isBreakingPlate || isSliderInteracting) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % platePlaceholders.length);
    }, 3400);

    return () => window.clearInterval(intervalId);
  }, [reducedMotion, isBreakingPlate, isSliderInteracting]);

  const showNextPlate = () => {
    setActiveIndex((current) => (current + 1) % platePlaceholders.length);
  };

  const showPreviousPlate = () => {
    setActiveIndex((current) =>
      current === 0 ? platePlaceholders.length - 1 : current - 1,
    );
  };

  const handleBreakPlate = () => {
    if (isBreakingPlate) {
      return;
    }

    if (reducedMotion) {
      showNextPlate();
      return;
    }

    setIsBreakingPlate(true);

    window.setTimeout(() => {
      showNextPlate();
      setIsBreakingPlate(false);
    }, 360);
  };

  const handlePlateDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isBreakingPlate) {
      return;
    }

    if (info.offset.x <= -58) {
      showNextPlate();
      return;
    }

    if (info.offset.x >= 58) {
      showPreviousPlate();
    }
  };

  const handlePlateKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextPlate();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousPlate();
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleBreakPlate();
    }
  };

  const activePlate = platePlaceholders[activeIndex];

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: "hsl(var(--paper))" }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,hsl(var(--foreground)/0.12),transparent_35%),radial-gradient(circle_at_85%_65%,hsl(var(--foreground)/0.08),transparent_40%)]" />

      <div className="mx-auto grid min-h-[86svh] w-full max-w-7xl grid-cols-1 gap-8 px-4 pb-10 pt-20 sm:min-h-[88svh] sm:px-6 sm:pt-24 md:gap-10 lg:min-h-[min(100vh,980px)] lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:items-center lg:gap-2 lg:px-10 lg:pb-12 lg:pt-24">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="order-2 mx-auto w-full max-w-2xl text-center lg:order-1 lg:mx-0 lg:max-w-3xl lg:pr-4 lg:text-left"
        >
          <h1
            className="font-display mx-auto w-full max-w-[15rem] uppercase leading-[0.9] tracking-[0.01em] text-foreground sm:max-w-[21rem] md:max-w-[27rem] lg:mx-0 lg:max-w-[31rem]"
            aria-label="Tofu extra firme para cualquier receta"
          >
            {heroTitleLines.map((line) => (
              <span
                key={line.text}
                className={`block w-full whitespace-nowrap ${line.sizeClass} ${line.inverted ? "bg-foreground px-[0.05em] text-background" : ""}`}
              >
                {renderJustifiedLine(line.text)}
              </span>
            ))}
          </h1>

          <p className="mt-4 mx-auto max-w-xl text-base text-foreground/85 sm:text-lg lg:mx-0 lg:mt-5">
           
            <strong className="text-foreground"> Marínalo, fríelo o cómelo directo.</strong>
          </p>

          <motion.div
            className="mt-7 flex flex-wrap justify-center gap-3 lg:mt-8 lg:justify-start"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}
          >
            <motion.a
              href="#calculadora"
              className="btn-brutal w-full sm:w-auto"
              whileHover={reducedMotion ? undefined : { y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            >
              Comprar Tofu
            </motion.a>
            <motion.a
              href="#productos"
              className="inline-flex w-full items-center justify-center border-2 border-foreground bg-background px-6 py-3 font-display text-lg uppercase text-foreground shadow-[4px_4px_0_hsl(var(--ink))] transition-all duration-150 hover:-translate-y-[2px] hover:shadow-[8px_8px_0_hsl(var(--ink))] sm:w-auto"
              whileHover={reducedMotion ? undefined : { y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            >
              Ver Productos
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-1 relative mx-auto flex w-full max-w-xl items-center justify-center lg:order-2 lg:max-w-none lg:justify-center"
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          aria-label="Área reservada para fotografías cenitales de platillos"
        >
          <div className="relative flex h-[18rem] w-[18rem] items-center justify-center sm:h-[21rem] sm:w-[21rem] lg:h-[28rem] lg:w-[28rem]">
            {sliderBubbles.map((bubble) => (
              <motion.div
                key={bubble.label}
                className={`pointer-events-none absolute z-20 rounded-full border border-foreground/35 bg-background/85 px-3 py-1 text-[0.62rem] uppercase tracking-[0.1em] text-foreground shadow-[2px_2px_0_hsl(var(--ink))] backdrop-blur-[1px] sm:text-[0.66rem] ${bubble.className}`}
                initial={reducedMotion ? false : { opacity: 0, y: 4, scale: 0.96 }}
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: [0.25, 0.8, 0.25],
                        y: [0, -5, 0],
                        scale: [0.98, 1, 0.98],
                      }
                }
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: bubble.delay }}
                aria-hidden="true"
              >
                {bubble.label}
              </motion.div>
            ))}

            <motion.div
              className="pointer-events-none absolute inset-0 m-auto h-[17rem] w-[17rem] rounded-full border border-foreground/20 sm:h-[20rem] sm:w-[20rem] lg:h-[26rem] lg:w-[26rem]"
              animate={reducedMotion ? undefined : { rotate: 360 }}
              transition={{ duration: isSliderInteracting ? 12 : 22, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
            <motion.div
              className="pointer-events-none absolute inset-0 m-auto h-[12.75rem] w-[12.75rem] rounded-full border-2 border-dashed border-foreground/30 sm:h-[15rem] sm:w-[15rem] lg:h-[20rem] lg:w-[20rem]"
              animate={reducedMotion ? undefined : { rotate: -360 }}
              transition={{ duration: isSliderInteracting ? 9 : 16, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              <motion.button
                key={activePlate.id}
                type="button"
                onClick={handleBreakPlate}
                onKeyDown={handlePlateKeyDown}
                onHoverStart={() => setIsSliderInteracting(true)}
                onHoverEnd={() => setIsSliderInteracting(false)}
                onFocus={() => setIsSliderInteracting(true)}
                onBlur={() => setIsSliderInteracting(false)}
                onTouchStart={() => setIsSliderInteracting(true)}
                onTouchEnd={() => setIsSliderInteracting(false)}
                drag={reducedMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={handlePlateDragEnd}
                aria-label={`Platillo interactivo: ${activePlate.label}. Toca para quebrarlo, desliza para cambiar o usa flechas del teclado.`}
                className={`${activePlate.size} ${activePlate.shape} ${activePlate.tilt} ${activePlate.base} group relative cursor-grab overflow-hidden border-2 border-border shadow-[8px_8px_0_hsl(var(--ink))] will-change-transform active:cursor-grabbing`}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.84, rotate: -14 }}
                animate={
                  reducedMotion
                    ? undefined
                    : isBreakingPlate
                      ? {
                          opacity: 0,
                          scale: 0.42,
                          rotate: -10,
                          y: 10,
                          filter: "blur(10px)",
                          transition: { duration: 0.34, ease: "easeIn" },
                        }
                      : { opacity: 1, scale: 1, rotate: 0, y: 0, filter: "blur(0px)" }
                }
                exit={reducedMotion ? undefined : { opacity: 0, scale: 1.08, rotate: 12 }}
                transition={{ duration: 0.46, ease: "easeOut" }}
                whileHover={reducedMotion ? undefined : { y: -5, scale: 1.02 }}
                whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              >
                <div
                  className={`absolute inset-[14%] ${activePlate.accent} ${activePlate.shape}`}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-[33%] rounded-full bg-background/80"
                  aria-hidden="true"
                />
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  initial={false}
                  animate={
                    reducedMotion
                      ? undefined
                      : isBreakingPlate
                        ? { opacity: 1 }
                        : { opacity: 0 }
                  }
                >
                  <motion.div
                    className="absolute inset-[16%] rounded-full bg-background/40"
                    animate={
                      reducedMotion
                        ? undefined
                        : isBreakingPlate
                          ? { opacity: [0, 0.7, 0], scale: [0.8, 1.15, 1.28] }
                          : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.34, ease: "easeOut" }}
                  />
                  {vanishParticles.map((particle) => (
                    <motion.span
                      key={`${particle.x}-${particle.y}`}
                      className={`absolute left-1/2 top-1/2 ${particle.size} -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/90`}
                      animate={
                        reducedMotion
                          ? undefined
                          : isBreakingPlate
                            ? {
                                opacity: [0, 1, 0],
                                x: [0, particle.x],
                                y: [0, particle.y],
                                scale: [0.8, 1.2, 0.4],
                              }
                            : { opacity: 0, x: 0, y: 0, rotate: 0 }
                      }
                      transition={{ duration: 0.34, delay: particle.delay, ease: "easeOut" }}
                    />
                  ))}
                </motion.div>
              </motion.button>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 sm:block">
        <motion.div
          className="h-8 w-5 rounded-full border-2 border-foreground/40 pt-1"
          animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          aria-hidden="true"
        >
          <div className="mx-auto h-2 w-1 rounded-full bg-foreground/60" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
