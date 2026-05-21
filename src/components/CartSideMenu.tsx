/**
 * Side menu del carrito con formulario y resumen.
 */

import { X } from 'lucide-react';
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
import { OrderCalculator } from '@/components/OrderCalculator';
import { OrderSummaryCTA } from '@/components/calculator/OrderSummary';
import { useOrderContext } from '@/hooks/OrderContext';
import { useOrderSubmit } from '@/hooks/use-order-submit';

const CartSideMenu = () => {
  const {
    isCartOpen,
    setCartOpen,
    items,
    subtotal,
    shippingCost,
    freeShippingThreshold,
    deliveryZone,
    deliveryMethod,
  } = useOrderContext();
  const { handleCalculate } = useOrderSubmit();

  return (
    <Sheet open={isCartOpen && items.length > 0} onOpenChange={setCartOpen}>
      <SheetContent
        side="right"
        className="flex flex-col h-full w-full sm:max-w-md p-0 gap-0 overflow-hidden [&>button.absolute]:hidden"
      >
        <div className="flex items-center justify-between gap-3 border-b-4 border-foreground px-4 py-3 shrink-0 bg-background">
          <h2 className="font-display text-lg sm:text-xl tracking-tight">TU CARRITO</h2>
          <SheetClose
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 font-display text-sm uppercase border-[3px] border-foreground bg-foreground text-background shadow-brutal transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg opacity-100 static rounded-none ring-0 focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5 shrink-0" strokeWidth={2.5} />
            <span>Cerrar</span>
          </SheetClose>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0">
          <OrderCalculator
            variant="embedded"
            layout="stacked"
            showSummary
            hideCta
            containerClassName="max-w-none"
            showDecorations={false}
          />
        </div>

        <OrderSummaryCTA
          items={items}
          subtotal={subtotal}
          shippingCost={shippingCost}
          freeShippingThreshold={freeShippingThreshold}
          deliveryZone={deliveryZone}
          deliveryMethod={deliveryMethod}
          onCalculate={handleCalculate}
          density="compact"
        />
      </SheetContent>
    </Sheet>
  );
};

export default CartSideMenu;
