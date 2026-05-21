/**
 * Subcomponente: Resumen del pedido con barra de progreso, sugerencia inteligente y CTAs
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, MessageCircle, Lightbulb, Trash2 } from 'lucide-react';
import { OrderItemsList } from '@/components/calculator/OrderItemsList';
import type { CalculatorDensity } from '@/components/calculator/types';
import { isCompactDensity } from '@/components/calculator/types';
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
  freeShippingThreshold: number;
  deliveryZone: DeliveryZone;
  deliveryMethod: DeliveryMethod;
  pickupPoint: string;
  pickupSlot: string;
  deliveryLocation: string;
  customerName: string;
  customerPhone: string;
  products: Product[];
  onCalculate: () => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearOrder: () => void;
  density?: CalculatorDensity;
  hideCta?: boolean;
}

export interface OrderSummaryCTAProps {
  items: OrderItemWithId[];
  subtotal: number;
  shippingCost: number;
  freeShippingThreshold: number;
  deliveryZone: DeliveryZone;
  deliveryMethod: DeliveryMethod;
  onCalculate: () => void;
  density?: CalculatorDensity;
}

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

function getStatusBadgeLabel(
  items: OrderItemWithId[],
  validation: ValidationResult,
  isPickup: boolean,
  subtotal: number,
  freeShippingThreshold: number
): string | null {
  if (items.length === 0) return null;
  if (!validation.isValid) return 'Completa pedido';
  if (isPickup) return 'Listo pickup';
  if (subtotal >= freeShippingThreshold) return 'Envio gratis';
  return 'Listo envio';
}

export const OrderSummaryCTA = ({
  items,
  subtotal,
  shippingCost,
  freeShippingThreshold,
  deliveryZone,
  deliveryMethod,
  onCalculate,
  density = 'default',
}: OrderSummaryCTAProps) => {
  if (items.length === 0) return null;

  const compact = isCompactDensity(density);
  const isPickup = deliveryZone === 'cdmx' || deliveryMethod === 'pickup';

  if (compact) {
    return (
      <div className="border-t-2 border-foreground bg-background px-4 py-3 shrink-0">
        <Button
          className="w-full font-display text-sm py-3 bg-green-600 hover:bg-green-700 border-2 border-foreground shadow-brutal hover:shadow-brutal active:shadow-none transition-all"
          onClick={onCalculate}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          ENVIAR PEDIDO
        </Button>
        <p className="text-[10px] text-muted-foreground text-center mt-1.5 leading-tight">
          Ticket y seguimiento por WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          ENVIAR PEDIDO AHORA
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          El ticket se entrega en WhatsApp y el seguimiento se hace por ahi.
        </p>
      </div>
    </motion.div>
  );
};

export const OrderSummary = ({
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
  deliveryLocation,
  customerName,
  customerPhone,
  products,
  onCalculate,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  density = 'default',
  hideCta = false,
}: OrderSummaryProps) => {
  const compact = isCompactDensity(density);
  const isPickup = deliveryZone === 'cdmx' || deliveryMethod === 'pickup';
  const hasPickupInfo = pickupPoint.trim().length > 0 && pickupSlot.trim().length > 0;
  const hasDeliveryLocation = deliveryLocation.trim().length > 0;
  const hasContact = customerName.trim().length > 0 && customerPhone.trim().length > 0;
  const remainingToFree = Math.max(0, freeShippingThreshold - subtotal);
  const suggestionToFree = useMemo(() => {
    if (isPickup || items.length === 0 || remainingToFree <= 0) return null;
    return getPriceSuggestion(remainingToFree, products);
  }, [isPickup, items.length, remainingToFree, products]);
  const fillPercent = freeShippingThreshold > 0 ? (subtotal / freeShippingThreshold) * 100 : 0;
  const statusBadge = getStatusBadgeLabel(
    items,
    validation,
    isPickup,
    subtotal,
    freeShippingThreshold
  );

  const cardOuterClass = compact
    ? `bg-background border-2 border-foreground shadow-brutal p-3 ${
        validation.isValid
          ? 'bg-green-50 dark:bg-green-950/30'
          : items.length === 0
            ? ''
            : 'bg-orange-50 dark:bg-orange-950/30'
      }`
    : `bg-background border-4 border-foreground shadow-brutal p-6 ${
        validation.isValid
          ? 'bg-green-50 dark:bg-green-950/30'
          : items.length === 0
            ? ''
            : 'bg-orange-50 dark:bg-orange-950/30'
      }`;

  const infoLines: { label: string; value: string }[] = [];
  if (hasContact) infoLines.push({ label: 'Cliente', value: `${customerName} · ${customerPhone}` });
  if (isPickup && hasPickupInfo) infoLines.push({ label: 'Pickup', value: `${pickupPoint} · ${pickupSlot}` });
  if (!isPickup && hasDeliveryLocation) infoLines.push({ label: 'Ubicacion', value: deliveryLocation });

  return (
    <div className={compact ? 'space-y-3' : 'space-y-6'}>
      <div className={cardOuterClass}>
        <div className={compact ? 'space-y-3' : 'space-y-6'}>
          <div
            className={`flex justify-between items-center gap-2 ${
              compact ? 'pb-2 border-b border-foreground/20' : 'pb-3 border-b-2 border-foreground/20'
            }`}
          >
            <h3
              className={`font-display flex items-center gap-2 ${compact ? 'text-base' : 'text-2xl'}`}
            >
              <Package className={compact ? 'w-4 h-4' : 'w-6 h-6'} />
              TU PEDIDO
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              {compact && statusBadge && (
                <Badge
                  variant="outline"
                  className="text-[10px] font-display border-foreground px-1.5 py-0"
                >
                  {statusBadge}
                </Badge>
              )}
              {items.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearOrder}
                  className={`text-destructive hover:text-destructive border-2 border-destructive hover:bg-destructive/10 ${
                    compact ? 'h-7 w-7 p-0' : ''
                  }`}
                  aria-label="Vaciar pedido completo"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <OrderItemsList
            items={items}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
            density={density}
          />

          {!compact && (
            <div className="text-center">
              <div className="flex justify-center mb-3">
                {validation.isValid ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full bg-green-500 border-4 border-foreground flex items-center justify-center shadow-brutal"
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
                  ? isPickup
                    ? '¡LISTO PARA RECOGER!'
                    : subtotal >= freeShippingThreshold
                      ? '¡ENVIO GRATIS!'
                      : '¡LISTO PARA ENVIAR!'
                  : items.length > 0
                    ? 'COMPLETA TU PEDIDO'
                    : ''}
              </h4>
            </div>
          )}

          {compact ? (
            <div className="space-y-2">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs text-muted-foreground font-display uppercase">Subtotal</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-display font-bold">${subtotal.toFixed(0)}</span>
                  <span className="text-sm font-display text-muted-foreground">MXN</span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envio</span>
                <span>${shippingCost.toFixed(0)} MXN</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span>Total</span>
                <span>${totalWithShipping.toFixed(0)} MXN</span>
              </div>
            </div>
          ) : (
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
          )}

          {!isPickup && (
            <div className={compact ? 'space-y-1.5' : 'space-y-3'}>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground text-xs uppercase font-display">Envio gratis:</span>
                <Badge variant="outline" className="font-display border-2 border-foreground">
                  ${freeShippingThreshold}
                </Badge>
              </div>

              <div
                className={`bg-muted border-2 border-foreground overflow-hidden relative ${
                  compact ? 'h-3' : 'h-5'
                }`}
              >
                <motion.div
                  className={`h-full ${
                    subtotal >= freeShippingThreshold
                      ? 'bg-green-500'
                      : fillPercent > 60
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, fillPercent)}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
                {items.length > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-display font-bold text-foreground mix-blend-difference">
                    {Math.min(100, Math.round(fillPercent))}%
                  </span>
                )}
              </div>

              {!compact && validation.isValid && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="text-center py-2"
                >
                  <span className="text-2xl">🎉</span>
                  <p className="font-display text-sm text-green-700 dark:text-green-300 mt-1">
                    {subtotal >= freeShippingThreshold
                      ? '¡ENVIO GRATIS DESBLOQUEADO!'
                      : '¡LISTO PARA ENVIAR!'}
                  </p>
                </motion.div>
              )}

              {compact && validation.isValid && subtotal >= freeShippingThreshold && (
                <p className="text-xs text-green-700 dark:text-green-300 font-display">
                  Envio gratis desbloqueado
                </p>
              )}
            </div>
          )}

          {items.length > 0 && !validation.isValid && (
            <div
              className={`border-2 border-foreground text-center font-medium bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 ${
                compact ? 'p-2 text-xs' : 'p-4 text-sm'
              }`}
            >
              {validation.message}
            </div>
          )}

          {suggestionToFree && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-foreground/5 border-2 border-foreground/40 flex items-start gap-2 ${
                compact ? 'p-2' : 'p-4 gap-3'
              }`}
            >
              <Lightbulb className={`text-foreground shrink-0 ${compact ? 'w-4 h-4 mt-0' : 'w-5 h-5 mt-0.5'}`} />
              <p className={compact ? 'text-xs' : 'text-sm'}>
                <span className="font-bold">Tip:</span> Agrega{' '}
                <span className="font-bold text-foreground">
                  {suggestionToFree.quantity} {suggestionToFree.product.name}
                </span>{' '}
                para envio gratis desde ${freeShippingThreshold}.
              </p>
            </motion.div>
          )}

          {compact && infoLines.length > 0 && (
            <div className="space-y-1 text-xs text-muted-foreground">
              {infoLines.map((line) => (
                <p key={line.label} className="truncate" title={line.value}>
                  <span className="font-bold text-foreground">{line.label}:</span> {line.value}
                </p>
              ))}
            </div>
          )}

          {!compact && hasContact && (
            <div className="p-3 border-2 border-foreground/40 bg-foreground/5 text-sm">
              <span className="font-bold">Cliente:</span> {customerName} · {customerPhone}
            </div>
          )}

          {!compact && isPickup && hasPickupInfo && (
            <div className="p-3 border-2 border-foreground/40 bg-foreground/5 text-sm">
              <span className="font-bold">Pickup:</span> {pickupPoint} · {pickupSlot}
            </div>
          )}

          {!compact && !isPickup && hasDeliveryLocation && (
            <div className="p-3 border-2 border-foreground/40 bg-foreground/5 text-sm">
              <span className="font-bold">Ubicacion:</span> {deliveryLocation}
            </div>
          )}
        </div>
      </div>

      {!hideCta && (
        <OrderSummaryCTA
          items={items}
          subtotal={subtotal}
          shippingCost={shippingCost}
          freeShippingThreshold={freeShippingThreshold}
          deliveryZone={deliveryZone}
          deliveryMethod={deliveryMethod}
          onCalculate={onCalculate}
          density={density}
        />
      )}
    </div>
  );
};
