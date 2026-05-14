/**
 * Componente: Calculadora de Pedidos
 * Orquestador que compone ProductSelector, OrderItemsList y OrderSummary
 * Ahora usa OrderContext para estado compartido con ProductsSection y FloatingCart.
 */

import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useOrderContext } from '@/hooks/OrderContext';
import { Button } from '@/components/ui/button';
import { Package, Trash2 } from 'lucide-react';
import { getProductById } from '@/data/products';
import { ProductSelector } from '@/components/calculator/ProductSelector';
import { OrderItemsList } from '@/components/calculator/OrderItemsList';
import { OrderSummary } from '@/components/calculator/OrderSummary';
import { withBaseUrl } from '@/lib/base-url';

type DeliveryZone = 'puebla' | 'cdmx';

const DELIVERY_ZONES: Record<DeliveryZone, string> = {
  puebla: 'Puebla',
  cdmx: 'Ciudad de México'
};

// Tofuchos para decorar la calculadora
const calculatorTofuchos = [
  { src: withBaseUrl("tofuchos/tofucho pensando.png"), position: "top-12 left-4 xl:left-12", size: "w-20 h-20 xl:w-24 xl:h-24", animation: { y: [0, -8, 0], rotate: [-3, 3, -3] } },
  { src: withBaseUrl("tofuchos/tofucho sorprendido.png"), position: "bottom-12 right-4 xl:right-12", size: "w-16 h-16 xl:w-20 xl:h-20", animation: { y: [0, -10, 0], scale: [1, 1.02, 1] } },
];

type OrderCalculatorVariant = 'standalone' | 'embedded';

interface OrderCalculatorProps {
  variant?: OrderCalculatorVariant;
}

export const OrderCalculator = ({ variant = 'standalone' }: OrderCalculatorProps) => {
  const {
    items,
    products,
    totalVolume,
    validation,
    subtotal,
    shippingCost,
    totalWithShipping,
    minimumOrderAmount,
    freeShippingThreshold,
    deliveryZone,
    setDeliveryZone,
    deliveryMethod,
    setDeliveryMethod,
    customerName,
    customerPhone,
    setCustomerName,
    setCustomerPhone,
    providerInterest,
    setProviderInterest,
    pickupPoint,
    setPickupPoint,
    pickupSlot,
    setPickupSlot,
    deliveryLocationLink,
    setDeliveryLocationLink,
    addItem,
    updateItemQuantity,
    removeItem,
    clearOrder
  } = useOrderContext();

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
    const isPickup = deliveryZone === 'cdmx' || deliveryMethod === 'pickup';
    const hasContact = customerName.trim().length > 0 && customerPhone.trim().length > 0;
    const hasDeliveryLocation = deliveryLocationLink.trim().length > 0;
    const hasPickupInfo = pickupPoint.trim().length > 0 && pickupSlot.trim().length > 0;

    if (!hasContact) {
      toast.error('Faltan datos de contacto', {
        description: 'Agrega tu nombre y telefono para continuar.'
      });
      return;
    }

    if (!isPickup && !hasDeliveryLocation) {
      toast.error('Falta la ubicacion', {
        description: 'Pega tus coordenadas para envio.'
      });
      return;
    }

    if (isPickup && !hasPickupInfo) {
      toast.error('Falta el pickup', {
        description: 'Selecciona punto y horario para continuar.'
      });
      return;
    }
    if (isPickup && pickupPoint.trim().length === 0) {
      toast.error('Falta el punto de pickup', {
        description: 'Selecciona o escribe tu punto de pickup para continuar.'
      });
      return;
    }

    if (validation.shouldRedirectToDistributors) {
      document.getElementById('distribuidores')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const phoneNumber = '522213089090';
      const sanitize = (text: string) => text.replace(/[<>"'&]/g, '');

      const lines: string[] = [];
      lines.push(isPickup
        ? 'Hola! Quiero hacer un pedido para recoger:'
        : subtotal >= freeShippingThreshold
          ? 'Hola! Quiero hacer un pedido con envio gratis:'
          : `Hola! Quiero hacer un pedido con envio (costo $${shippingCost.toFixed(0)}):`);
      lines.push('');
      lines.push(`Cliente: ${sanitize(customerName)}`);
      lines.push(`Telefono: ${sanitize(customerPhone)}`);
      lines.push(`Interes proveedor: ${providerInterest ? 'Si' : 'No'}`);
      lines.push('');
      lines.push(`Zona: ${sanitize(DELIVERY_ZONES[deliveryZone])}`);

      lines.push(`Metodo: ${isPickup ? 'Pickup' : 'Envio'}`);

      if (isPickup) {
        lines.push('');
        lines.push(`Pickup: ${sanitize(pickupPoint)}`);
        lines.push(`Horario: ${sanitize(pickupSlot)}`);
      } else {
        lines.push('');
        lines.push(`Ubicacion: ${sanitize(deliveryLocationLink)}`);
      }

      lines.push('');
      lines.push(`Subtotal: $${subtotal.toFixed(0)} MXN`);
      lines.push(`Envio: $${shippingCost.toFixed(0)} MXN`);
      lines.push(`Total: $${totalWithShipping.toFixed(0)} MXN`);
      lines.push('');
      lines.push('Productos:');

      items.forEach((item, i) => {
        const weight = (item.product.weight * item.quantity).toFixed(2);
        const lineTotal = item.product.price * item.quantity;
        lines.push(`${i + 1}. ${sanitize(item.product.name)} (${item.product.weight}kg) x${item.quantity} = ${weight}kg - $${lineTotal}`);
      });

      const encodedMessage = encodeURIComponent(lines.join('\n'));
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    }
  };

  const content = (
    <div className="max-w-5xl mx-auto">
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
            Compra desde $150. Envio $50 entre $150 y $399, y envio gratis desde $400. En CDMX solo pickup.
          </motion.p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Panel Izquierdo: Selector + Lista de items */}
        <div className="space-y-6">
          <ProductSelector
            products={products}
            deliveryZone={deliveryZone}
            deliveryMethod={deliveryMethod}
            customerName={customerName}
            customerPhone={customerPhone}
            providerInterest={providerInterest}
            pickupPoint={pickupPoint}
            pickupSlot={pickupSlot}
            deliveryLocationLink={deliveryLocationLink}
            onZoneChange={setDeliveryZone}
            onMethodChange={setDeliveryMethod}
            onCustomerNameChange={setCustomerName}
            onCustomerPhoneChange={setCustomerPhone}
            onProviderInterestChange={setProviderInterest}
            onPickupPointChange={setPickupPoint}
            onPickupSlotChange={setPickupSlot}
            onDeliveryLocationChange={setDeliveryLocationLink}
            onAddProduct={handleAddProduct}
          />

          {/* Card de items del pedido */}
          <div className={`bg-background border-4 border-foreground shadow-brutal p-6`}>
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
          validation={validation}
          subtotal={subtotal}
          shippingCost={shippingCost}
          totalWithShipping={totalWithShipping}
          minimumOrderAmount={minimumOrderAmount}
          freeShippingThreshold={freeShippingThreshold}
          deliveryZone={deliveryZone}
          deliveryMethod={deliveryMethod}
            pickupPoint={pickupPoint}
            pickupSlot={pickupSlot}
            deliveryLocation={deliveryLocationLink}
            customerName={customerName}
            customerPhone={customerPhone}
            providerInterest={providerInterest}
          products={products}
          onCalculate={handleCalculate}
        />
      </div>
    </div>
  );

  if (variant === 'embedded') {
    return (
      <div className="relative overflow-hidden">
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
          {content}
        </div>
      </div>
    );
  }

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
        {content}
      </div>
    </section>
  );
};
