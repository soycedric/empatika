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
    weight: 1.0,
    price: 130
  },
  {
    id: 'tofu-400g',
    name: 'Tofu Extra Firme',
    variant: 'extra-firme',
    weight: 0.4,
    price: 75
  },
  {
    id: 'veganesa-500g',
    name: 'Veganesa',
    variant: 'veganesa',
    weight: 0.5,
    price: 75
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
    it('debe invalidar un pedido vacío', () => {
      const result = OrderValidationService.validateOrder([]);

      expect(result.isValid).toBe(false);
      expect(result.shouldRedirectToDistributors).toBe(false);
      expect(result.message).toContain('Agrega productos');
    });

    it('debe cobrar envio cuando el subtotal es menor a $400', () => {
      const items = [
        { product: mockProducts[0], quantity: 1 } // $130
      ];

      const result = OrderValidationService.validateOrder(items, 'puebla', 'delivery');

      expect(result.isValid).toBe(true);
      expect(result.subtotal).toBe(130);
      expect(result.shippingCost).toBe(50);
      expect(result.totalWithShipping).toBe(180);
    });

    it('debe cobrar envio cuando el subtotal esta entre $150 y $399', () => {
      const items = [
        { product: mockProducts[0], quantity: 2 } // $260
      ];

      const result = OrderValidationService.validateOrder(items, 'puebla', 'delivery');

      expect(result.isValid).toBe(true);
      expect(result.subtotal).toBe(260);
      expect(result.shippingCost).toBe(50);
      expect(result.totalWithShipping).toBe(310);
    });

    it('debe dar envio gratis cuando el subtotal es $400 o mas', () => {
      const items = [
        { product: mockProducts[0], quantity: 4 } // $520
      ];

      const result = OrderValidationService.validateOrder(items, 'puebla', 'delivery');

      expect(result.isValid).toBe(true);
      expect(result.subtotal).toBe(520);
      expect(result.shippingCost).toBe(0);
      expect(result.totalWithShipping).toBe(520);
    });
  });

  describe('getRemainingVolume', () => {
    it('debe calcular correctamente el monto faltante para envio gratis', () => {
      const remaining = OrderValidationService.getRemainingVolume(100);
      expect(remaining).toBe(300); // 400 - 100
    });

    it('debe retornar 0 cuando ya cumple el minimo de envio gratis', () => {
      const remaining = OrderValidationService.getRemainingVolume(400);
      expect(remaining).toBe(0);
    });

    it('debe retornar 0 cuando excede el minimo de envio gratis', () => {
      const remaining = OrderValidationService.getRemainingVolume(450);
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
    const items = [
      { product: mockProducts[0], quantity: 3 },
      { product: mockProducts[1], quantity: 5 },
      { product: mockProducts[2], quantity: 2 }
    ];

    const result = OrderValidationService.validateOrder(items, 'puebla', 'delivery');

    expect(result.subtotal).toBe(915);
    expect(result.isValid).toBe(true);
    expect(result.shippingCost).toBe(0);
    expect(result.shouldRedirectToDistributors).toBe(false);
  });

  it('debe rechazar correctamente un pedido insuficiente y sugerir distribuidores', () => {
    const items = [
      { product: mockProducts[0], quantity: 1 }
    ];

    const result = OrderValidationService.validateOrder(items, 'puebla', 'delivery');

    expect(result.subtotal).toBe(130);
    expect(result.isValid).toBe(true);
    expect(result.shouldRedirectToDistributors).toBe(false);
    expect(result.shippingCost).toBe(50);
  });

  it('debe cobrar envio en el caso límite de $150', () => {
    const items = [
      { product: mockProducts[1], quantity: 2 }
    ];

    const result = OrderValidationService.validateOrder(items, 'puebla', 'delivery');

    expect(result.subtotal).toBe(150);
    expect(result.isValid).toBe(true);
    expect(result.shippingCost).toBe(50);
  });
});
