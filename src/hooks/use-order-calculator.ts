/**
 * Componente: Calculadora de Pedidos
 * Hook personalizado para manejar la lógica de la calculadora
 */

import { useState, useMemo, useCallback } from 'react';
import type { OrderItem, ValidationResult } from '@/types/order';
import { OrderValidationService } from '@/services/order-validation.service';
import { getAllProducts, getProductById } from '@/data/products';

type DeliveryZone = 'puebla' | 'cdmx';
type DeliveryMethod = 'delivery' | 'pickup';

export interface OrderItemWithId extends OrderItem {
  id: string; // Para React keys
}

export const useOrderCalculator = (
  zone: DeliveryZone = 'puebla',
  method: DeliveryMethod = 'delivery'
) => {
  const [items, setItems] = useState<OrderItemWithId[]>([]);

  const products = useMemo(() => getAllProducts(), []);

  /**
   * Agrega un producto al pedido
   */
  const addItem = useCallback((productId: string, quantity: number = 1) => {
    const product = getProductById(productId);
    
    if (!product || quantity <= 0) {
      return;
    }

    setItems(current => {
      // Verificar si el producto ya existe
      const existingIndex = current.findIndex(
        item => item.product.id === productId
      );

      if (existingIndex >= 0) {
        // Actualizar cantidad
        const updated = [...current];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      // Agregar nuevo item
      return [
        ...current,
        {
          id: `${productId}-${Date.now()}`,
          product,
          quantity
        }
      ];
    });
  }, []);

  /**
   * Actualiza la cantidad de un item
   */
  const updateItemQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(current =>
      current.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
    );
  }, []);

  /**
   * Remueve un item del pedido
   */
  const removeItem = useCallback((itemId: string) => {
    setItems(current => current.filter(item => item.id !== itemId));
  }, []);

  /**
   * Limpia todos los items del pedido
   */
  const clearOrder = useCallback(() => {
    setItems([]);
  }, []);

  /**
   * Calcula el volumen total del pedido actual
   */
  const totalVolume = useMemo(() => {
    return OrderValidationService.calculateTotalVolume(items);
  }, [items]);

  /**
   * Valida el pedido actual según la zona
   */
  const validation: ValidationResult = useMemo(() => {
    return OrderValidationService.validateOrder(items, zone, method);
  }, [items, zone, method]);

  const subtotal = useMemo(() => {
    return OrderValidationService.calculateSubtotal(items);
  }, [items]);

  return {
    // Estado
    items,
    products,
    
    // Métricas
    totalVolume,
    validation,
    subtotal,
    
    // Acciones
    addItem,
    updateItemQuantity,
    removeItem,
    clearOrder
  };
};
