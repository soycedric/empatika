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
    <section id="productos" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center space-y-3"
        >
          <span className="text-dymo text-xs inline-block">Nuestros productos</span>
          <h2 className="font-display text-4xl sm:text-5xl">
            <span className="text-highlight-yellow">Tofu</span> artesanal con actitud
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto">
            Dos perfiles inspirados en la etiqueta: Extra Firme (amarillo) y Ahumado (óxido). Sin conservadores, listo para plancha o sandwich.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
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
                {/* Product Image Placeholder */}
                <div className="placeholder-tile aspect-[4/3] mb-4">
                  <div className="absolute top-3 left-3 text-dymo text-[10px]">
                    {product.variant === "extra-firme" ? "Extra Firme" : "Ahumado"}
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-20 h-20 mx-auto border-2 border-dashed border-muted-foreground flex items-center justify-center bg-background/80">
                      <span className="text-3xl">🧊</span>
                    </div>
                    <p className="font-body text-xs text-muted-foreground">Render pendiente</p>
                  </div>
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
