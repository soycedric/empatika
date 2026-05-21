import { motion } from 'framer-motion';

const DeliveryFridaysBanner = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-4 border-2 border-foreground bg-foreground/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
  >
    <div>
      <p className="font-display text-sm mb-1">
        Todos los viernes entrega de productos en CDMX
      </p>
      <p className="text-dymo text-sm rotate-1">Parque Delta y Biblioteca Central UNAM</p>
    </div>
    <a
      href="#productos"
      className="inline-flex items-center justify-center px-6 py-3 font-display text-xs uppercase border-[3px] border-foreground bg-foreground text-background whitespace-nowrap shadow-brutal transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg shrink-0"
    >
      Comprar ahora
    </a>
  </motion.div>
);

export default DeliveryFridaysBanner;
