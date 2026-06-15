/**
 * Catálogo de productos disponibles
 * Centraliza la definición de productos con sus pesos y características
 */

import type { Product } from '@/types/order';

/**
 * Catálogo completo de productos
 * Todos los pesos están en kilogramos
 */
export const PRODUCT_CATALOG: Record<string, Product[]> = {
  'tofu-extra-firme': [
    {
      id: 'tofu-extra-firme-400g',
      name: 'Tofu Extra Firme',
      variant: 'extra-firme',
      weight: 0.4, // 400g = 0.4 kg
      price: 75,
      description: 'Perfecto para freír, asar o saltear. Su textura firme mantiene la forma.',
      pricePerKg: 165
    },
    {
      id: 'tofu-extra-firme-1kg',
      name: 'Tofu Extra Firme',
      variant: 'extra-firme',
      weight: 1.0, // 1 kg
      price: 165,
      description: 'Perfecto para freír, asar o saltear. Su textura firme mantiene la forma.',
      pricePerKg: 165 // Ejemplo: $165 pesos por kg
    }
  ],
  'tofu-ahumado': [
    {
      id: 'tofu-ahumado-400g',
      name: 'Tofu Ahumado',
      variant: 'ahumado',
      weight: 0.4, // 400g = 0.4 kg
      price: 75,
      description: 'Ahumado con madera de mezquite. Listo para comer.',
      pricePerKg: 180 // Ejemplo: $180 pesos por kg
    },
    {
      id: 'tofu-ahumado-1kg',
      name: 'Tofu Ahumado',
      variant: 'ahumado',
      weight: 1.0, // 1 kg
      price: 165,
      description: 'Ahumado con madera de mezquite. Listo para comer.',
      pricePerKg: 165 // $165 pesos por kg
    }
  ],
  'veganesa': [
    {
      id: 'veganesa-250g',
      name: 'Veganesa',
      variant: 'veganesa',
      weight: 0.25, // 250g = 0.25 kg
      price: 75,
      description: 'Mayonesa vegana cremosa y deliciosa. Sin huevo, sin lácteos.',
      pricePerKg: 300 // Ejemplo: $300 pesos por kg
    },
    {
      id: 'veganesa-500g',
      name: 'Veganesa',
      variant: 'veganesa',
      weight: 0.5, // 500g = 0.5 kg
      price: 140,
      description: 'Mayonesa vegana cremosa y deliciosa. Sin huevo, sin lácteos.',
      pricePerKg: 280 // Ejemplo: $280 pesos por kg
    }
  ]
};

/**
 * Obtiene todos los productos del catálogo como un array plano
 */
export const getAllProducts = (): Product[] => {
  return Object.values(PRODUCT_CATALOG).flat();
};

/**
 * Obtiene un producto por su ID
 */
export const getProductById = (id: string): Product | undefined => {
  return getAllProducts().find(product => product.id === id);
};

/**
 * Obtiene productos por variante
 */
export const getProductsByVariant = (variant: Product['variant']): Product[] => {
  return getAllProducts().filter(product => product.variant === variant);
};

/**
 * Obtiene los pesos disponibles para una variante
 */
export const getAvailableWeights = (variant: Product['variant']): number[] => {
  const products = getProductsByVariant(variant);
  return products.map(p => p.weight).sort((a, b) => a - b);
};

/**
 * Información de las categorías de productos
 */
export const PRODUCT_CATEGORIES = {
  'tofu-extra-firme': {
    name: 'Tofu Extra Firme',
    description: 'Perfecto para freír, asar o saltear',
    color: 'yellow' as const
  },
  'tofu-ahumado': {
    name: 'Tofu Ahumado',
    description: 'Ahumado con madera de mezquite',
    color: 'orange' as const
  },
  'veganesa': {
    name: 'Veganesa',
    description: 'Mayonesa vegana cremosa',
    color: 'yellow' as const
  }
} as const;
