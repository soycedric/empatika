import { motion } from "framer-motion";
import { Building2, Truck, Phone, ArrowRight } from "lucide-react";
import { withBaseUrl } from "@/lib/base-url";
import { whatsappHref } from "@/lib/whatsapp";

const benefits = [
  {
    icon: Building2,
    title: "Restaurantes & Hoteles",
    description: "Precios especiales por volumen y suministro constante.",
  },
  {
    icon: Truck,
    title: "Distribuidores",
    description: "Abastece tu menú con calidad premium y márgenes claros.",
  },
  {
    icon: Phone,
    title: "Atención Directa",
    description: "Canal exclusivo para cotizaciones al por mayor.",
  },
];

const B2BSection = () => {
  return (
    <section id="mayoristas" className="py-20 lg:py-32 bg-foreground text-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-10 h-full">
          {Array(100).fill(null).map((_, i) => (
            <div key={i} className="border border-background/10" />
          ))}
        </div>
      </div>

      {/* Tofucho pensando - haciendo negocios - Desktop */}
      <motion.div
        className="absolute top-20 right-10 hidden lg:block"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <img src={withBaseUrl("tofuchos/tofucho pensando.png")} alt="" aria-hidden="true" loading="lazy" className="w-28 h-28 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Tofucho ahumado - representando producto premium - Desktop */}
      <motion.div
        className="absolute bottom-20 left-10 hidden lg:block"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        <img src={withBaseUrl("tofuchos/tofucho ahumado.png")} alt="" aria-hidden="true" loading="lazy" className="w-24 h-24 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Tofucho corriendo - entregas - Desktop XL */}
      <motion.div
        className="absolute top-1/2 left-20 hidden xl:block"
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={withBaseUrl("tofuchos/tofucho corriendo.png")} alt="" aria-hidden="true" loading="lazy" className="w-20 h-20 object-contain opacity-80 drop-shadow-lg" />
      </motion.div>

      {/* Tofucho pensando - Mobile */}
      <motion.div
        className="absolute top-6 right-4 lg:hidden z-40"
        animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <img src={withBaseUrl("tofuchos/tofucho pensando.png")} alt="" aria-hidden="true" loading="lazy" className="w-20 h-20 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Tofucho ahumado - Mobile */}
      <motion.div
        className="absolute bottom-6 left-4 lg:hidden z-40"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <img src={withBaseUrl("tofuchos/tofucho ahumado.png")} alt="" aria-hidden="true" loading="lazy" className="w-16 h-16 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Tofucho corriendo - Mobile centro */}
      <motion.div
        className="absolute top-1/2 left-2 lg:hidden z-40"
        animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <img src={withBaseUrl("tofuchos/tofucho corriendo.png")} alt="" aria-hidden="true" loading="lazy" className="w-14 h-14 object-contain drop-shadow-lg" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl mb-6">
              ¿TIENES{" "}
              <span className="text-background">NEGOCIO</span>?
            </h2>
            <p className="font-body text-lg text-background/90 max-w-xl mx-auto mb-12">
              Precios especiales para negocios y pedidos al por mayor.<br />
              Abastece tu menú con tofu premium y entregas programadas.
            </p>
          </motion.div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`p-6 border-2 border-background bg-background/5 backdrop-blur-sm ${index % 2 === 0 ? "rotate-chaos-1" : "rotate-chaos-2"
                  }`}
              >
                <benefit.icon size={40} className="mb-4 text-background mx-auto" />
                <h3 className="font-display text-xl mb-2">{benefit.title}</h3>
                <p className="font-body text-sm text-background/90">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <motion.a
              href={whatsappHref(
                'Hola! Soy negocio y me interesan precios especiales por volumen de Empátika',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-background text-foreground font-display text-base sm:text-2xl uppercase border-4 border-background shadow-[8px_8px_0_0_hsl(var(--background)/0.3)] hover:shadow-[12px_12px_0_0_hsl(var(--background)/0.3)] hover:-translate-x-1 hover:-translate-y-1 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              QUIERO PRECIOS ESPECIALES
              <ArrowRight size={20} className="sm:hidden" />
              <ArrowRight size={28} className="hidden sm:block" />
            </motion.a>
            <p className="font-body text-sm text-background/90">
              Cotizaciones personalizadas en menos de 24 horas
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default B2BSection;
