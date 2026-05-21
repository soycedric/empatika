/**
 * Subcomponente: Selector de productos para la calculadora
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, MapPin, Truck } from 'lucide-react';
import type { CalculatorDensity } from '@/components/calculator/types';
import { isCompactDensity } from '@/components/calculator/types';

type DeliveryZone = 'puebla' | 'cdmx';
type DeliveryMethod = 'delivery' | 'pickup';

const DELIVERY_ZONES: Record<DeliveryZone, string> = {
  puebla: 'Puebla',
  cdmx: 'Ciudad de México',
};

const CDMX_PICKUP_POINTS = [
  'Parque Delta (10 am a 2 pm)',
  'Biblioteca Central UNAM (2 pm a 6 pm)',
];

interface ProductSelectorProps {
  deliveryZone: DeliveryZone;
  deliveryMethod: DeliveryMethod;
  customerName: string;
  customerPhone: string;
  pickupPoint: string;
  pickupSlot: string;
  deliveryLocationLink: string;
  onZoneChange: (zone: DeliveryZone) => void;
  onMethodChange: (method: DeliveryMethod) => void;
  onCustomerNameChange: (name: string) => void;
  onCustomerPhoneChange: (phone: string) => void;
  onPickupPointChange: (point: string) => void;
  onPickupSlotChange: (slot: string) => void;
  onDeliveryLocationChange: (location: string) => void;
  density?: CalculatorDensity;
}

export const ProductSelector = ({
  deliveryZone,
  deliveryMethod,
  customerName,
  customerPhone,
  pickupPoint,
  pickupSlot,
  deliveryLocationLink,
  onZoneChange,
  onMethodChange,
  onCustomerNameChange,
  onCustomerPhoneChange,
  onPickupPointChange,
  onPickupSlotChange,
  onDeliveryLocationChange,
  density = 'default',
}: ProductSelectorProps) => {
  const compact = isCompactDensity(density);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [locationStatus, setLocationStatus] = useState<'idle' | 'success' | 'error'>('idle');
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
      setLocationStatus('error');
      return;
    }
    setLocationError('');
    setLocationStatus('idle');
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const link = `https://maps.google.com/?q=${latitude},${longitude}`;
        onDeliveryLocationChange(link);
        setLocationStatus('success');
        setIsLocating(false);
      },
      () => {
        setLocationError('No pudimos obtener tu ubicacion.');
        setLocationStatus('error');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const resetLocationStatus = () => {
    setLocationStatus('idle');
    setLocationError('');
    onDeliveryLocationChange('');
  };

  const isLocationLocked = isLocating || locationStatus !== 'idle';
  const locationButtonClass =
    locationStatus === 'success'
      ? 'bg-green-600 text-white'
      : locationStatus === 'error'
        ? 'bg-red-600 text-white'
        : 'bg-foreground text-background';

  const pickupSlots =
    deliveryZone === 'cdmx'
      ? pickupPoint.startsWith('Parque Delta')
        ? cdmxDeltaSlots
        : pickupPoint.startsWith('Biblioteca Central')
          ? cdmxUnamSlots
          : []
      : pueblaSlots;

  const cardClass = compact
    ? 'bg-background border-2 border-foreground shadow-brutal p-3'
    : 'bg-background border-4 border-foreground shadow-brutal p-6';
  const stepClass = compact
    ? 'mb-2 p-2 bg-muted border-2 border-foreground/20'
    : 'mb-4 p-3 bg-muted border-2 border-foreground/20';
  const conditionalStepClass = compact
    ? 'mb-2 p-2 bg-foreground/5 border-2 border-foreground/30 rounded'
    : 'mb-4 p-3 bg-foreground/5 border-2 border-foreground/30 rounded';

  return (
    <div className={cardClass}>
      <h3
        className={`font-display flex items-center gap-2 ${compact ? 'text-lg mb-2' : 'text-2xl mb-4'}`}
      >
        <ShoppingCart className={compact ? 'w-4 h-4' : 'w-6 h-6'} />
        {compact ? 'ENTREGA Y CONTACTO' : 'ARMA TU PEDIDO'}
      </h3>

      {compact ? (
        <div id="step-city-method" className={`${stepClass} space-y-2`}>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-foreground shrink-0" />
            <Select value={deliveryZone} onValueChange={(value) => onZoneChange(value as DeliveryZone)}>
              <SelectTrigger id="delivery-zone" className="h-8 border-2 border-foreground text-sm">
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
          <div className="flex gap-1.5">
            <Button
              type="button"
              onClick={() => onMethodChange('delivery')}
              disabled={deliveryZone === 'cdmx'}
              className={`flex-1 h-8 text-xs border-2 border-foreground ${
                deliveryMethod === 'delivery'
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
              className={`flex-1 h-8 text-xs border-2 border-foreground ${
                isPickup ? 'bg-foreground text-background' : 'bg-background text-foreground'
              }`}
              aria-pressed={isPickup}
            >
              Pickup
            </Button>
          </div>
          {deliveryZone === 'cdmx' && (
            <p className="text-[10px] text-muted-foreground">CDMX: solo pickup, viernes.</p>
          )}
        </div>
      ) : (
        <>
          <div id="step-city" className={stepClass}>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-foreground" />
              <label className="text-xs font-display uppercase tracking-wider text-muted-foreground">
                Paso 1: Ciudad
              </label>
            </div>
            <Select value={deliveryZone} onValueChange={(value) => onZoneChange(value as DeliveryZone)}>
              <SelectTrigger id="delivery-zone" className="border-2 border-foreground">
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

          <div id="step-method" className={stepClass}>
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
                className={`flex-1 border-2 border-foreground ${
                  deliveryMethod === 'delivery'
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
                className={`flex-1 border-2 border-foreground ${
                  isPickup ? 'bg-foreground text-background' : 'bg-background text-foreground'
                }`}
                aria-pressed={isPickup}
              >
                Pickup
              </Button>
            </div>
            {deliveryZone === 'cdmx' && (
              <p className="text-xs text-muted-foreground mt-2">En CDMX solo hay pickup. Solo viernes.</p>
            )}
          </div>
        </>
      )}

      {deliveryMethod === 'delivery' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={conditionalStepClass}
        >
          <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2">
            {compact ? 'Ubicacion' : 'Paso 3: Compartir ubicacion'}
          </p>
          <Button
            type="button"
            onClick={handleShareLocation}
            id="delivery-location"
            className={`w-full border-2 border-foreground ${locationButtonClass} ${compact ? 'h-8 text-xs' : ''}`}
            disabled={isLocationLocked}
          >
            {isLocating
              ? 'Compartiendo...'
              : locationStatus === 'success'
                ? 'Ubicacion compartida'
                : locationStatus === 'error'
                  ? 'No se pudo compartir'
                  : 'Compartir ubicacion'}
          </Button>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            {!compact && (
              <p className="text-xs text-muted-foreground">Este paso es obligatorio para envio.</p>
            )}
            {locationStatus !== 'idle' && (
              <button
                type="button"
                onClick={resetLocationStatus}
                className="text-xs font-display uppercase underline ml-auto"
              >
                Reintentar
              </button>
            )}
          </div>
          {locationError && <p className="text-xs text-destructive mt-1">{locationError}</p>}
        </motion.div>
      )}

      {isPickup && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={conditionalStepClass}
        >
          <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2">
            {compact ? 'Pickup' : 'Paso 3: Pickup + horario'}
          </p>
          {deliveryZone === 'cdmx' ? (
            <Select value={pickupPoint} onValueChange={onPickupPointChange}>
              <SelectTrigger
                id="pickup-point"
                className={`border-2 border-foreground ${compact ? 'h-8 text-sm' : ''}`}
              >
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
            <a
              href="https://maps.google.com/?q=19.035708082832254,-98.20995033301674"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground underline"
            >
              Ver punto de pickup en Puebla
            </a>
          )}
          <div className={compact ? 'mt-2' : 'mt-3'}>
            <Select value={pickupSlot} onValueChange={onPickupSlotChange}>
              <SelectTrigger
                id="pickup-slot"
                className={`border-2 border-foreground ${compact ? 'h-8 text-sm' : ''}`}
                disabled={pickupSlots.length === 0}
              >
                <SelectValue
                  placeholder={pickupSlots.length > 0 ? 'Selecciona horario' : 'Selecciona punto primero'}
                />
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
          {!compact && (
            <p className="text-xs text-muted-foreground mt-2">Este paso es obligatorio para pickup.</p>
          )}
        </motion.div>
      )}

      <div id="step-contact" className={compact ? 'p-2 bg-muted border-2 border-foreground/20' : stepClass}>
        <label className="text-xs font-display uppercase tracking-wider text-muted-foreground">
          Contacto
        </label>
        <div className={`flex flex-col gap-2 mt-2 ${compact ? '' : 'sm:grid sm:grid-cols-2 sm:gap-3 sm:mt-3'}`}>
          <Input
            id="customer-name"
            value={customerName}
            onChange={(event) => onCustomerNameChange(event.target.value)}
            placeholder="Nombre"
            className={`border-2 border-foreground ${compact ? 'h-8 text-sm' : ''}`}
          />
          <Input
            id="customer-phone"
            value={customerPhone}
            onChange={(event) => onCustomerPhoneChange(event.target.value)}
            placeholder="Telefono"
            className={`border-2 border-foreground ${compact ? 'h-8 text-sm' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};
