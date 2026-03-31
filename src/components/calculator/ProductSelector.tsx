/**
 * Subcomponente: Selector de productos para la calculadora
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Plus, MapPin } from 'lucide-react';
import type { Product } from '@/types/order';

type DeliveryZone = 'puebla' | 'cdmx';

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
  onZoneChange: (zone: DeliveryZone) => void;
  onAddProduct: (productId: string) => void;
}

export const ProductSelector = ({ products, deliveryZone, onZoneChange, onAddProduct }: ProductSelectorProps) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const handleAdd = () => {
    if (selectedProductId) {
      onAddProduct(selectedProductId);
      setSelectedProductId('');
    }
  };

  return (
    <div className="bg-background border-4 border-foreground shadow-brutal p-6">
      <h3 className="font-display text-2xl mb-4 flex items-center gap-2">
        <ShoppingCart className="w-6 h-6" />
        AGREGAR PRODUCTOS
      </h3>

      {/* Zona de entrega */}
      <div className="mb-4 p-3 bg-muted border-2 border-foreground/20">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-foreground" />
          <label className="text-xs font-display uppercase tracking-wider text-muted-foreground">
            Zona de entrega
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

      {/* Info de puntos de entrega CDMX */}
      {deliveryZone === 'cdmx' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-3 bg-foreground/5 border-2 border-foreground/30 rounded"
        >
          <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2">
            📦 Puntos de recogida en CDMX:
          </p>
          <ul className="text-xs space-y-1">
            {CDMX_PICKUP_POINTS.map((point, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-foreground">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <div className="flex gap-2 pt-4">
        <Select value={selectedProductId} onValueChange={setSelectedProductId}>
          <SelectTrigger className="flex-1 border-2 border-foreground">
            <SelectValue placeholder="Selecciona un producto" />
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
          disabled={!selectedProductId}
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
