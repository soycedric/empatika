import { motion } from "framer-motion";
import { toast } from 'sonner';
import { useOrderContext } from '@/hooks/OrderContext';
import { ShoppingCart } from 'lucide-react';

const products = [
  {
    name: "Extra Firme",
    variant: "extra-firme" as const,
    description: "Perfecto para freír, asar o saltear. Su textura firme mantiene la forma.",
    weight: "400g | 1 kg",
    protein: "8g",
    color: "yellow" as const,
    macros: {
      calorias: "110 kcal",
      proteina: "13 g",
      grasa: "7 g",
      carbohidratos: "<1 g",
      sodio: "10 mg",
    },
    ingredientes: "Agua, Soya, Cloruro de magnesio.",
  },
  {
    name: "Ahumado",
    variant: "ahumado" as const,
    description: "Nuestro famoso tofu, pero ahumado. Listo para comer.",
    weight: "400 g | 1 kg",
    protein: "8g",
    color: "orange" as const,
    macros: {
      calorias: "110 kcal",
      proteina: "13 g",
      grasa: "7 g",
      carbohidratos: "<1 g",
      sodio: "15 mg",
    },
    ingredientes: "Agua, Soya, Cloruro de magnesio, Humo natural.",
  },
  {
    name: "Veganesa",
    variant: "veganesa" as const,
    description: "Mayonesa vegana cremosa y deliciosa. Sin huevo, sin lácteos.",
    weight: "500 g",
    protein: "0g",
    color: "yellow" as const,
    macros: {
      calorias: "90 kcal",
      proteina: "0 g",
      grasa: "8 g",
      carbohidratos: "3 g",
      sodio: "120 mg",
    },
    ingredientes: "Aceite vegetal, Agua, Vinagre, Sal, Mostaza.",
  },
];

const ProductsSection = () => {
  const { addItem } = useOrderContext();

  const handleAddToCart = (variant: string) => {
    // Map product card variants to catalog product IDs (prefer 400g)
    const variantToId: Record<string, string> = {
      'extra-firme': 'tofu-extra-firme-400g',
      'ahumado': 'tofu-ahumado-400g',
      'veganesa': 'veganesa-500g',
    };
    const productId = variantToId[variant];
    if (productId) {
      addItem(productId, 1);
      const product = products.find(p => p.variant === variant);
      toast.success('¡Agregado al pedido!', {
        description: `${product?.name ?? variant} añadido`,
      });
    }
  };

  return (
    <section id="productos" className="py-24 relative overflow-hidden bg-muted/30 bg-paper-texture">
      <div className="container mx-auto px-4">
        {/* Section Header */}
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
            SOMOS MÁS QUE <span className="inline-block bg-foreground text-background px-2">TOFU</span>
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
            <span className="border-2 border-foreground font-body text-xs px-3 py-1.5 uppercase tracking-wider">🌱 100% Vegano</span>
            <span className="border-2 border-foreground font-body text-xs px-3 py-1.5 uppercase tracking-wider" style={{ transform: "rotate(1deg)" }}>
              🇲🇽 Hecho en México
            </span>
            <span className="border-2 border-foreground font-body text-xs px-3 py-1.5 uppercase tracking-wider" style={{ transform: "rotate(-1deg)" }}>
              💪 Alto en proteína
            </span>
            <span className="border-2 border-foreground font-body text-xs px-3 py-1.5 uppercase tracking-wider" style={{ transform: "rotate(2deg)" }}>
              ❤️ Artesanal
            </span>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="relative grid md:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto px-4">
          {products.map((product, index) => {
            const bgColor = "bg-foreground";
            const textColor = "text-background";

            const buttonClass = "inline-flex items-center justify-center px-6 py-3 font-display text-sm uppercase border-[3px] border-foreground bg-foreground text-background cursor-pointer shadow-brutal transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg";

            const rotations = ["-0.5deg", "0.3deg", "-0.2deg"];

            return (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: rotations[index] }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-background border-[3px] border-foreground shadow-brutal relative diagonal-stripe"
                style={{ transform: `rotate(${rotations[index]})` }}
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-muted/20 border-b-[3px] border-foreground overflow-hidden">
                  <img
                    src={`/productos/${product.variant}.jpg`}
                    alt={product.name}
                    className="w-full h-full object-cover relative z-[1]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-muted">
                    <span className="text-6xl">📦</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 relative z-[1]">
                  {/* Product Title */}
                  <h3 className="font-display text-2xl sm:text-3xl mb-2">
                    {product.variant === "veganesa" ? (
                      <span className={`inline-block ${bgColor} ${textColor} px-2`}>
                        {product.name}
                      </span>
                    ) : (
                      <>
                        Tofu{" "}
                        <span className={`inline-block ${bgColor} ${textColor} px-2`}>
                          {product.name}
                        </span>
                      </>
                    )}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm text-muted-foreground mb-4 min-h-[40px]">
                    {product.description}
                  </p>

                  {/* Macro Badges — aggressive black blocks */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="border-2 border-foreground font-body text-xs uppercase tracking-wider px-3 py-1.5">
                      📦 {product.weight}
                    </span>
                    {product.protein !== "0g" && (
                      <span className="border-2 border-foreground font-body text-xs uppercase tracking-wider px-3 py-1.5">
                        💪 {product.protein} proteína
                      </span>
                    )}
                  </div>

                  {/* Declaración Nutrimental — label style */}
                  <div className="label-nutrimental">
                    <div className="label-header">Declaración Nutrimental</div>
                    <p className="text-[10px] text-background/60 mb-2 font-body">
                      Por 100g
                    </p>
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td>Calorías</td>
                          <td className="text-right font-bold">{product.macros.calorias}</td>
                        </tr>
                        <tr>
                          <td>Proteína</td>
                          <td className="text-right font-bold">{product.macros.proteina}</td>
                        </tr>
                        <tr>
                          <td>Grasa</td>
                          <td className="text-right font-bold">{product.macros.grasa}</td>
                        </tr>
                        <tr>
                          <td>Carbohidratos</td>
                          <td className="text-right font-bold">{product.macros.carbohidratos}</td>
                        </tr>
                        <tr>
                          <td>Sodio</td>
                          <td className="text-right font-bold">{product.macros.sodio}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Ingredientes */}
                  <p className="font-body text-[10px] text-muted-foreground mt-3 italic">
                    Ingredientes: {product.ingredientes}
                  </p>

                  {/* CTAs */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleAddToCart(product.variant)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 font-display text-sm uppercase border-[3px] border-foreground bg-foreground text-background cursor-pointer shadow-brutal transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Agregar
                    </button>
                    <a
                      href="#calculadora"
                      className="inline-flex items-center justify-center px-4 py-3 font-display text-sm uppercase border-[3px] border-foreground bg-transparent text-foreground cursor-pointer transition-all duration-150 hover:bg-foreground/5"
                    >
                      Ver pedido
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
