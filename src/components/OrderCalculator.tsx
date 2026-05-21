/**
 * Componente: Calculadora de Pedidos
 * Orquestador que compone ProductSelector, OrderItemsList y OrderSummary
 * Ahora usa OrderContext para estado compartido con ProductsSection y FloatingCart.
 */

import { motion } from 'framer-motion';
import { useOrderContext } from '@/hooks/OrderContext';
import { useOrderSubmit } from '@/hooks/use-order-submit';
import { ProductSelector } from '@/components/calculator/ProductSelector';
import { OrderSummary } from '@/components/calculator/OrderSummary';
import type { CalculatorDensity } from '@/components/calculator/types';
import { withBaseUrl } from '@/lib/base-url';

const calculatorTofuchos = [
  { src: withBaseUrl("tofuchos/tofucho pensando.png"), position: "top-12 left-4 xl:left-12", size: "w-20 h-20 xl:w-24 xl:h-24", animation: { y: [0, -8, 0], rotate: [-3, 3, -3] } },
  { src: withBaseUrl("tofuchos/tofucho sorprendido.png"), position: "bottom-12 right-4 xl:right-12", size: "w-16 h-16 xl:w-20 xl:h-20", animation: { y: [0, -10, 0], scale: [1, 1.02, 1] } },
];

type OrderCalculatorVariant = 'standalone' | 'embedded';
type OrderCalculatorLayout = 'split' | 'stacked';

interface OrderCalculatorProps {
  variant?: OrderCalculatorVariant;
  showSummary?: boolean;
  layout?: OrderCalculatorLayout;
  containerClassName?: string;
  showDecorations?: boolean;
  hideCta?: boolean;
}

const sharedSelectorProps = (
  ctx: ReturnType<typeof useOrderContext>,
  density: CalculatorDensity
) => ({
  deliveryZone: ctx.deliveryZone,
  deliveryMethod: ctx.deliveryMethod,
  customerName: ctx.customerName,
  customerPhone: ctx.customerPhone,
  pickupPoint: ctx.pickupPoint,
  pickupSlot: ctx.pickupSlot,
  deliveryLocationLink: ctx.deliveryLocationLink,
  onZoneChange: ctx.setDeliveryZone,
  onMethodChange: ctx.setDeliveryMethod,
  onCustomerNameChange: ctx.setCustomerName,
  onCustomerPhoneChange: ctx.setCustomerPhone,
  onPickupPointChange: ctx.setPickupPoint,
  onPickupSlotChange: ctx.setPickupSlot,
  onDeliveryLocationChange: ctx.setDeliveryLocationLink,
  density,
});

const sharedSummaryProps = (
  ctx: ReturnType<typeof useOrderContext>,
  handleCalculate: () => void,
  density: CalculatorDensity,
  hideCta?: boolean
) => ({
  items: ctx.items,
  validation: ctx.validation,
  subtotal: ctx.subtotal,
  shippingCost: ctx.shippingCost,
  totalWithShipping: ctx.totalWithShipping,
  freeShippingThreshold: ctx.freeShippingThreshold,
  deliveryZone: ctx.deliveryZone,
  deliveryMethod: ctx.deliveryMethod,
  pickupPoint: ctx.pickupPoint,
  pickupSlot: ctx.pickupSlot,
  deliveryLocation: ctx.deliveryLocationLink,
  customerName: ctx.customerName,
  customerPhone: ctx.customerPhone,
  products: ctx.products,
  onCalculate: handleCalculate,
  onUpdateQuantity: ctx.updateItemQuantity,
  onRemoveItem: ctx.removeItem,
  onClearOrder: ctx.clearOrder,
  density,
  hideCta,
});

export const OrderCalculator = ({
  variant = 'standalone',
  showSummary = true,
  layout = 'split',
  containerClassName,
  showDecorations = true,
  hideCta = false,
}: OrderCalculatorProps) => {
  const ctx = useOrderContext();
  const { handleCalculate } = useOrderSubmit();
  const isCompact = variant === 'embedded' && layout === 'stacked';
  const density: CalculatorDensity = isCompact ? 'compact' : 'default';
  const stackGap = isCompact ? 'space-y-4' : 'space-y-6';

  const productSelector = <ProductSelector {...sharedSelectorProps(ctx, density)} />;
  const orderSummary = showSummary ? (
    <OrderSummary {...sharedSummaryProps(ctx, handleCalculate, density, hideCta)} />
  ) : null;

  const content = (
    <div className={`max-w-5xl mx-auto ${containerClassName ?? ''}`.trim()}>
      {variant === 'standalone' && (
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6"
          >
            CALCULA TU <span className="inline-block bg-foreground text-background px-2">PEDIDO</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Envio $50 entre $0 y $399, y envio gratis desde $400. En CDMX solo pickup.
          </motion.p>
        </div>
      )}

      {layout === 'stacked' ? (
        <div className={stackGap}>
          {isCompact ? (
            <>
              {orderSummary}
              {productSelector}
            </>
          ) : (
            <>
              {productSelector}
              {orderSummary}
            </>
          )}
        </div>
      ) : (
        <div className={showSummary ? 'grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8' : 'grid lg:grid-cols-1 gap-8'}>
          <div className="space-y-6">{productSelector}</div>
          {orderSummary}
        </div>
      )}
    </div>
  );

  if (variant === 'embedded') {
    return (
      <div className="relative overflow-hidden">
        {showDecorations &&
          calculatorTofuchos.map((tofucho, index) => (
            <motion.div
              key={index}
              className={`absolute ${tofucho.position} z-10 hidden lg:block`}
              animate={tofucho.animation}
              transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={tofucho.src}
                alt=""
                aria-hidden="true"
                className={`${tofucho.size} object-contain opacity-70 drop-shadow-lg`}
              />
            </motion.div>
          ))}
        {isCompact ? content : <div className="container mx-auto px-4">{content}</div>}
      </div>
    );
  }

  return (
    <section id="calculadora" className="py-24 relative overflow-hidden bg-muted/30 bg-paper-texture">
      {showDecorations &&
        calculatorTofuchos.map((tofucho, index) => (
          <motion.div
            key={index}
            className={`absolute ${tofucho.position} z-10 hidden lg:block`}
            animate={tofucho.animation}
            transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src={tofucho.src}
              alt=""
              aria-hidden="true"
              className={`${tofucho.size} object-contain opacity-70 drop-shadow-lg`}
            />
          </motion.div>
        ))}

      <div className="container mx-auto px-4">{content}</div>
    </section>
  );
};
