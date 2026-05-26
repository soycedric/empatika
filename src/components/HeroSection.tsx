import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import bowlTofu from "../../assets/platillosHero/bowlTofu.webp";
import burgerTofu from "../../assets/platillosHero/burguerTofu.webp";
import ramenTofu from "../../assets/platillosHero/ramenTofu.webp";
import revueltoTofu from "../../assets/platillosHero/revueltoTofu.webp";
import tacoTofu from "../../assets/platillosHero/tacoTofu.webp";
import { withBaseUrl } from "@/lib/base-url";

const plateSizeClass =
  "h-[clamp(14.5rem,48vw,24rem)] w-[clamp(14.5rem,48vw,24rem)] sm:h-[clamp(16rem,42vw,26rem)] sm:w-[clamp(16rem,42vw,26rem)] lg:h-[clamp(22rem,36vw,30rem)] lg:w-[clamp(22rem,36vw,30rem)]";

const plateStageClass =
  "relative flex items-center justify-center h-[clamp(18rem,70vw,32rem)] w-[clamp(18rem,70vw,32rem)] sm:h-[clamp(22rem,60vw,34rem)] sm:w-[clamp(22rem,60vw,34rem)] lg:h-[clamp(30rem,44vw,38rem)] lg:w-[clamp(30rem,44vw,38rem)]";

const platePlaceholders = [
  {
    id: "tofu-bowl",
    label: "Bowl de tofu",
    image: bowlTofu,
    base: "bg-transparent",
    size: plateSizeClass,
    tilt: "rotate-[-4deg]",
  },
  {
    id: "tofu-burger",
    label: "Burger de tofu",
    image: burgerTofu,
    base: "bg-transparent",
    size: plateSizeClass,
    tilt: "rotate-[3deg]",
  },
  {
    id: "tofu-ramen",
    label: "Ramen de tofu",
    image: ramenTofu,
    base: "bg-transparent",
    size: plateSizeClass,
    tilt: "rotate-[2deg]",
  },
  {
    id: "tofu-revuelto",
    label: "Revuelto de tofu",
    image: revueltoTofu,
    base: "bg-transparent",
    size: plateSizeClass,
    tilt: "rotate-[-3deg]",
  },
  {
    id: "tofu-taco",
    label: "Tacos de tofu",
    image: tacoTofu,
    base: "bg-transparent",
    size: plateSizeClass,
    tilt: "rotate-[4deg]",
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

const heroTitlePrimarySizeClass =
  "text-[clamp(2.4rem,8.5vw,3.2rem)] sm:text-[clamp(2.6rem,7.6vw,3.4rem)] md:text-[clamp(2.8rem,6.4vw,3.6rem)] lg:text-[3.24rem] xl:text-[3.54rem]";

const heroTitleSecondarySizeClass =
  "text-[clamp(1.7rem,6.2vw,2.5rem)] sm:text-[clamp(1.9rem,5.6vw,2.6rem)] md:text-[clamp(2.1rem,4.8vw,2.8rem)] lg:text-[2.52rem] xl:text-[2.76rem]";

const tofuchoJumpSrc = withBaseUrl("tofuchos/tofucho%20saltando.png");

const heroTitleLines = [
  {
    id: "line-1",
    segments: [
      { text: "TOFU", sizeClass: heroTitlePrimarySizeClass },
      {
        text: " EXTRA FIRME",
        inverted: true,
        sizeClass: heroTitlePrimarySizeClass,
        extraClass: "ml-3",
      },
    ],
  },
  {
    id: "line-2",
    segments: [
      { text: "PARA CUALQUIER RECETA", sizeClass: heroTitleSecondarySizeClass }
    ],
  },
];

const subtitlePhrases = [
  { highlight: "Marínalo", rest: ", fríelo o cómelo directo." },
  { highlight: "Textura firme", rest: " para cortes limpios." },
  { highlight: "Proteína vegetal", rest: " para tu cocina diaria." },
];

const HeroSection = () => {
  const reducedMotion = false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBreakingPlate, setIsBreakingPlate] = useState(false);
  const [isSliderInteracting, setIsSliderInteracting] = useState(false);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const interactionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (isBreakingPlate || isSliderInteracting) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % platePlaceholders.length);
    }, reducedMotion ? 6200 : 5200);

    return () => window.clearInterval(intervalId);
  }, [reducedMotion, isBreakingPlate, isSliderInteracting]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSubtitleIndex((current) => (current + 1) % subtitlePhrases.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [reducedMotion]);

  const pauseAutoPlay = (duration = 3800) => {
    setIsSliderInteracting(true);

    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = window.setTimeout(() => {
      setIsSliderInteracting(false);
    }, duration);
  };

  const resumeAutoPlay = () => {
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    }

    setIsSliderInteracting(false);
  };

  useEffect(() => () => {
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
    }
  }, []);

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
      className="relative isolate"
      style={{ backgroundColor: "hsl(var(--paper))" }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,hsl(var(--foreground)/0.12),transparent_35%),radial-gradient(circle_at_85%_65%,hsl(var(--foreground)/0.08),transparent_40%)]" />
      <div
        className="absolute inset-0 -z-10 opacity-25"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--foreground)/0.2) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* pt compensa el header fijo (~64px). pb asegura espacio visible para los platillos. */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-0 px-4 pb-12 pt-[4.5rem] sm:px-6 sm:pt-[4.5rem] sm:pb-14 md:pt-[4.75rem] md:pb-14 lg:min-h-screen lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:items-center lg:gap-2 lg:px-10 lg:pb-16 lg:pt-[5rem]">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="order-2 mx-auto w-full max-w-none text-center relative mt-[-1.3rem] sm:mt-[-1.3rem] md:mt-[-1.3rem] lg:order-1 lg:mx-0 lg:mt-0 lg:max-w-3xl lg:pr-4 lg:text-left overflow-visible"
        >
          <div className="relative z-10">
            <div className="mb-5 hidden flex-wrap justify-center gap-2 lg:flex lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-3 py-1 text-xs uppercase tracking-[0.18em] text-foreground shadow-[4px_4px_0_hsl(var(--ink))]">
                <span aria-hidden="true">🌿</span>
                Proteína vegetal
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-3 py-1 text-xs uppercase tracking-[0.18em] text-foreground shadow-[4px_4px_0_hsl(var(--ink))]">
                <span aria-hidden="true">🇲🇽</span>
                Hecho en Puebla
              </div>
            </div>

          <h1
            className="font-display mx-auto w-[80vw] uppercase leading-tight tracking-[0.01em] text-foreground sm:w-[80vw] md:w-[80vw] lg:mx-0 lg:w-full lg:max-w-[40rem]"
            aria-label="Tofu extra firme para cualquier receta"
          >
            {heroTitleLines.map((line, lineIndex) => (
              <span
                key={line.id}
                className={`flex w-full justify-center flex-wrap lg:justify-start ${lineIndex === 0 ? "mb-3" : ""}`}
              >
                {line.segments.map((segment, segmentIndex) => (
                  (() => {
                    const isExtraFirme = segment.text.includes("EXTRA FIRME");

                    return (
                  <span
                    key={`${line.id}-${segment.text}`}
                    className={`${segment.inverted ? "bg-foreground px-[0.05em] text-background" : ""} ${segment.sizeClass ?? ""} ${segment.extraClass ?? ""} ${isExtraFirme ? "relative" : ""}`}
                  >
                    {isExtraFirme && (
                      <motion.img
                        src={tofuchoJumpSrc}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-30 -right-2 hidden h-28 w-28 lg:block z-30"
                        animate={
                          reducedMotion
                            ? undefined
                            : { y: [0, -6, 0], x: [0, 6, 0], rotate: [0, 6, 0] }
                        }
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                    {isExtraFirme && (
                      <motion.img
                        src={tofuchoJumpSrc}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-20 left-[75%] h-[4.8rem] w-[4.8rem] -translate-x-1/2 sm:-top-24 sm:h-[5.4rem] sm:w-[5.4rem] lg:hidden z-30"
                        style={{ scaleX: -1 }}
                        animate={
                          reducedMotion
                            ? undefined
                            : { y: [0, -6, 0], x: [0, -6, 0], rotate: [6, -2, 6], scaleX: -1 }
                        }
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                    {segment.text}
                    {segmentIndex < line.segments.length - 1 ? " " : ""}
                  </span>
                    );
                  })()
                ))}
              </span>
            ))}
          </h1>

          <p className="mt-4 mx-auto max-w-xl text-xl text-foreground/85 sm:text-2xl lg:mx-0 lg:mt-5">
            <AnimatePresence mode="wait">
              <motion.span
                key={subtitlePhrases[subtitleIndex].highlight}
                className="block"
                initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <strong className="text-foreground">{subtitlePhrases[subtitleIndex].highlight}</strong>
                <span className="text-foreground/80">{subtitlePhrases[subtitleIndex].rest}</span>
              </motion.span>
            </AnimatePresence>
          </p>

          <motion.div
            className="mt-7 grid grid-cols-1 gap-3 xs:grid-cols-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 lg:mt-8 lg:justify-start"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}
          >
            <motion.a
              href="#productos"
              className="btn-brutal btn-fill-anim w-full"
              style={{
                "--btn-fill": "hsl(var(--foreground))",
                "--btn-fill-text": "hsl(var(--background))",
              } as CSSProperties}
              whileHover={reducedMotion ? undefined : { y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            >
              Comprar tofu
            </motion.a>
            <motion.a
              href="#mayoristas"
              className="btn-brutal-outline btn-fill-anim w-full"
              style={{ "--btn-fill": "hsl(var(--foreground)/0.12)" } as CSSProperties}
              whileHover={reducedMotion ? undefined : { y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            >
              Quiero precio mayorista
            </motion.a>
          </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="order-1 relative mx-auto flex w-full max-w-xl items-center justify-center overflow-visible lg:order-2 lg:max-w-none lg:justify-center"
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          aria-label="Galería interactiva de platillos con tofu"
        >
          <div
            className={plateStageClass}
            onPointerDown={() => pauseAutoPlay()}
            onPointerUp={resumeAutoPlay}
            onPointerCancel={resumeAutoPlay}
          >

            <AnimatePresence mode="wait">
              <motion.div
                key={activePlate.id}
                className="relative"
                animate={
                  reducedMotion
                    ? undefined
                    : { y: [0, -10, 0] }
                }
                transition={
                  reducedMotion
                    ? undefined
                    : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <motion.button
                  type="button"
                  onClick={handleBreakPlate}
                  onKeyDown={handlePlateKeyDown}
                  onFocus={() => pauseAutoPlay(5200)}
                  onBlur={resumeAutoPlay}
                  drag={reducedMotion ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={handlePlateDragEnd}
                  aria-label={`Platillo interactivo: ${activePlate.label}. Toca para quebrarlo, desliza para cambiar o usa flechas del teclado.`}
                  className={`${activePlate.size} ${activePlate.tilt} ${activePlate.base} group relative cursor-grab overflow-visible shadow-none focus:outline-none focus-visible:outline-none will-change-transform active:cursor-grabbing`}
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
                  <img
                    src={activePlate.image}
                    alt={`Platillo preparado con Empátika: ${activePlate.label}`}
                    className="plate-outline absolute inset-0 z-10 h-full w-full object-cover"
                    loading="eager"
                  />
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
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
                </div>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 lg:block">
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
