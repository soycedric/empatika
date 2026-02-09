/**
 * Strategy Pattern para validación de pedidos por zona
 * Patrón: Strategy + Factory
 * 
 * Cada estrategia representa las reglas de negocio específicas
 * para cada zona de entrega.
 */

import type { Order, ValidationResult, ZoneConfig, ZoneType } from '@/types/order';

/**
 * Interfaz Strategy - Contrato que todas las estrategias deben cumplir
 */
export interface ZoneValidationStrategy {
  readonly config: ZoneConfig;
  validate(order: Order): ValidationResult;
}

/**
 * Estrategia para entregas locales (Puebla y alrededores)
 * Volumen mínimo: 3 kg
 */
export class LocalZoneStrategy implements ZoneValidationStrategy {
  readonly config: ZoneConfig = {
    name: 'Local (Puebla)',
    minimumVolume: 2.5,
    description: 'Entregas en Puebla y municipios aledaños'
  };

  validate(order: Order): ValidationResult {
    const totalVolume = this.calculateTotalVolume(order);
    const isValid = totalVolume >= this.config.minimumVolume;

    return {
      isValid,
      totalVolume,
      minimumRequired: this.config.minimumVolume,
      zone: 'local',
      message: isValid
        ? `✅ Pedido válido para entrega local. Total: ${totalVolume.toFixed(2)} kg`
        : `❌ Pedido insuficiente. Necesitas al menos ${this.config.minimumVolume} kg. Actual: ${totalVolume.toFixed(2)} kg`,
      shouldRedirectToDistributors: !isValid
    };
  }

  private calculateTotalVolume(order: Order): number {
    return order.items.reduce((total, item) => {
      return total + (item.product.weight * item.quantity);
    }, 0);
  }
}

/**
 * Estrategia para entregas regionales (estados cercanos)
 * Volumen mínimo: 5 kg
 */
export class RegionalZoneStrategy implements ZoneValidationStrategy {
  readonly config: ZoneConfig = {
    name: 'Regional',
    minimumVolume: 5.0,
    description: 'Entregas en estados cercanos a Puebla'
  };

  validate(order: Order): ValidationResult {
    const totalVolume = this.calculateTotalVolume(order);
    const isValid = totalVolume >= this.config.minimumVolume;

    return {
      isValid,
      totalVolume,
      minimumRequired: this.config.minimumVolume,
      zone: 'regional',
      message: isValid
        ? `✅ Pedido válido para entrega regional. Total: ${totalVolume.toFixed(2)} kg`
        : `❌ Pedido insuficiente para envío regional. Necesitas al menos ${this.config.minimumVolume} kg. Actual: ${totalVolume.toFixed(2)} kg`,
      shouldRedirectToDistributors: !isValid
    };
  }

  private calculateTotalVolume(order: Order): number {
    return order.items.reduce((total, item) => {
      return total + (item.product.weight * item.quantity);
    }, 0);
  }
}

/**
 * Estrategia para entregas nacionales
 * Volumen mínimo: 10 kg
 */
export class NationalZoneStrategy implements ZoneValidationStrategy {
  readonly config: ZoneConfig = {
    name: 'Nacional',
    minimumVolume: 10.0,
    description: 'Entregas a toda la República Mexicana'
  };

  validate(order: Order): ValidationResult {
    const totalVolume = this.calculateTotalVolume(order);
    const isValid = totalVolume >= this.config.minimumVolume;

    return {
      isValid,
      totalVolume,
      minimumRequired: this.config.minimumVolume,
      zone: 'nacional',
      message: isValid
        ? `✅ Pedido válido para entrega nacional. Total: ${totalVolume.toFixed(2)} kg`
        : `❌ Pedido insuficiente para envío nacional. Necesitas al menos ${this.config.minimumVolume} kg. Actual: ${totalVolume.toFixed(2)} kg`,
      shouldRedirectToDistributors: !isValid
    };
  }

  private calculateTotalVolume(order: Order): number {
    return order.items.reduce((total, item) => {
      return total + (item.product.weight * item.quantity);
    }, 0);
  }
}

/**
 * Factory Pattern - Crea la estrategia apropiada según la zona
 */
export class ZoneStrategyFactory {
  private static strategies = new Map<ZoneType, ZoneValidationStrategy>([
    ['local', new LocalZoneStrategy()],
    ['regional', new RegionalZoneStrategy()],
    ['nacional', new NationalZoneStrategy()]
  ]);

  /**
   * Obtiene la estrategia de validación para una zona específica
   */
  static getStrategy(zone: ZoneType): ZoneValidationStrategy {
    const strategy = this.strategies.get(zone);
    
    if (!strategy) {
      throw new Error(`No existe estrategia para la zona: ${zone}`);
    }
    
    return strategy;
  }

  /**
   * Obtiene todas las configuraciones de zonas disponibles
   */
  static getAllZoneConfigs(): Record<ZoneType, ZoneConfig> {
    const configs: Record<ZoneType, ZoneConfig> = {} as Record<ZoneType, ZoneConfig>;
    
    this.strategies.forEach((strategy, zone) => {
      configs[zone] = strategy.config;
    });
    
    return configs;
  }
}
