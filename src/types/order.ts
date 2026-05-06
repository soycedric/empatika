/**
 * Tipos y interfaces del dominio de pedidos
 * Arquitectura: Domain-Driven Design
 */

/**
 * Representa un producto en el catálogo
 */
export interface Product {
  id: string;
  name: string;
  variant: 'extra-firme' | 'ahumado' | 'veganesa';
  /**
   * Peso en kilogramos
   */
  weight: number;
  price: number; // Precio por pieza/unidad
  pricePerKg?: number; // Opcional para futuras funcionalidades
  description?: string;
}

/**
 * Representa un ítem en el pedido
 */
export interface OrderItem {
  product: Product;
  quantity: number;
}

/**
 * Representa un pedido completo
 */
export interface Order {
  items: OrderItem[];
  destinationZone: ZoneType;
}

/**
 * Tipos de zonas de entrega
 */
export type ZoneType = 'local' | 'regional' | 'nacional';

/**
 * Resultado de la validación del pedido
 */
export interface ValidationResult {
  isValid: boolean;
  totalVolume: number; // en kg
  minimumRequired: number; // en kg
  subtotal: number; // en MXN
  shippingCost: number; // en MXN
  totalWithShipping: number; // en MXN
  minimumOrderAmount: number; // en MXN
  freeShippingThreshold: number; // en MXN
  zone: ZoneType;
  message: string;
  /**
   * Si true, el usuario debe ser redirigido a distribuidores
   */
  shouldRedirectToDistributors: boolean;
}

/**
 * Configuración de una zona
 */
export interface ZoneConfig {
  name: string;
  minimumVolume: number; // en kg
  description: string;
}
