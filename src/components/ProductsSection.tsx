import { motion } from "framer-motion";

const products = [
  {
    name: "Extra Firme",
    variant: "extra-firme" as const,
    description: "Perfecto para freír, asar o saltear. Su textura firme mantiene la forma.",
    weight: "400g | 1 kg",
    protein: "8g",
    color: "yellow" as const,
  },
  {
    name: "Ahumado",
    variant: "ahumado" as const,
    description: "Ahumado con madera de mezquite. Listo para comer.",
    weight: "400 g | 1 kg",
    protein: "8g",
    color: "orange" as const,
  },
  {
    name: "Veganesa",
    variant: "veganesa" as const,
    description: "Mayonesa vegana cremosa y deliciosa. Sin huevo, sin lácteos.",
    weight: "250 g | 500 g",
    protein: "0g",
    color: "yellow" as const,
  },
];

// Tofuchos para decorar la sección de productos - posiciones en los bordes
const productTofuchos = [
  { src: "/tofuchos/tofucho riendo.png", position: "bottom-8 left-4 xl:left-12", size: "w-16 h-16 xl:w-20 xl:h-20", animation: { y: [0, -8, 0], rotate: [-3, 3, -3] } },
  { src: "/tofuchos/tofucho sorprendido.png", position: "top-20 right-4 xl:right-12", size: "w-14 h-14 xl:w-18 xl:h-18", animation: { y: [0, -10, 0], scale: [1, 1.02, 1] } },
];

// Tofuchos para mobile - más grandes y distribuidos
const productMobileTofuchos = [
  { src: "/tofuchos/tofucho ahumado.png", position: "top-8 right-4", size: "w-24 h-24", animation: { y: [0, -8, 0], rotate: [-3, 3, -3] } },
  { src: "/tofuchos/tofucho riendo.png", position: "bottom-8 right-4", size: "w-30 h-30", animation: { y: [0, -10, 0] } },
];

const ProductsSection = () => {
  return (
    <section id="productos" className="py-24 relative overflow-hidden bg-muted/30 bg-paper-texture">
      {/* Tofuchos decorativos flotantes - Desktop */}
      {productTofuchos.map((tofucho, index) => (
        <motion.div
          key={index}
          className={`absolute ${tofucho.position} z-10 hidden lg:block`}
          animate={tofucho.animation}
          transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
        >
          <img 
            src={tofucho.src} 
            alt="Tofucho decorativo" 
            className={`${tofucho.size} object-contain opacity-80 drop-shadow-lg`}
          />
        </motion.div>
      ))}

      {/* Tofuchos decorativos flotantes - Mobile */}
      {productMobileTofuchos.map((tofucho, index) => (
        <motion.div
          key={`mobile-${index}`}
          className={`absolute ${tofucho.position} z-40 lg:hidden`}
          animate={tofucho.animation}
          transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <img 
            src={tofucho.src} 
            alt="Tofucho decorativo" 
            className={`${tofucho.size} object-contain drop-shadow-lg`}
          />
        </motion.div>
      ))}
      <div className="container mx-auto px-4">
        {/* Section Header - Unified */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-dymo text-xs mb-6 inline-block"
          >
            Tofu artesanal mexicano
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6"
          >
            SOMOS MÁS QUE <span className="inline-block bg-primary text-foreground px-2">TOFU</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-sm sm:text-base leading-relaxed text-muted-foreground max-w-xl mx-auto mb-6"
          >
            Somos una empresa mexicana que nació para demostrar que la proteína vegetal puede ser deliciosa.
          </motion.p>

          {/* Values - Compact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            <span className="sticker bg-background text-xs sm:text-sm">🌱 100% Vegano</span>
            <span className="sticker bg-background text-xs sm:text-sm" style={{ transform: "rotate(1deg)" }}>
              🇲🇽 Hecho en México
            </span>
            <span className="sticker bg-background text-xs sm:text-sm" style={{ transform: "rotate(-1deg)" }}>
              💪 Alto en proteína
            </span>
            <span className="sticker bg-background text-xs sm:text-sm" style={{ transform: "rotate(2deg)" }}>
              ❤️ Artesanal
            </span>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="relative grid md:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto px-4">
          {products.map((product, index) => {
            const bgColor = 
              product.color === "yellow" ? "bg-primary" : 
              product.color === "orange" ? "bg-secondary" : 
              "bg-cream";
            
            const buttonClass = 
              product.color === "yellow" ? "btn-brutal text-sm" : 
              product.color === "orange" ? "btn-brutal-orange text-sm" :
              "btn-brutal text-sm";
            
            const rotations = ["-2deg", "1.5deg", "-1deg"];
            const scales = [1, 1.05, 0.98];
            const zIndexes = [10, 20, 15];
            
            return (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: rotations[index] }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-background border-4 border-foreground shadow-brutal p-6 relative"
                style={{ 
                  transform: `rotate(${rotations[index]}) scale(${scales[index]})`,
                  zIndex: zIndexes[index]
                }}
              >
                {/* Product Image */}
                <div className="relative aspect-square mb-4 bg-muted/20 border-2 border-foreground overflow-hidden">
                  <img
                    src={`/productos/${product.variant}.jpg`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-muted">
                    <span className="text-6xl">📦</span>
                  </div>
                </div>

                {/* Product Title */}
                <h3 className="font-display text-3xl mb-2">
                  {product.variant === "veganesa" ? (
                    <span className={`inline-block ${bgColor} text-foreground px-2`}>
                      {product.name}
                    </span>
                  ) : (
                    <>
                      Tofu{" "}
                      <span className={`inline-block ${bgColor} text-foreground px-2`}>
                        {product.name}
                      </span>
                    </>
                  )}
                </h3>
                
                {/* Description */}
                <p className="font-body text-sm text-muted-foreground mb-4 min-h-[40px]">
                  {product.description}
                </p>

                {/* Specs - Minimalist */}
                <div className="flex gap-3 mb-6 text-xs font-body">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 bg-foreground"></span>
                    {product.weight}
                  </span>
                  {product.protein !== "0g" && (
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 bg-foreground"></span>
                      {product.protein} proteína
                    </span>
                  )}
                </div>

                {/* CTA */}
                <a
                  href="#distribuidores"
                  className={buttonClass}
                >
                  Comprar
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
