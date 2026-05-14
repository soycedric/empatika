import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from 'sonner';
import { useOrderContext } from '@/hooks/OrderContext';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { withBaseUrl } from '@/lib/base-url';

const products = [
  {
    name: "Extra Firme",
    variant: "extra-firme" as const,
    description: "Perfecto para freír, asar o saltear.",
    weight: "400 g | 1 kg",
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
    sizes: [
      { id: 'tofu-extra-firme-400g', label: '400 g', price: 75 },
      { id: 'tofu-extra-firme-1kg', label: '1 kg', price: 150 }
    ]
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
    ingredientes: "Agua, Soya, Cloruro de magnesio, Humo líquido.",
    sizes: [
      { id: 'tofu-ahumado-400g', label: '400 g', price: 75 },
      { id: 'tofu-ahumado-1kg', label: '1 kg', price: 150 }
    ]
  },
  {
    name: "Veganesa",
    variant: "veganesa" as const,
    description: "Mayonesa vegana cremosa y deliciosa. Sin huevo, sin lácteos.",
    weight: "250 ml | 500 ml",
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
    sizes: [
      { id: 'veganesa-250g', label: '250 ml', price: 75 },
      { id: 'veganesa-500g', label: '500 ml', price: 140 }
    ]
  },
];

type ProductsSectionVariant = 'standalone' | 'embedded';

interface ProductsSectionProps {
  variant?: ProductsSectionVariant;
}

const ProductsSection = ({ variant = 'standalone' }: ProductsSectionProps) => {
  const { addItem } = useOrderContext();
  const [selections, setSelections] = useState(() => ({
    'extra-firme': { sizeId: 'tofu-extra-firme-400g', quantity: 1 },
    'ahumado': { sizeId: 'tofu-ahumado-400g', quantity: 1 },
    'veganesa': { sizeId: 'veganesa-250g', quantity: 1 },
  }));

  const selectionMap = useMemo(() => {
    return products.reduce<Record<string, { sizeId: string; quantity: number }>>((acc, product) => {
      acc[product.variant] = selections[product.variant] ?? { sizeId: product.sizes[0].id, quantity: 1 };
      return acc;
    }, {});
  }, [selections]);

  const handleSizeChange = (variant: string, sizeId: string) => {
    setSelections(current => ({
      ...current,
      [variant]: {
        ...current[variant],
        sizeId
      }
    }));
  };

  const handleQuantityChange = (variant: string, delta: number) => {
    setSelections(current => {
      const currentQty = current[variant]?.quantity ?? 1;
      const nextQty = Math.max(1, currentQty + delta);
      return {
        ...current,
        [variant]: {
          ...current[variant],
          quantity: nextQty
        }
      };
    });
  };

  const handleAddToCart = (variant: string) => {
    const product = products.find(p => p.variant === variant);
    const selection = selectionMap[variant];
    if (!product || !selection) return;

    addItem(selection.sizeId, selection.quantity);

    const size = product.sizes.find(sizeOption => sizeOption.id === selection.sizeId);
    const sizeLabel = size ? `${size.label} - $${size.price}` : selection.sizeId;
    toast.success('¡Agregado al pedido!', {
      description: `${product.name} (${sizeLabel}) x${selection.quantity}`,
    });
  };

  const productGrid = (
    <div className="relative grid md:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto px-4">
      {products.map((product, index) => {
        const bgColor = "bg-foreground";
        const textColor = "text-background";

        const rotations = ["-0.5deg", "0.3deg", "-0.2deg"];
        const selection = selectionMap[product.variant];
        const selectedSize = product.sizes.find(sizeOption => sizeOption.id === selection.sizeId) ?? product.sizes[0];
        const lineTotal = selectedSize.price * selection.quantity;

        return (
          <motion.article
            key={product.name}
            initial={{ opacity: 0, y: 50, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: rotations[index] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="bg-background border-[3px] border-foreground shadow-brutal relative"
            style={{ transform: `rotate(${rotations[index]})` }}
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-muted/20 border-b-[3px] border-foreground overflow-hidden">
              <img
                src={withBaseUrl(`productos/${product.variant}.jpg`)}
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

              {/* Size selector */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.sizes.map(sizeOption => (
                  <button
                    key={sizeOption.id}
                    type="button"
                    onClick={() => handleSizeChange(product.variant, sizeOption.id)}
                    className={`border-2 border-foreground px-3 py-1.5 text-xs font-display uppercase tracking-wider transition-colors ${selection.sizeId === sizeOption.id
                      ? 'bg-foreground text-background'
                      : 'bg-background text-foreground'
                      }`}
                    aria-pressed={selection.sizeId === sizeOption.id}
                  >
                    {sizeOption.label} · ${sizeOption.price}
                  </button>
                ))}
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-3 mb-4">
                <button
                  type="button"
                  className="h-9 w-9 border-2 border-foreground flex items-center justify-center"
                  onClick={() => handleQuantityChange(product.variant, -1)}
                  aria-label={`Reducir cantidad de ${product.name}`}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-display text-base w-8 text-center">
                  {selection.quantity}
                </span>
                <button
                  type="button"
                  className="h-9 w-9 border-2 border-foreground flex items-center justify-center"
                  onClick={() => handleQuantityChange(product.variant, 1)}
                  aria-label={`Aumentar cantidad de ${product.name}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-xs text-muted-foreground">
                  Total: ${lineTotal}
                </span>
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
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );

  if (variant === 'embedded') {
    return (
      <div className="space-y-8">
        {productGrid}
      </div>
    );
  }

  return (
    <section id="productos" className="py-24 relative overflow-hidden bg-muted/30 bg-paper-texture">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6"
          >
            SOMOS MAS QUE <span className="inline-block bg-foreground text-background px-2">TOFU</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-sm sm:text-base leading-relaxed text-muted-foreground max-w-xl mx-auto mb-6"
          >
            Somos una empresa mexicana que nacio para demostrar que la proteina vegetal puede ser deliciosa.
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
              🇲🇽 Hecho en Mexico
            </span>
            <span className="border-2 border-foreground font-body text-xs px-3 py-1.5 uppercase tracking-wider" style={{ transform: "rotate(-1deg)" }}>
              💪 Alto en proteina
            </span>
            <span className="border-2 border-foreground font-body text-xs px-3 py-1.5 uppercase tracking-wider" style={{ transform: "rotate(2deg)" }}>
              ❤️ Artesanal
            </span>
          </motion.div>
        </div>

        {/* Products Grid */}
        {productGrid}
      </div>
    </section>
  );
};

export default ProductsSection;
