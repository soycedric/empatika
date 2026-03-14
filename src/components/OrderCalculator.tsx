/**
 * Componente: Calculadora de Pedidos
 * Orquestador que compone ProductSelector, OrderItemsList y OrderSummary
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useOrderCalculator } from '@/hooks/use-order-calculator';
import { Button } from '@/components/ui/button';
import { Package, Trash2 } from 'lucide-react';
import { getProductById } from '@/data/products';
import { ProductSelector } from '@/components/calculator/ProductSelector';
import { OrderItemsList } from '@/components/calculator/OrderItemsList';
import { OrderSummary } from '@/components/calculator/OrderSummary';

type DeliveryZone = 'puebla' | 'cdmx';

const DELIVERY_ZONES: Record<DeliveryZone, string> = {
  puebla: 'Puebla',
  cdmx: 'Ciudad de México'
};

const CDMX_PICKUP_POINTS = [
  'Parque Delta',
  'Plaza Universidad',
  'Oasis Coyacán',
  'Biblioteca Central UNAM'
];

// Tofuchos para decorar la calculadora
const calculatorTofuchos = [
  { src: "/tofuchos/tofucho pensando.png", position: "top-12 left-4 xl:left-12", size: "w-20 h-20 xl:w-24 xl:h-24", animation: { y: [0, -8, 0], rotate: [-3, 3, -3] } },
  { src: "/tofuchos/tofucho sorprendido.png", position: "bottom-12 right-4 xl:right-12", size: "w-16 h-16 xl:w-20 xl:h-20", animation: { y: [0, -10, 0], scale: [1, 1.02, 1] } },
];

export const OrderCalculator = () => {
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>('puebla');

  const {
    items,
    products,
    totalVolume,
    validation,
    remainingVolume,
    minimumVolume,
    addItem,
    updateItemQuantity,
    removeItem,
    clearOrder
  } = useOrderCalculator(deliveryZone);

  const handleAddProduct = (productId: string) => {
    const product = getProductById(productId);
    addItem(productId, 1);
    if (product) {
      toast.success('Producto agregado', {
        description: `${product.name} (${product.weight} kg) añadido al pedido`,
      });
    }
  };

  const handleCalculate = () => {
    if (validation.shouldRedirectToDistributors) {
      document.getElementById('distribuidores')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const phoneNumber = '522213089090';
      const sanitize = (text: string) => text.replace(/[<>"'&]/g, '');

      const lines: string[] = [];
      lines.push(deliveryZone === 'puebla'
        ? 'Hola! Quiero hacer un pedido con envio gratis:'
        : 'Hola! Quiero hacer un pedido para recoger en CDMX:');
      lines.push('');
      lines.push(`Zona: ${sanitize(DELIVERY_ZONES[deliveryZone])}`);

      if (deliveryZone === 'cdmx') {
        lines.push('');
        lines.push('Puntos de recogida disponibles:');
        CDMX_PICKUP_POINTS.forEach((point, i) => {
          lines.push(`${i + 1}. ${sanitize(point)}`);
        });
      }

      lines.push('');
      lines.push(`Total: ${totalVolume.toFixed(2)} kg`);
      lines.push('');
      lines.push('Productos:');

      items.forEach((item, i) => {
        const weight = (item.product.weight * item.quantity).toFixed(2);
        lines.push(`${i + 1}. ${sanitize(item.product.name)} (${item.product.weight}kg) x${item.quantity} = ${weight}kg`);
      });

      const encodedMessage = encodeURIComponent(lines.join('\n'));
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="calculadora" className="py-24 relative overflow-hidden bg-muted/30 bg-paper-texture">
      {/* Tofuchos decorativos flotantes */}
      {calculatorTofuchos.map((tofucho, index) => (
        <motion.div
          key={index}
          className={`absolute ${tofucho.position} z-10 hidden lg:block`}
          animate={tofucho.animation}
          transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={tofucho.src}
            alt=""
            aria-hidden="true"
            className={`${tofucho.size} object-contain opacity-70 drop-shadow-lg`}
          />
        </motion.div>
      ))}

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6"
            >
              CALCULA TU <span className="inline-block bg-primary text-foreground px-2">PEDIDO</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Agrega productos y verifica si calificas para envío gratuito (Puebla) o recogida en puntos (CDMX). Mínimo 3 kg.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Panel Izquierdo: Selector + Lista de items */}
            <div className="space-y-6">
              <ProductSelector
                products={products}
                deliveryZone={deliveryZone}
                onZoneChange={setDeliveryZone}
                onAddProduct={handleAddProduct}
              />

              {/* Card de items del pedido */}
              <div className={`bg-background border-4 border-foreground shadow-brutal p-6 ${validation.isValid
                  ? 'bg-green-50 dark:bg-green-950/30'
                  : items.length === 0
                    ? ''
                    : 'bg-orange-50 dark:bg-orange-950/30'
                }`}>
                <div className="flex justify-between items-center pb-3 border-b-2 border-foreground/20 mb-6">
                  <h3 className="font-display text-2xl flex items-center gap-2">
                    <Package className="w-6 h-6" />
                    TU PEDIDO
                  </h3>
                  {items.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearOrder}
                      className="text-destructive hover:text-destructive border-2 border-destructive hover:bg-destructive/10"
                      aria-label="Vaciar pedido completo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <OrderItemsList
                  items={items}
                  onUpdateQuantity={updateItemQuantity}
                  onRemoveItem={removeItem}
                />
              </div>
            </div>

            {/* Panel Derecho: Resumen del Pedido */}
            <OrderSummary
              items={items}
              totalVolume={totalVolume}
              validation={validation}
              minimumVolume={minimumVolume}
              remainingVolume={remainingVolume}
              deliveryZone={deliveryZone}
              products={products}
              onCalculate={handleCalculate}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
