/**
 * Servicio de validación de pedidos
 * Validación simplificada: Mínimo 3 kg para envío gratuito
 */

import type { OrderItem, ValidationResult } from '@/types/order';

/**
 * Volumen mínimo requerido para envío gratuito (en kg)
 */
const MINIMUM_VOLUME_FOR_FREE_SHIPPING = 3.0;

/**
 * Servicio principal para validar pedidos
 */
export class OrderValidationService {
  /**
   * Valida si un pedido cumple con el volumen mínimo para envío gratuito
   * 
   * @param items - Items del pedido
   * @returns Resultado de la validación
   */
  static validateOrder(items: OrderItem[]): ValidationResult {
    // Validación básica
    if (!items || items.length === 0) {
      return {
        isValid: false,
        totalVolume: 0,
        minimumRequired: MINIMUM_VOLUME_FOR_FREE_SHIPPING,
        zone: 'local',
        message: 'Agrega productos a tu pedido',
        shouldRedirectToDistributors: true
      };
    }

    const totalVolume = this.calculateTotalVolume(items);
    const isValid = totalVolume >= MINIMUM_VOLUME_FOR_FREE_SHIPPING;
    
    return {
      isValid,
      totalVolume,
      minimumRequired: MINIMUM_VOLUME_FOR_FREE_SHIPPING,
      zone: 'local',
      message: isValid
        ? '✅ ¡Envío GRATIS! Tu pedido cumple con el mínimo de volumen'
        : `Necesitas ${(MINIMUM_VOLUME_FOR_FREE_SHIPPING - totalVolume).toFixed(2)} kg más para envío gratis`,
      shouldRedirectToDistributors: !isValid
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
   * Obtiene el volumen faltante para envío gratuito
   * 
   * @param currentVolume - Volumen actual del pedido en kg
   * @returns Kilogramos faltantes (0 si ya cumple)
   */
  static getRemainingVolume(currentVolume: number): number {
    const remaining = MINIMUM_VOLUME_FOR_FREE_SHIPPING - currentVolume;
    return Math.max(0, remaining);
  }

  /**
   * Obtiene el volumen mínimo requerido
   */
  static getMinimumVolume(): number {
    return MINIMUM_VOLUME_FOR_FREE_SHIPPING;
  }
}
