/**
 * Subcomponente: Selector de productos para la calculadora
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Plus, MapPin, Truck } from 'lucide-react';
import type { Product } from '@/types/order';

type DeliveryZone = 'puebla' | 'cdmx';
type DeliveryMethod = 'delivery' | 'pickup';

const DELIVERY_ZONES: Record<DeliveryZone, string> = {
  puebla: 'Puebla',
  cdmx: 'Ciudad de México'
};

const CDMX_PICKUP_POINTS = [
  'Parque Delta',
  'Plaza Universidad',
  'Oasis Coyacán',
  'Biblioteca Central UNAM'
];

interface ProductSelectorProps {
  products: Product[];
  deliveryZone: DeliveryZone;
  deliveryMethod: DeliveryMethod;
  pickupPoint: string;
  onZoneChange: (zone: DeliveryZone) => void;
  onMethodChange: (method: DeliveryMethod) => void;
  onPickupPointChange: (point: string) => void;
  onAddProduct: (productId: string) => void;
}

export const ProductSelector = ({
  products,
  deliveryZone,
  deliveryMethod,
  pickupPoint,
  onZoneChange,
  onMethodChange,
  onPickupPointChange,
  onAddProduct
}: ProductSelectorProps) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const isPickup = deliveryZone === 'cdmx' || deliveryMethod === 'pickup';
  const isCitySelected = Boolean(deliveryZone);
  const hasPickupPoint = pickupPoint.trim().length > 0;
  const canSelectProducts = isCitySelected && (!isPickup || hasPickupPoint);

  const handleAdd = () => {
    if (selectedProductId && canSelectProducts) {
      onAddProduct(selectedProductId);
      setSelectedProductId('');
    }
  };

  return (
    <div className="bg-background border-4 border-foreground shadow-brutal p-6">
      <h3 className="font-display text-2xl mb-4 flex items-center gap-2">
        <ShoppingCart className="w-6 h-6" />
        ARMA TU PEDIDO
      </h3>

      {/* Paso 1: Ciudad */}
      <div className="mb-4 p-3 bg-muted border-2 border-foreground/20">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-foreground" />
          <label className="text-xs font-display uppercase tracking-wider text-muted-foreground">
            Paso 1: Ciudad
          </label>
        </div>
        <Select value={deliveryZone} onValueChange={(value) => onZoneChange(value as DeliveryZone)}>
          <SelectTrigger className="border-2 border-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(DELIVERY_ZONES).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Paso 2: Envio o Pickup */}
      <div className="mb-4 p-3 bg-muted border-2 border-foreground/20">
        <div className="flex items-center gap-2 mb-2">
          <Truck className="w-4 h-4 text-foreground" />
          <label className="text-xs font-display uppercase tracking-wider text-muted-foreground">
            Paso 2: Envio o Pickup
          </label>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => onMethodChange('delivery')}
            disabled={deliveryZone === 'cdmx'}
            className={`flex-1 border-2 border-foreground ${deliveryMethod === 'delivery'
              ? 'bg-foreground text-background'
              : 'bg-background text-foreground'
              }`}
            aria-pressed={deliveryMethod === 'delivery'}
          >
            Envio
          </Button>
          <Button
            type="button"
            onClick={() => onMethodChange('pickup')}
            className={`flex-1 border-2 border-foreground ${isPickup
              ? 'bg-foreground text-background'
              : 'bg-background text-foreground'
              }`}
            aria-pressed={isPickup}
          >
            Pickup
          </Button>
        </div>
        {deliveryZone === 'cdmx' && (
          <p className="text-xs text-muted-foreground mt-2">
            En CDMX solo hay pickup.
          </p>
        )}
      </div>

      {/* Paso 3: Punto de pickup */}
      {isPickup && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4 p-3 bg-foreground/5 border-2 border-foreground/30 rounded"
        >
          <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2">
            Paso 3: Punto de pickup
          </p>
          {deliveryZone === 'cdmx' ? (
            <Select value={pickupPoint} onValueChange={onPickupPointChange}>
              <SelectTrigger className="border-2 border-foreground">
                <SelectValue placeholder="Selecciona un punto" />
              </SelectTrigger>
              <SelectContent>
                {CDMX_PICKUP_POINTS.map((point) => (
                  <SelectItem key={point} value={point}>
                    {point}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              value={pickupPoint}
              onChange={(event) => onPickupPointChange(event.target.value)}
              placeholder="Escribe tu zona de pickup"
              className="border-2 border-foreground"
            />
          )}
        </motion.div>
      )}

      <div className="flex gap-2 pt-4">
        <Select value={selectedProductId} onValueChange={setSelectedProductId}>
          <SelectTrigger className="flex-1 border-2 border-foreground" disabled={!canSelectProducts}>
            <SelectValue placeholder={canSelectProducts ? 'Selecciona un producto' : 'Completa los pasos 1-3'} />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name} - {product.weight} kg
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleAdd}
          disabled={!selectedProductId || !canSelectProducts}
          size="icon"
          className="p-2 border-2 border-foreground bg-foreground text-background shadow-brutal hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform"
          aria-label="Agregar producto al pedido"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
