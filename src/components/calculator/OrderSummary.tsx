/**
 * Subcomponente: Resumen del pedido con barra de progreso, sugerencia inteligente y CTAs
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, MessageCircle, MapPin, Lightbulb } from 'lucide-react';
import type { OrderItemWithId } from '@/hooks/use-order-calculator';
import type { ValidationResult, Product } from '@/types/order';

type DeliveryZone = 'puebla' | 'cdmx';
type DeliveryMethod = 'delivery' | 'pickup';

interface OrderSummaryProps {
  items: OrderItemWithId[];
  validation: ValidationResult;
  subtotal: number;
  shippingCost: number;
  totalWithShipping: number;
  minimumOrderAmount: number;
  freeShippingThreshold: number;
  deliveryZone: DeliveryZone;
  deliveryMethod: DeliveryMethod;
  pickupPoint: string;
  pickupSlot: string;
  deliveryLocation: string;
  customerName: string;
  customerPhone: string;
  providerInterest: boolean;
  products: Product[];
  onCalculate: () => void;
}

/**
 * Calcula la mejor sugerencia para alcanzar un monto objetivo
 */
function getPriceSuggestion(
  remainingAmount: number,
  products: Product[]
): { product: Product; quantity: number; addedAmount: number } | null {
  if (remainingAmount <= 0) return null;

  const sorted = [...products].sort((a, b) => a.price - b.price);
  let bestOption: { product: Product; quantity: number; addedAmount: number } | null = null;
  let bestExcess = Infinity;

  for (const product of sorted) {
    const qty = Math.ceil(remainingAmount / product.price);
    const addedAmount = product.price * qty;
    const excess = addedAmount - remainingAmount;

    if (excess < bestExcess) {
      bestExcess = excess;
      bestOption = { product, quantity: qty, addedAmount };
    }
  }

  return bestOption;
}

export const OrderSummary = ({
  items,
  validation,
  subtotal,
  shippingCost,
  totalWithShipping,
  minimumOrderAmount,
  freeShippingThreshold,
  deliveryZone,
  deliveryMethod,
  pickupPoint,
  pickupSlot,
  deliveryLocation,
  customerName,
  customerPhone,
  providerInterest,
  products,
  onCalculate,
}: OrderSummaryProps) => {
  const isPickup = deliveryZone === 'cdmx' || deliveryMethod === 'pickup';
  const hasPickupInfo = pickupPoint.trim().length > 0 && pickupSlot.trim().length > 0;
  const hasDeliveryLocation = deliveryLocation.trim().length > 0;
  const hasContact = customerName.trim().length > 0 && customerPhone.trim().length > 0;
  const canSubmit = hasContact && (isPickup ? hasPickupInfo : hasDeliveryLocation);
  const remainingToMinimum = Math.max(0, minimumOrderAmount - subtotal);
  const remainingToFree = Math.max(0, freeShippingThreshold - subtotal);
  const suggestionToMinimum = useMemo(() => {
    if (items.length === 0 || remainingToMinimum <= 0) return null;
    return getPriceSuggestion(remainingToMinimum, products);
  }, [items.length, remainingToMinimum, products]);
  const suggestionToFree = useMemo(() => {
    if (isPickup || items.length === 0 || remainingToFree <= 0) return null;
    if (subtotal < minimumOrderAmount) return null;
    return getPriceSuggestion(remainingToFree, products);
  }, [isPickup, items.length, remainingToFree, subtotal, minimumOrderAmount, products]);
  const fillPercent = minimumOrderAmount > 0 ? (subtotal / minimumOrderAmount) * 100 : 0;

  return (
    <div className="space-y-6">


      {/* Card Principal: Estado */}
      <div className={`bg-background border-4 border-foreground shadow-brutal p-6 ${validation.isValid
        ? 'bg-green-50 dark:bg-green-950/30'
        : items.length === 0
          ? ''
          : 'bg-orange-50 dark:bg-orange-950/30'
        }`}>
        <div className="space-y-6">
          {/* Estado e Icono */}
          <div className="text-center">
            <div className="flex justify-center mb-3">
              {validation.isValid ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-full bg-green-500 border-4 border-foreground flex items-center justify-center shadow-brutal-sm"
                >
                  <Truck className="w-8 h-8 text-white" />
                </motion.div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-muted border-4 border-foreground flex items-center justify-center">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <h4 className="font-display text-2xl mb-2">
              {validation.isValid
                ? (isPickup
                  ? '¡LISTO PARA RECOGER!'
                  : subtotal >= freeShippingThreshold
                    ? '¡ENVIO GRATIS!'
                    : '¡LISTO PARA ENVIAR!')
                : items.length > 0 ? 'COMPLETA TU PEDIDO' : ''}
            </h4>
          </div>

          {/* Subtotal */}
          <div className="text-center py-4">
            <p className="text-xs text-muted-foreground mb-2 font-display uppercase tracking-wider">
              Subtotal
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-7xl font-display font-bold text-foreground">
                ${subtotal.toFixed(0)}
              </span>
              <span className="text-2xl font-display text-muted-foreground">MXN</span>
            </div>
            <div className="mt-4 space-y-1 text-sm">
              <p>Envio: ${shippingCost.toFixed(0)} MXN</p>
              <p className="font-bold">Total: ${totalWithShipping.toFixed(0)} MXN</p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground text-xs uppercase font-display">Minimo:</span>
              <Badge variant="outline" className="font-display border-2 border-foreground">
                ${minimumOrderAmount}
              </Badge>
            </div>

            <div className="h-5 bg-muted border-2 border-foreground overflow-hidden relative">
              <motion.div
                className={`h-full ${validation.isValid
                  ? 'bg-green-500'
                  : fillPercent > 60
                    ? 'bg-amber-500'
                    : 'bg-red-500'
                  }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, fillPercent)}%`
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              {items.length > 0 && (
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-display font-bold text-foreground mix-blend-difference">
                  {Math.min(100, Math.round(fillPercent))}%
                </span>
              )}
            </div>

            {/* Celebration when minimum reached */}
            {validation.isValid && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="text-center py-2"
              >
                <span className="text-2xl">🎉</span>
                <p className="font-display text-sm text-green-700 dark:text-green-300 mt-1">
                  {isPickup
                    ? '¡PICKUP DISPONIBLE!'
                    : subtotal >= freeShippingThreshold
                      ? '¡ENVIO GRATIS DESBLOQUEADO!'
                      : '¡LISTO PARA ENVIAR!'}
                </p>
              </motion.div>
            )}
          </div>

          {/* Mensaje de validación */}
          {items.length > 0 && !validation.isValid && (
            <div className={`p-4 border-2 border-foreground text-center font-medium text-sm bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200`}>
              {validation.message}
            </div>
          )}

          {/* Sugerencias inteligentes */}
          {suggestionToMinimum && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-foreground/5 border-2 border-foreground/40 flex items-start gap-3"
            >
              <Lightbulb className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
              <p className="text-sm">
                <span className="font-bold">Tip:</span>{' '}
                Agrega{' '}
                <span className="font-bold text-foreground">
                  {suggestionToMinimum.quantity} {suggestionToMinimum.product.name}
                </span>{' '}
                para llegar a ${minimumOrderAmount}.
              </p>
            </motion.div>
          )}

          {suggestionToFree && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-foreground/5 border-2 border-foreground/40 flex items-start gap-3"
            >
              <Lightbulb className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
              <p className="text-sm">
                <span className="font-bold">Tip:</span>{' '}
                Agrega{' '}
                <span className="font-bold text-foreground">
                  {suggestionToFree.quantity} {suggestionToFree.product.name}
                </span>{' '}
                para envio gratis desde ${freeShippingThreshold}.
              </p>
            </motion.div>
          )}

          {hasContact && (
            <div className="p-3 border-2 border-foreground/40 bg-foreground/5 text-sm">
              <span className="font-bold">Cliente:</span> {customerName} · {customerPhone}{providerInterest ? ' · Proveedor interesado' : ''}
            </div>
          )}

          {isPickup && hasPickupInfo && (
            <div className="p-3 border-2 border-foreground/40 bg-foreground/5 text-sm">
              <span className="font-bold">Pickup:</span> {pickupPoint} · {pickupSlot}
            </div>
          )}

          {!isPickup && hasDeliveryLocation && (
            <div className="p-3 border-2 border-foreground/40 bg-foreground/5 text-sm">
              <span className="font-bold">Ubicacion:</span> {deliveryLocation}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {validation.shouldRedirectToDistributors ? (
            <div className="bg-background border-4 border-foreground shadow-brutal p-6 bg-orange-50 dark:bg-orange-950/30">
              <div className="text-center mb-4">
                <h3 className="font-display text-lg font-bold mb-2">
                  ¿COMPRA MENOR A $150?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Te enviamos con distribuidores cerca de ti
                </p>
              </div>
              <Button
                className="w-full font-display text-base py-6 inline-flex items-center justify-center px-8 border-[3px] border-foreground bg-foreground text-background cursor-pointer shadow-brutal transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg uppercase"
                size="lg"
                onClick={onCalculate}
              >
                VER DISTRIBUIDORES
              </Button>
            </div>
          ) : (
            <div className="bg-background border-4 border-foreground shadow-brutal p-6 bg-green-50 dark:bg-green-950/30">
              <div className="text-center mb-4">
                <h3 className="font-display text-lg font-bold text-green-700 dark:text-green-300 mb-2">
                  {isPickup ? '¡LISTO PARA RECOGER!' : '¡LISTO PARA ENVIAR!'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isPickup
                    ? 'Coméntanos el punto de entrega de tu pedido.'
                    : subtotal >= freeShippingThreshold
                      ? 'Tu pedido califica para envio gratis'
                      : `Envio con costo de $${shippingCost.toFixed(0)} MXN`}
                </p>
              </div>
              <Button
                className="w-full font-display text-base py-6 bg-green-600 hover:bg-green-700 border-4 border-foreground shadow-brutal hover:shadow-brutal-hover active:shadow-none transition-all"
                size="lg"
                onClick={onCalculate}
                disabled={!canSubmit}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                ENVIAR POR WHATSAPP
              </Button>
              {!canSubmit && (
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Completa contacto y datos de entrega/pickup.
                </p>
              )}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
