/**
 * Sidebar con resumen de pedido para la seccion de productos.
 */

import { OrderSummary } from '@/components/calculator/OrderSummary';
import { useOrderContext } from '@/contexts/OrderContext';
import { useOrderSubmit } from '@/hooks/use-order-submit';

const OrderSidebar = () => {
  const {
    items,
    validation,
    subtotal,
    shippingCost,
    totalWithShipping,
    freeShippingThreshold,
    deliveryZone,
    deliveryMethod,
    pickupPoint,
    pickupSlot,
    deliveryLocationLink,
    customerName,
    customerPhone,
    products,
    updateItemQuantity,
    removeItem,
    clearOrder,
  } = useOrderContext();
  const { handleCalculate } = useOrderSubmit();

  return (
    <aside className="lg:sticky lg:top-24">
      <OrderSummary
        items={items}
        validation={validation}
        subtotal={subtotal}
        shippingCost={shippingCost}
        totalWithShipping={totalWithShipping}
        freeShippingThreshold={freeShippingThreshold}
        deliveryZone={deliveryZone}
        deliveryMethod={deliveryMethod}
        pickupPoint={pickupPoint}
        pickupSlot={pickupSlot}
        deliveryLocation={deliveryLocationLink}
        customerName={customerName}
        customerPhone={customerPhone}
        products={products}
        onCalculate={handleCalculate}
        onUpdateQuantity={updateItemQuantity}
        onRemoveItem={removeItem}
        onClearOrder={clearOrder}
      />
    </aside>
  );
};

export default OrderSidebar;
