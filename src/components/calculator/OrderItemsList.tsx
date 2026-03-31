/**
 * Subcomponente: Lista de items del pedido con controles de cantidad
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash2, Package } from 'lucide-react';
import type { OrderItemWithId } from '@/hooks/use-order-calculator';

interface OrderItemsListProps {
  items: OrderItemWithId[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export const OrderItemsList = ({ items, onUpdateQuantity, onRemoveItem }: OrderItemsListProps) => {
  return (
    <AnimatePresence mode="popLayout">
      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center py-8 text-muted-foreground mb-6"
        >
          <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm">Aún no has agregado productos</p>
        </motion.div>
      ) : (
        <>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 mb-6">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 p-3 bg-muted/50 border-2 border-foreground/20 hover:border-foreground/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(item.product.weight * item.quantity).toFixed(2)} kg
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 border-2"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    aria-label={`Reducir cantidad de ${item.product.name}`}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>

                  <span className="w-7 text-center font-bold font-display text-sm" aria-label={`Cantidad: ${item.quantity}`}>
                    {item.quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 border-2"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    aria-label={`Aumentar cantidad de ${item.product.name}`}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Eliminar ${item.product.name} del pedido`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Separador visual */}
          <div className="border-t-2 border-foreground/20 my-6"></div>
        </>
      )}
    </AnimatePresence>
  );
};
