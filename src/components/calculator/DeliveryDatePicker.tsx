/**
 * Componente: Selector de Fecha de Entrega
 * Wrapper de Flatpickr con días habilitados según la zona de entrega.
 * - Puebla: Jueves, Viernes, Sábado
 * - CDMX:   Solo Viernes
 * Mínimo 2 días de anticipación, máximo 30 días.
 *
 * Decisiones de implementación:
 * - Usa `disable` (en vez de `enable`) para mayor compatibilidad con minDate.
 * - Sin `altInput` para evitar que el input estilizado quede oculto.
 * - `onChangeRef` evita el stale closure en el callback de flatpickr.
 */

import { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import 'flatpickr/dist/flatpickr.min.css';
import type { Instance } from 'flatpickr/dist/types/instance';
import type { CalculatorDensity } from '@/components/calculator/types';

type DeliveryZone = 'puebla' | 'cdmx';

interface DeliveryDatePickerProps {
  deliveryZone: DeliveryZone;
  value: string;
  onChange: (date: string) => void;
  density?: CalculatorDensity;
}

/** Días habilitados por zona (getDay(): 0=Dom, 1=Lun … 4=Jue, 5=Vie, 6=Sáb) */
const ENABLED_DAYS: Record<DeliveryZone, number[]> = {
  puebla: [4, 5, 6], // Jueves, Viernes, Sábado
  cdmx:   [5],       // Solo Viernes
};

const ZONE_HINT: Record<DeliveryZone, string> = {
  puebla: 'Disponible: Jue · Vie · Sáb',
  cdmx:   'Disponible: Solo Viernes',
};

/** ISO "YYYY-MM-DD" → texto legible en español */
const formatDisplay = (iso: string): string => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const DeliveryDatePicker = ({
  deliveryZone,
  value,
  onChange,
  density = 'default',
}: DeliveryDatePickerProps) => {
  const inputRef   = useRef<HTMLInputElement>(null);
  const fpRef      = useRef<Instance | null>(null);
  /** Ref para callback — evita stale closure sin re-inicializar flatpickr */
  const onChangeRef = useRef(onChange);
  const compact = density === 'compact';

  // Mantener onChangeRef siempre actualizado
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Inicializar / re-inicializar al cambiar zona
  useEffect(() => {
    if (!inputRef.current) return;

    const enabledDays = ENABLED_DAYS[deliveryZone];

    // minDate: 2 días de anticipación desde hoy (iniciando el día a las 00:00)
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    minDate.setHours(0, 0, 0, 0);

    // maxDate: 30 días hacia adelante
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    maxDate.setHours(23, 59, 59, 999);

    fpRef.current = flatpickr(inputRef.current, {
      locale: Spanish,
      dateFormat: 'Y-m-d',
      // SIN altInput — el input que renderizamos es el que el usuario ve
      minDate,
      maxDate,
      disableMobile: true,
      static: true, // Renderiza el calendario en el DOM local, evitando bugs de clics y portales
      disable: [
        (date: Date) => !enabledDays.includes(date.getDay()),
      ],
      onChange: (selectedDates, dateStr) => {
        onChangeRef.current(dateStr);
      },
      onClose: () => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      },
    });

    // Restaurar valor previo si existe (p.ej. al montar con valor inicial)
    if (value) {
      fpRef.current.setDate(value, false);
    }

    return () => {
      fpRef.current?.destroy();
      fpRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryZone]);

  // Sincronizar estado de React hacia Flatpickr
  useEffect(() => {
    if (!fpRef.current) return;
    
    // Lo que Flatpickr tiene seleccionado internamente
    const currentDates = fpRef.current.selectedDates;
    const hasSelection = currentDates.length > 0;
    
    if (!value) {
      if (hasSelection) {
        fpRef.current.clear(false);
      }
    } else {
      // Comparar la fecha actual seleccionada para no repintar innecesariamente
      // Usar formatDate de flatpickr para evitar bugs de zona horaria con toISOString
      const selectedDateStr = hasSelection ? fpRef.current.formatDate(currentDates[0], 'Y-m-d') : '';
      const isSame = selectedDateStr === value;

      if (!isSame) {
        fpRef.current.setDate(value, false);
      }
    }
  }, [value]);

  const compact2 = compact; // alias para legibilidad en JSX

  return (
    <div className={compact2 ? 'space-y-1' : 'space-y-2'}>
      {/* El input que referencia flatpickr: VISIBLE, con nuestros estilos */}
      <input
        ref={inputRef}
        id="delivery-date"
        type="text"
        placeholder="Toca para elegir fecha..."
        readOnly
        className={[
          'w-full border-2 border-foreground bg-background px-3',
          'font-body placeholder:text-muted-foreground',
          'focus:outline-none cursor-pointer',
          'transition-colors hover:bg-muted/40',
          compact2 ? 'text-xs py-1.5' : 'text-sm py-2',
          value ? 'text-foreground font-medium' : 'text-muted-foreground',
        ].join(' ')}
      />

      {/* Fecha seleccionada en texto legible (independiente del input) */}
      {value && (
        <p className={compact2 ? 'text-xs text-foreground font-medium' : 'text-sm text-foreground font-medium'}>
          📅 {formatDisplay(value)}
        </p>
      )}

      <p className={compact2 ? 'text-[10px] text-muted-foreground' : 'text-xs text-muted-foreground'}>
        {ZONE_HINT[deliveryZone]}
      </p>
    </div>
  );
};
