/**
 * Subcomponente: Selector de productos para la calculadora
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, MapPin, Truck } from 'lucide-react';

type DeliveryZone = 'puebla' | 'cdmx';
type DeliveryMethod = 'delivery' | 'pickup';

const DELIVERY_ZONES: Record<DeliveryZone, string> = {
  puebla: 'Puebla',
  cdmx: 'Ciudad de México'
};

const CDMX_PICKUP_POINTS = [
  'Parque Delta (10 am a 2 pm)',
  'Biblioteca Central UNAM (2 pm a 6 pm)'
];

interface ProductSelectorProps {
  deliveryZone: DeliveryZone;
  deliveryMethod: DeliveryMethod;
  customerName: string;
  customerPhone: string;
  providerInterest: boolean;
  pickupPoint: string;
  pickupSlot: string;
  deliveryLocationLink: string;
  onZoneChange: (zone: DeliveryZone) => void;
  onMethodChange: (method: DeliveryMethod) => void;
  onCustomerNameChange: (name: string) => void;
  onCustomerPhoneChange: (phone: string) => void;
  onProviderInterestChange: (value: boolean) => void;
  onPickupPointChange: (point: string) => void;
  onPickupSlotChange: (slot: string) => void;
  onDeliveryLocationChange: (location: string) => void;
}

export const ProductSelector = ({
  deliveryZone,
  deliveryMethod,
  customerName,
  customerPhone,
  providerInterest,
  pickupPoint,
  pickupSlot,
  deliveryLocationLink,
  onZoneChange,
  onMethodChange,
  onCustomerNameChange,
  onCustomerPhoneChange,
  onProviderInterestChange,
  onPickupPointChange,
  onPickupSlotChange,
  onDeliveryLocationChange,
}: ProductSelectorProps) => {
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const isPickup = deliveryZone === 'cdmx' || deliveryMethod === 'pickup';

  const buildTimeSlots = (start: string, end: string) => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    const slots: string[] = [];
    let currentMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    while (currentMinutes <= endMinutes - 30) {
      const endSlotMinutes = currentMinutes + 30;
      const format = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
      };
      slots.push(`${format(currentMinutes)} - ${format(endSlotMinutes)}`);
      currentMinutes = endSlotMinutes;
    }
    return slots;
  };

  const pueblaSlots = buildTimeSlots('09:00', '14:00');
  const cdmxDeltaSlots = buildTimeSlots('10:00', '14:00');
  const cdmxUnamSlots = buildTimeSlots('14:00', '18:00');

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Tu navegador no soporta geolocalizacion.');
      return;
    }
    setLocationError('');
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const link = `https://maps.google.com/?q=${latitude},${longitude}`;
        onDeliveryLocationChange(link);
        setIsLocating(false);
      },
      () => {
        setLocationError('No pudimos obtener tu ubicacion.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const pickupSlots = deliveryZone === 'cdmx'
    ? pickupPoint.startsWith('Parque Delta')
      ? cdmxDeltaSlots
      : pickupPoint.startsWith('Biblioteca Central')
        ? cdmxUnamSlots
        : []
    : pueblaSlots;

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
            En CDMX solo hay pickup. Solo viernes.
          </p>
        )}
      </div>

      {/* Paso 3: Ubicacion o Pickup */}
      {deliveryMethod === 'delivery' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4 p-3 bg-foreground/5 border-2 border-foreground/30 rounded"
        >
          <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2">
            Paso 3: Compartir ubicacion
          </p>
          <Button
            type="button"
            onClick={handleShareLocation}
            className="w-full border-2 border-foreground bg-foreground text-background"
            disabled={isLocating}
          >
            {deliveryLocationLink ? 'Ubicacion compartida' : isLocating ? 'Compartiendo...' : 'Compartir ubicacion'}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Te pediremos permiso para usar tu ubicacion.
          </p>
          {locationError && (
            <p className="text-xs text-destructive mt-2">
              {locationError}
            </p>
          )}
        </motion.div>
      )}

      {isPickup && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4 p-3 bg-foreground/5 border-2 border-foreground/30 rounded"
        >
          <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2">
            Paso 3: Pickup + horario
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
            <div className="space-y-2">
              <a
                href="https://maps.google.com/?q=19.035708082832254,-98.20995033301674"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground underline"
              >
                Ver punto de pickup en Puebla
              </a>
            </div>
          )}
          <div className="mt-3">
            <Select value={pickupSlot} onValueChange={onPickupSlotChange}>
              <SelectTrigger className="border-2 border-foreground" disabled={pickupSlots.length === 0}>
                <SelectValue placeholder={pickupSlots.length > 0 ? 'Selecciona horario' : 'Selecciona punto primero'} />
              </SelectTrigger>
              <SelectContent>
                {pickupSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      )}

      {/* Datos de contacto */}
      <div className="mb-4 p-3 bg-muted border-2 border-foreground/20">
        <label className="text-xs font-display uppercase tracking-wider text-muted-foreground">
          Datos de contacto
        </label>
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <Input
            value={customerName}
            onChange={(event) => onCustomerNameChange(event.target.value)}
            placeholder="Nombre"
            className="border-2 border-foreground"
          />
          <Input
            value={customerPhone}
            onChange={(event) => onCustomerPhoneChange(event.target.value)}
            placeholder="Telefono"
            className="border-2 border-foreground"
          />
        </div>
        <label className="flex items-center gap-2 mt-3 text-xs font-display text-foreground">
          <Checkbox
            checked={providerInterest}
            onCheckedChange={(value) => onProviderInterestChange(Boolean(value))}
            className="h-5 w-5 border-2 border-foreground data-[state=checked]:bg-foreground data-[state=checked]:text-background"
          />
          Me interesaria obtener precios de mayorista
        </label>
      </div>
    </div>
  );
};
