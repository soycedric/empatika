/**
 * Hook: construye y envia el pedido por WhatsApp.
 */

import { toast } from 'sonner';
import { useOrderContext } from '@/contexts/OrderContext';

const DELIVERY_ZONES = {
  puebla: 'Puebla',
  cdmx: 'Ciudad de Mexico',
} as const;

export const useOrderSubmit = () => {
  const {
    items,
    validation,
    subtotal,
    shippingCost,
    totalWithShipping,
    freeShippingThreshold,
    deliveryZone,
    deliveryMethod,
    customerName,
    customerPhone,
    pickupPoint,
    deliveryDate,
    deliveryLocationLink,
  } = useOrderContext();

  const handleCalculate = () => {
    const isPickup = deliveryZone === 'cdmx' || deliveryMethod === 'pickup';
    const hasContact = customerName.trim().length > 0 && customerPhone.trim().length > 0;
    const hasDeliveryLocation = deliveryLocationLink.trim().length > 0;
    const hasPickupInfo = pickupPoint.trim().length > 0;
    const hasDate = deliveryDate.trim().length > 0;

    const scrollToField = (fieldId: string) => {
      const target = document.getElementById(fieldId);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        target.focus();
      }
    };

    if (!hasContact) {
      if (customerName.trim().length === 0) {
        scrollToField('customer-name');
      } else if (customerPhone.trim().length === 0) {
        scrollToField('customer-phone');
      } else {
        scrollToField('step-contact');
      }
      toast.error('Faltan datos de contacto', {
        description: 'Agrega tu nombre y telefono para continuar.'
      });
      return;
    }

    if (!hasDate) {
      scrollToField('delivery-date');
      toast.error('Falta la fecha de entrega', {
        description: 'Selecciona una fecha disponible en el calendario.'
      });
      return;
    }

    if (!isPickup && !hasDeliveryLocation) {
      scrollToField('delivery-location');
      toast.error('Falta la ubicacion', {
        description: 'Pega tus coordenadas para envio.'
      });
      return;
    }

    if (isPickup && !hasPickupInfo) {
      scrollToField('pickup-point');
      toast.error('Falta el punto de pickup', {
        description: 'Selecciona o escribe tu punto de pickup para continuar.'
      });
      return;
    }

    if (validation.shouldRedirectToDistributors) {
      document.getElementById('distribuidores')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const phoneNumber = '522215606205';
    const sanitize = (text: string) => text.replace(/[<>"'&]/g, '');

    /** Formatea "2025-06-20" -> "viernes, 20 de junio de 2025" */
    const formatDate = (iso: string): string => {
      if (!iso) return '';
      const [year, month, day] = iso.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString('es-MX', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    };

    const lines: string[] = [];
    lines.push(isPickup
      ? 'Hola! Quiero hacer un pedido para recoger:'
      : subtotal >= freeShippingThreshold
        ? 'Hola! Quiero hacer un pedido con envio gratis:'
        : `Hola! Quiero hacer un pedido con envio (costo $${shippingCost.toFixed(0)}):`);
    lines.push('');
    lines.push(`Cliente: ${sanitize(customerName)}`);
    lines.push(`Telefono: ${sanitize(customerPhone)}`);
    lines.push(`Zona: ${sanitize(DELIVERY_ZONES[deliveryZone])}`);
    lines.push(`Metodo: ${isPickup ? 'Pickup' : 'Envio'}`);
    lines.push(`Fecha de entrega: ${formatDate(deliveryDate)}`);

    if (isPickup) {
      lines.push('');
      lines.push(`Punto de pickup: ${sanitize(pickupPoint)}`);
      lines.push('Horario: A coordinar por WhatsApp');
    } else {
      lines.push('');
      lines.push(`Ubicacion: ${sanitize(deliveryLocationLink)}`);
    }

    lines.push('');
    lines.push(`Subtotal: $${subtotal.toFixed(0)} MXN`);
    lines.push(`Envio: $${shippingCost.toFixed(0)} MXN`);
    lines.push(`Total: $${totalWithShipping.toFixed(0)} MXN`);
    lines.push('');
    lines.push('Productos:');

    items.forEach((item, i) => {
      const weight = (item.product.weight * item.quantity).toFixed(2);
      const lineTotal = item.product.price * item.quantity;
      lines.push(`${i + 1}. ${sanitize(item.product.name)} (${item.product.weight}kg) x${item.quantity} = ${weight}kg - $${lineTotal}`);
    });

    const encodedMessage = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
  };

  return { handleCalculate };
};
