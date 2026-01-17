import { motion } from "framer-motion";

const products = [
  {
    name: "Extra Firme",
    variant: "extra-firme" as const,
    description: "Perfecto para freír, asar o saltear. Su textura firme mantiene la forma.",
    weight: "400g",
    protein: "8g",
  },
  {
    name: "Ahumado",
    variant: "ahumado" as const,
    description: "Ahumado con madera de mezquite. Listo para comer.",
    weight: "400g",
    protein: "8g",
  },
];

const ProductsSection = () => {
  return (
    <section id="productos" className="py-24 relative overflow-hidden bg-muted/30">
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
            SOMOS MÁS QUE <span className="text-highlight-yellow">TOFU</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-sm sm:text-base leading-relaxed text-muted-foreground max-w-xl mx-auto mb-6"
          >
            Somos una empresa mexicana que nació para demostrar que la proteína vegetal puede ser deliciosa. 
            Dos perfiles artesanales sin conservadores, listos para plancha o sandwich.
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
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
          {products.map((product, index) => {
            const isYellow = product.variant === "extra-firme";
            
            return (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="card-brutal bg-background"
              >
                {/* Product Image with Tofucho */}
                <div className="relative aspect-[4/3] mb-4 bg-muted/20 border-4 border-foreground overflow-hidden">
                  <div className="absolute top-3 left-3 text-dymo text-[10px] z-10">
                    {product.variant === "extra-firme" ? "Extra Firme" : "Ahumado"}
                  </div>
                  <motion.img
                    src={product.variant === "extra-firme" ? "/tofuchos/tofucho_fuerte.svg" : "/tofuchos/tofucho_ahumado.svg"}
                    alt={`Tofucho ${product.name}`}
                    className="w-full h-full object-contain p-4"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="font-display text-2xl">
                    Tofu {" "}
                    <span className={isYellow ? "text-highlight-yellow" : "text-highlight-orange"}>
                      {product.name}
                    </span>
                  </h3>
                  
                  <p className="font-body text-sm text-muted-foreground">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div className="flex gap-2 pt-2 flex-wrap">
                    <span className="sticker bg-muted text-xs" style={{ transform: "rotate(0deg)" }}>📦 {product.weight}</span>
                    <span className="sticker bg-primary text-xs" style={{ transform: "rotate(-1deg)" }}>💪 {product.protein}</span>
                    <span className="sticker bg-background text-xs" style={{ transform: "rotate(1deg)" }}>Sin conservadores</span>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 pt-3">
                    <a
                      href={`https://wa.me/522215606205?text=Quiero%20comprar%20Tofu%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={isYellow ? "btn-brutal text-sm" : "btn-brutal-orange text-sm"}
                    >
                      Comprar
                    </a>
                    <a
                      href={`https://wa.me/522215606205?text=Quiero%20probar%20Tofu%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 border-2 border-foreground font-body text-xs tracking-wide hover:bg-primary/20 transition-colors"
                    >
                      Quiero probar
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
