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
  totalVolume: number;
  validation: ValidationResult;
  minimumVolume: number;
  remainingVolume: number;
  deliveryZone: DeliveryZone;
  deliveryMethod: DeliveryMethod;
  pickupPoint: string;
  products: Product[];
  onCalculate: () => void;
}

/**
 * Calcula la mejor sugerencia de producto para alcanzar el mínimo
 */
function getSuggestion(
  remainingVolume: number,
  products: Product[]
): { product: Product; quantity: number } | null {
  if (remainingVolume <= 0) return null;

  // Ordenar productos de mayor a menor peso para minimizar unidades
  const sorted = [...products].sort((a, b) => b.weight - a.weight);

  let bestOption: { product: Product; quantity: number } | null = null;
  let bestExcess = Infinity;

  for (const product of sorted) {
    const qty = Math.ceil(remainingVolume / product.weight);
    const excess = product.weight * qty - remainingVolume;

    // Preferimos la opción con menor excedente
    if (excess < bestExcess) {
      bestExcess = excess;
      bestOption = { product, quantity: qty };
    }
  }

  return bestOption;
}

export const OrderSummary = ({
  items,
  totalVolume,
  validation,
  minimumVolume,
  remainingVolume,
  deliveryZone,
  deliveryMethod,
  pickupPoint,
  products,
  onCalculate,
}: OrderSummaryProps) => {
  const suggestion = useMemo(() => {
    if (validation.isValid || items.length === 0) return null;
    return getSuggestion(remainingVolume, products);
  }, [validation.isValid, items.length, remainingVolume, products]);

  const fillPercent = (totalVolume / minimumVolume) * 100;
  const isPickup = deliveryZone === 'cdmx' || deliveryMethod === 'pickup';
  const canSubmit = !isPickup || pickupPoint.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Badges informativos */}
      <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
        <div className="bg-background border-4 border-foreground px-4 py-2.5 font-display text-sm font-bold flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Truck className="w-4 h-4" />
          <span>{isPickup ? 'RECOGIDA +3KG' : 'ENVÍO GRATIS +3KG'}</span>
        </div>
        <div className="bg-background border-4 border-foreground px-4 py-2.5 font-display text-sm font-bold flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <MapPin className="w-4 h-4" />
          <span>{
            isPickup
              ? `${deliveryZone === 'puebla' ? 'PUEBLA' : 'CDMX'} - PICKUP`
              : 'PUEBLA - DOMICILIO'
          }</span>
        </div>
      </div>

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
                ? (isPickup ? '¡LISTO PARA RECOGER!' : '¡ENVÍO GRATIS!')
                : items.length > 0 ? 'COMPLETA TU PEDIDO' : ''}
            </h4>
          </div>

          {/* Volumen Total */}
          <div className="text-center py-4">
            <p className="text-xs text-muted-foreground mb-2 font-display uppercase tracking-wider">
              Volumen Total
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-7xl font-display font-bold text-foreground">
                {totalVolume.toFixed(1)}
              </span>
              <span className="text-3xl font-display text-muted-foreground">kg</span>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground text-xs uppercase font-display">Mínimo:</span>
              <Badge variant="outline" className="font-display border-2 border-foreground">
                {minimumVolume} kg
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
                  {isPickup ? '¡RECOGIDA DISPONIBLE!' : '¡ENVÍO GRATIS DESBLOQUEADO!'}
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

          {/* Sugerencia inteligente */}
          {suggestion && (
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
                  {suggestion.quantity} {suggestion.product.name} ({suggestion.product.weight} kg)
                </span>{' '}
                para alcanzar el mínimo de {minimumVolume} kg y obtener{' '}
                {isPickup ? 'recogida' : 'envío gratis'}.
              </p>
            </motion.div>
          )}

          {isPickup && pickupPoint.trim().length > 0 && (
            <div className="p-3 border-2 border-foreground/40 bg-foreground/5 text-sm">
              <span className="font-bold">Pickup:</span> {pickupPoint}
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
                  ¿BUSCAS MENOS CANTIDAD?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Encuentra nuestros productos en distribuidores cerca de ti
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
                    : 'Tu pedido califica para envío gratis'}
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
                  Selecciona un punto de pickup para continuar.
                </p>
              )}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
