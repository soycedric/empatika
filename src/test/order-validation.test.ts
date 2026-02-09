/**
 * Tests unitarios para el sistema de validación de pedidos
 * Framework: Vitest
 */

import { describe, it, expect } from 'vitest';
import { OrderValidationService } from '@/services/order-validation.service';
import { LocalZoneStrategy, RegionalZoneStrategy, NationalZoneStrategy, ZoneStrategyFactory } from '@/services/zone-strategies';
import type { Order, Product } from '@/types/order';

// Mock products para testing
const mockProducts: Product[] = [
  {
    id: 'tofu-1kg',
    name: 'Tofu Extra Firme',
    variant: 'extra-firme',
    weight: 1.0
  },
  {
    id: 'tofu-400g',
    name: 'Tofu Extra Firme',
    variant: 'extra-firme',
    weight: 0.4
  },
  {
    id: 'veganesa-500g',
    name: 'Veganesa',
    variant: 'veganesa',
    weight: 0.5
  }
];

describe('OrderValidationService', () => {
  describe('calculateTotalVolume', () => {
    it('debe calcular correctamente el volumen total con un solo producto', () => {
      const items = [
        { product: mockProducts[0], quantity: 3 }
      ];
      
      const total = OrderValidationService.calculateTotalVolume(items);
      expect(total).toBe(3.0); // 3 x 1kg
    });

    it('debe calcular correctamente el volumen total con múltiples productos', () => {
      const items = [
        { product: mockProducts[0], quantity: 2 }, // 2kg
        { product: mockProducts[1], quantity: 5 }, // 2kg (5 x 0.4)
        { product: mockProducts[2], quantity: 1 }  // 0.5kg
      ];
      
      const total = OrderValidationService.calculateTotalVolume(items);
      expect(total).toBe(4.5);
    });

    it('debe retornar 0 para un array vacío', () => {
      const total = OrderValidationService.calculateTotalVolume([]);
      expect(total).toBe(0);
    });
  });

  describe('validateOrder', () => {
    it('debe validar correctamente un pedido vacío', () => {
      const order: Order = {
        items: [],
        destinationZone: 'local'
      };

      const result = OrderValidationService.validateOrder(order);
      
      expect(result.isValid).toBe(false);
      expect(result.shouldRedirectToDistributors).toBe(true);
      expect(result.message).toContain('no contiene productos');
    });

    it('debe validar correctamente un pedido válido para zona local', () => {
      const order: Order = {
        items: [
          { product: mockProducts[0], quantity: 3 } // 3kg total
        ],
        destinationZone: 'local'
      };

      const result = OrderValidationService.validateOrder(order);
      
      expect(result.isValid).toBe(true);
      expect(result.totalVolume).toBe(3.0);
      expect(result.minimumRequired).toBe(2.5);
      expect(result.shouldRedirectToDistributors).toBe(false);
    });

    it('debe invalidar un pedido insuficiente para zona local', () => {
      const order: Order = {
        items: [
          { product: mockProducts[1], quantity: 5 } // 2kg total (5 x 0.4)
        ],
        destinationZone: 'local'
      };

      const result = OrderValidationService.validateOrder(order);
      
      expect(result.isValid).toBe(false);
      expect(result.totalVolume).toBe(2.0);
      expect(result.minimumRequired).toBe(2.5);
      expect(result.shouldRedirectToDistributors).toBe(true);
    });
  });

  describe('meetsMinimumVolume', () => {
    it('debe retornar true cuando cumple el mínimo local', () => {
      const result = OrderValidationService.meetsMinimumVolume(2.5, 'local');
      expect(result).toBe(true);
    });

    it('debe retornar false cuando no cumple el mínimo local', () => {
      const result = OrderValidationService.meetsMinimumVolume(2.4, 'local');
      expect(result).toBe(false);
    });

    it('debe retornar true cuando cumple el mínimo regional', () => {
      const result = OrderValidationService.meetsMinimumVolume(5.0, 'regional');
      expect(result).toBe(true);
    });

    it('debe retornar false cuando no cumple el mínimo regional', () => {
      const result = OrderValidationService.meetsMinimumVolume(4.9, 'regional');
      expect(result).toBe(false);
    });
  });

  describe('getRemainingVolume', () => {
    it('debe calcular correctamente el volumen faltante', () => {
      const remaining = OrderValidationService.getRemainingVolume(2.0, 'local');
      expect(remaining).toBe(0.5); // 2.5 - 2.0
    });

    it('debe retornar 0 cuando ya cumple el mínimo', () => {
      const remaining = OrderValidationService.getRemainingVolume(3.0, 'local');
      expect(remaining).toBe(0);
    });

    it('debe retornar 0 cuando excede el mínimo', () => {
      const remaining = OrderValidationService.getRemainingVolume(5.0, 'local');
      expect(remaining).toBe(0);
    });
  });
});

describe('Zone Strategies', () => {
  describe('LocalZoneStrategy', () => {
    const strategy = new LocalZoneStrategy();

    it('debe tener la configuración correcta', () => {
      expect(strategy.config.name).toBe('Local (Puebla)');
      expect(strategy.config.minimumVolume).toBe(2.5);
    });

    it('debe validar correctamente un pedido que cumple el mínimo', () => {
      const order: Order = {
        items: [
          { product: mockProducts[0], quantity: 3 }
        ],
        destinationZone: 'local'
      };

      const result = strategy.validate(order);
      
      expect(result.isValid).toBe(true);
      expect(result.zone).toBe('local');
      expect(result.totalVolume).toBe(3.0);
    });

    it('debe invalidar un pedido que no cumple el mínimo', () => {
      const order: Order = {
        items: [
          { product: mockProducts[1], quantity: 5 } // 2kg
        ],
        destinationZone: 'local'
      };

      const result = strategy.validate(order);
      
      expect(result.isValid).toBe(false);
      expect(result.shouldRedirectToDistributors).toBe(true);
    });
  });

  describe('RegionalZoneStrategy', () => {
    const strategy = new RegionalZoneStrategy();

    it('debe tener la configuración correcta', () => {
      expect(strategy.config.minimumVolume).toBe(5.0);
    });

    it('debe validar correctamente un pedido que cumple el mínimo', () => {
      const order: Order = {
        items: [
          { product: mockProducts[0], quantity: 5 }
        ],
        destinationZone: 'regional'
      };

      const result = strategy.validate(order);
      
      expect(result.isValid).toBe(true);
      expect(result.zone).toBe('regional');
    });
  });

  describe('NationalZoneStrategy', () => {
    const strategy = new NationalZoneStrategy();

    it('debe tener la configuración correcta', () => {
      expect(strategy.config.minimumVolume).toBe(10.0);
    });

    it('debe validar correctamente un pedido que cumple el mínimo', () => {
      const order: Order = {
        items: [
          { product: mockProducts[0], quantity: 10 }
        ],
        destinationZone: 'nacional'
      };

      const result = strategy.validate(order);
      
      expect(result.isValid).toBe(true);
      expect(result.zone).toBe('nacional');
    });
  });
});

describe('ZoneStrategyFactory', () => {
  it('debe retornar la estrategia correcta para zona local', () => {
    const strategy = ZoneStrategyFactory.getStrategy('local');
    expect(strategy).toBeInstanceOf(LocalZoneStrategy);
  });

  it('debe retornar la estrategia correcta para zona regional', () => {
    const strategy = ZoneStrategyFactory.getStrategy('regional');
    expect(strategy).toBeInstanceOf(RegionalZoneStrategy);
  });

  it('debe retornar la estrategia correcta para zona nacional', () => {
    const strategy = ZoneStrategyFactory.getStrategy('nacional');
    expect(strategy).toBeInstanceOf(NationalZoneStrategy);
  });

  it('debe lanzar error para zona inválida', () => {
    expect(() => {
      ZoneStrategyFactory.getStrategy('invalid' as any);
    }).toThrow();
  });

  it('debe retornar todas las configuraciones de zonas', () => {
    const configs = ZoneStrategyFactory.getAllZoneConfigs();
    
    expect(configs).toHaveProperty('local');
    expect(configs).toHaveProperty('regional');
    expect(configs).toHaveProperty('nacional');
    
    expect(configs.local.minimumVolume).toBe(2.5);
    expect(configs.regional.minimumVolume).toBe(5.0);
    expect(configs.nacional.minimumVolume).toBe(10.0);
  });
});

describe('Integration Tests', () => {
  it('debe procesar correctamente un pedido completo del mundo real', () => {
    // Escenario: Un restaurante en CDMX quiere hacer un pedido regional
    const order: Order = {
      items: [
        { product: mockProducts[0], quantity: 3 },  // 3kg tofu 1kg
        { product: mockProducts[1], quantity: 5 },  // 2kg tofu 400g
        { product: mockProducts[2], quantity: 2 }   // 1kg veganesa
      ],
      destinationZone: 'regional'
    };

    const result = OrderValidationService.validateOrder(order);
    
    expect(result.totalVolume).toBe(6.0); // 3 + 2 + 1
    expect(result.isValid).toBe(true); // Cumple con 5kg mínimo regional
    expect(result.shouldRedirectToDistributors).toBe(false);
  });

  it('debe rechazar correctamente un pedido insuficiente y sugerir distribuidores', () => {
    // Escenario: Un cliente individual quiere 1kg local
    const order: Order = {
      items: [
        { product: mockProducts[0], quantity: 1 } // Solo 1kg
      ],
      destinationZone: 'local'
    };

    const result = OrderValidationService.validateOrder(order);
    
    expect(result.totalVolume).toBe(1.0);
    expect(result.isValid).toBe(false);
    expect(result.shouldRedirectToDistributors).toBe(true);
    expect(result.message).toContain('2.5');
  });

  it('debe manejar el caso límite justo en el mínimo', () => {
    // Escenario: Pedido exactamente en el mínimo
    const order: Order = {
      items: [
        { product: mockProducts[0], quantity: 2 },   // 2kg
        { product: mockProducts[2], quantity: 1 }    // 0.5kg
      ],
      destinationZone: 'local'
    };

    const result = OrderValidationService.validateOrder(order);
    
    expect(result.totalVolume).toBe(2.5);
    expect(result.isValid).toBe(true);
    expect(result.minimumRequired).toBe(2.5);
  });
});
