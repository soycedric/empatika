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
  pickupPoint: string;
  pickupSlot: string;
  deliveryLocationLink: string;
  density?: CalculatorDensity;
  onZoneChange: (zone: DeliveryZone) => void;
  onMethodChange: (method: DeliveryMethod) => void;
  onCustomerNameChange: (name: string) => void;
  onCustomerPhoneChange: (phone: string) => void;
  onPickupPointChange: (point: string) => void;
  onPickupSlotChange: (slot: string) => void;
  onDeliveryLocationChange: (location: string) => void;
}

export const ProductSelector = ({
  deliveryZone,
  deliveryMethod,
  customerName,
  customerPhone,
  pickupPoint,
  pickupSlot,
  deliveryLocationLink,
  density = 'default',
  onZoneChange,
  onMethodChange,
  onCustomerNameChange,
  onCustomerPhoneChange,
  onPickupPointChange,
  onPickupSlotChange,
  onDeliveryLocationChange,
}: ProductSelectorProps) => {
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [locationStatus, setLocationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const isPickup = deliveryZone === 'cdmx' || deliveryMethod === 'pickup';
  const compact = isCompactDensity(density);

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
  const locationButtonClass = locationStatus === 'success'
    ? 'bg-green-600 text-white'
    : locationStatus === 'error'
      ? 'bg-red-600 text-white'
      : 'bg-foreground text-background';

  const pickupSlots = deliveryZone === 'cdmx'
    ? pickupPoint.startsWith('Parque Delta')
      ? cdmxDeltaSlots
      : pickupPoint.startsWith('Biblioteca Central')
        ? cdmxUnamSlots
        : []
    : pueblaSlots;

  return (
    <div className={compact ? "space-y-3" : "bg-background border-4 border-foreground shadow-brutal p-6"}>
      <h3 className={compact ? "font-display text-lg flex items-center gap-2" : "font-display text-2xl mb-4 flex items-center gap-2"}>
        <ShoppingCart className="w-6 h-6" />
        ARMA TU PEDIDO
      </h3>

      {/* Paso 1: Ciudad */}
      <div id="step-city" className={compact ? "space-y-2" : "mb-4 p-3 bg-muted border-2 border-foreground/20"}>
        <div className={compact ? "flex items-center gap-2" : "flex items-center gap-2 mb-2"}>
          <MapPin className="w-4 h-4 text-foreground" />
          <label className={compact ? "text-[10px] font-display uppercase tracking-wider text-muted-foreground" : "text-xs font-display uppercase tracking-wider text-muted-foreground"}>
            {compact ? 'Ciudad' : 'Paso 1: Ciudad'}
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

      {/* Paso 2: Envio o Pickup */}
      <div id="step-method" className={compact ? "space-y-2" : "mb-4 p-3 bg-muted border-2 border-foreground/20"}>
        <div className={compact ? "flex items-center gap-2" : "flex items-center gap-2 mb-2"}>
          <Truck className="w-4 h-4 text-foreground" />
          <label className={compact ? "text-[10px] font-display uppercase tracking-wider text-muted-foreground" : "text-xs font-display uppercase tracking-wider text-muted-foreground"}>
            {compact ? 'Entrega' : 'Paso 2: Envio o Pickup'}
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
          <p className={compact ? "text-[11px] text-muted-foreground" : "text-xs text-muted-foreground mt-2"}>
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
          className={compact ? "space-y-2" : "mb-4 p-3 bg-foreground/5 border-2 border-foreground/30 rounded"}
        >
          <p className={compact ? "text-[10px] font-display uppercase tracking-wider text-muted-foreground" : "text-xs font-display uppercase tracking-wider text-muted-foreground mb-2"}>
            {compact ? 'Ubicacion' : 'Paso 3: Compartir ubicacion'}
          </p>
          <Button
            type="button"
            onClick={handleShareLocation}
            id="delivery-location"
            className={`w-full border-2 border-foreground ${locationButtonClass}`}
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
          <div className={compact ? "flex items-center justify-between gap-2" : "mt-2 flex items-center justify-between gap-2"}>
            <p className={compact ? "text-[11px] text-muted-foreground" : "text-xs text-muted-foreground"}>
              Este paso es obligatorio para envio.
            </p>
            {locationStatus !== 'idle' && (
              <button
                type="button"
                onClick={resetLocationStatus}
                className={compact ? "text-[11px] font-display uppercase underline" : "text-xs font-display uppercase underline"}
              >
                Reintentar
              </button>
            )}
          </div>
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
          className={compact ? "space-y-2" : "mb-4 p-3 bg-foreground/5 border-2 border-foreground/30 rounded"}
        >
          <p className={compact ? "text-[10px] font-display uppercase tracking-wider text-muted-foreground" : "text-xs font-display uppercase tracking-wider text-muted-foreground mb-2"}>
            {compact ? 'Pickup y horario' : 'Paso 3: Pickup + horario'}
          </p>
          {deliveryZone === 'cdmx' ? (
            <Select value={pickupPoint} onValueChange={onPickupPointChange}>
              <SelectTrigger id="pickup-point" className="border-2 border-foreground">
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
          <div className={compact ? "" : "mt-3"}>
            <Select value={pickupSlot} onValueChange={onPickupSlotChange}>
              <SelectTrigger id="pickup-slot" className="border-2 border-foreground" disabled={pickupSlots.length === 0}>
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
          <p className={compact ? "text-[11px] text-muted-foreground" : "text-xs text-muted-foreground mt-2"}>
            Este paso es obligatorio para pickup.
          </p>
        </motion.div>
      )}

      {/* Datos de contacto */}
      <div id="step-contact" className={compact ? "space-y-2" : "mb-4 p-3 bg-muted border-2 border-foreground/20"}>
        <label className={compact ? "text-[10px] font-display uppercase tracking-wider text-muted-foreground" : "text-xs font-display uppercase tracking-wider text-muted-foreground"}>
          Datos de contacto
        </label>
        <div className={compact ? "grid sm:grid-cols-2 gap-2" : "grid sm:grid-cols-2 gap-3 mt-3"}>
          <Input
            id="customer-name"
            value={customerName}
            onChange={(event) => onCustomerNameChange(event.target.value)}
            placeholder="Nombre"
            className="border-2 border-foreground"
          />
          <Input
            id="customer-phone"
            value={customerPhone}
            onChange={(event) => onCustomerPhoneChange(event.target.value)}
            placeholder="Telefono"
            className="border-2 border-foreground"
          />
        </div>
      </div>
    </div>
  );
};
