/**
 * Subcomponente: Lista de items del pedido con controles de cantidad
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash2, Package } from 'lucide-react';
import type { OrderItemWithId } from '@/hooks/use-order-calculator';
import type { CalculatorDensity } from '@/components/calculator/types';
import { isCompactDensity } from '@/components/calculator/types';

interface OrderItemsListProps {
  items: OrderItemWithId[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  density?: CalculatorDensity;
}

export const OrderItemsList = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  density = 'default',
}: OrderItemsListProps) => {
  const compact = isCompactDensity(density);

  return (
    <AnimatePresence mode="popLayout">
      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`text-center text-muted-foreground ${compact ? 'py-4 mb-2' : 'py-8 mb-6'}`}
        >
          <Package className={`mx-auto mb-2 opacity-20 ${compact ? 'w-8 h-8' : 'w-12 h-12 mb-3'}`} />
          <p className="text-sm">Aún no has agregado productos</p>
        </motion.div>
      ) : (
        <>
          <div
            className={`space-y-2 overflow-y-auto pr-2 ${compact ? 'max-h-[200px] mb-2' : 'max-h-[300px] mb-6'}`}
          >
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`flex items-center bg-muted/50 border-2 border-foreground/20 hover:border-foreground/50 transition-colors ${
                  compact ? 'gap-2 p-2' : 'gap-3 p-3'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} x ${item.product.price} = ${item.product.price * item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`border-2 ${compact ? 'h-6 w-6' : 'h-7 w-7'}`}
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    aria-label={`Reducir cantidad de ${item.product.name}`}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>

                  <span
                    className={`text-center font-bold font-display text-sm ${compact ? 'w-6' : 'w-7'}`}
                    aria-label={`Cantidad: ${item.quantity}`}
                  >
                    {item.quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    className={`border-2 ${compact ? 'h-6 w-6' : 'h-7 w-7'}`}
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    aria-label={`Aumentar cantidad de ${item.product.name}`}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className={`text-destructive hover:text-destructive hover:bg-destructive/10 ${
                      compact ? 'h-6 w-6' : 'h-7 w-7'
                    }`}
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Eliminar ${item.product.name} del pedido`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {!compact && <div className="border-t-2 border-foreground/20 my-6" />}
        </>
      )}
    </AnimatePresence>
  );
};
