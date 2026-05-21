/** Número de WhatsApp Empátika: +52 221 560 6205 */
export const WHATSAPP_PHONE_E164 = '522215606205';

export const WHATSAPP_PHONE_DISPLAY = '+52 221 560 6205';

export const whatsappHref = (text?: string) =>
  text
    ? `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${WHATSAPP_PHONE_E164}`;
