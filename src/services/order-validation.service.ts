/**
 * Servicio de validación de pedidos
 * Reglas por precio: < $150 distribuidores, $150-$399 envio $50, $400+ envio gratis
 */

import type { OrderItem, ValidationResult } from '@/types/order';

type DeliveryZone = 'puebla' | 'cdmx';
type DeliveryMethod = 'delivery' | 'pickup';

/**
 * Reglas de envio por monto
 */
const MINIMUM_ORDER_AMOUNT = 150;
const FREE_SHIPPING_THRESHOLD = 400;
const DELIVERY_FEE = 50;

/**
 * Servicio principal para validar pedidos
 */
export class OrderValidationService {
  /**
   * Valida si un pedido cumple con el volumen mínimo para envío gratuito o recogida
   * 
   * @param items - Items del pedido
   * @param zone - Zona de entrega ('puebla' o 'cdmx')
   * @returns Resultado de la validación
   */
  static validateOrder(
    items: OrderItem[],
    zone: DeliveryZone = 'puebla',
    method: DeliveryMethod = 'delivery'
  ): ValidationResult {
    const totalVolume = this.calculateTotalVolume(items);
    const subtotal = this.calculateSubtotal(items);
    const isPickup = zone === 'cdmx' || method === 'pickup';

    if (!items || items.length === 0) {
      return {
        isValid: false,
        totalVolume,
        minimumRequired: MINIMUM_ORDER_AMOUNT,
        subtotal,
        shippingCost: 0,
        totalWithShipping: subtotal,
        minimumOrderAmount: MINIMUM_ORDER_AMOUNT,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        zone: 'local',
        message: 'Agrega productos a tu pedido',
        shouldRedirectToDistributors: true
      };
    }

    const shouldRedirectToDistributors = subtotal < MINIMUM_ORDER_AMOUNT;
    const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const shippingCost = isPickup
      ? 0
      : qualifiesForFreeShipping
        ? 0
        : DELIVERY_FEE;

    const isValid = !shouldRedirectToDistributors;
    const message = shouldRedirectToDistributors
      ? `Compra minima $${MINIMUM_ORDER_AMOUNT} para envio. Si compras menos, te mandamos con proveedores.`
      : qualifiesForFreeShipping
        ? '✅ ¡Envio gratis desbloqueado!'
        : isPickup
          ? '✅ Pickup disponible'
          : `Envio con costo de $${DELIVERY_FEE}. Gratis a partir de $${FREE_SHIPPING_THRESHOLD}.`;

    return {
      isValid,
      totalVolume,
      minimumRequired: MINIMUM_ORDER_AMOUNT,
      subtotal,
      shippingCost,
      totalWithShipping: subtotal + shippingCost,
      minimumOrderAmount: MINIMUM_ORDER_AMOUNT,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      zone: 'local',
      message,
      shouldRedirectToDistributors
    };
  }

  /**
   * Calcula el volumen total de un conjunto de items
   * 
   * @param items - Items del pedido
   * @returns Volumen total en kilogramos
   */
  static calculateTotalVolume(items: OrderItem[]): number {
    return items.reduce((total, item) => {
      return total + (item.product.weight * item.quantity);
    }, 0);
  }

  /**
   * Calcula el subtotal en MXN
   */
  static calculateSubtotal(items: OrderItem[]): number {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  /**
   * Obtiene el volumen faltante para envío gratuito
   * 
   * @param currentVolume - Volumen actual del pedido en kg
   * @returns Kilogramos faltantes (0 si ya cumple)
   */
  static getRemainingVolume(currentVolume: number): number {
    const remaining = FREE_SHIPPING_THRESHOLD - currentVolume;
    return Math.max(0, remaining);
  }

  /**
   * Obtiene el volumen mínimo requerido
   */
  static getMinimumVolume(): number {
    return MINIMUM_ORDER_AMOUNT;
  }

  static getMinimumOrderAmount(): number {
    return MINIMUM_ORDER_AMOUNT;
  }

  static getFreeShippingThreshold(): number {
    return FREE_SHIPPING_THRESHOLD;
  }

  static getDeliveryFee(): number {
    return DELIVERY_FEE;
  }
}
