/**
 * Side menu del carrito con formulario y resumen.
 */

import { Sheet, SheetContent } from '@/components/ui/sheet';
import { OrderCalculator } from '@/components/OrderCalculator';
import { useOrderContext } from '@/hooks/OrderContext';

const CartSideMenu = () => {
  const { isCartOpen, setCartOpen, items } = useOrderContext();

  return (
    <Sheet open={isCartOpen && items.length > 0} onOpenChange={setCartOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md px-4 pb-4 pt-12 sm:px-5 sm:pb-5 sm:pt-12"
        closeClassName="bg-foreground text-primary hover:bg-foreground hover:text-primary focus:ring-primary"
      >
        <div className="h-full overflow-y-auto side-menu-scroll pr-1">
          <OrderCalculator
            variant="embedded"
            layout="stacked"
            showSummary
            containerClassName="max-w-none"
            showDecorations={false}
            density="compact"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSideMenu;
