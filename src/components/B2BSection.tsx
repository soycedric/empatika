import { motion } from "framer-motion";
import { Building2, Truck, Phone, ArrowRight } from "lucide-react";
import TofuMascot from "./TofuMascot";

const benefits = [
  {
    icon: Building2,
    title: "Restaurantes & Hoteles",
    description: "Precios especiales para HORECA con entregas programadas.",
  },
  {
    icon: Truck,
    title: "Distribuidores",
    description: "Únete a nuestra red de distribución en toda la República.",
  },
  {
    icon: Phone,
    title: "Atención Directa",
    description: "Línea exclusiva para mayoristas con respuesta inmediata.",
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

      {/* Floating mascots */}
      <motion.div
        className="absolute top-20 right-10 hidden lg:block"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <TofuMascot variant="extra-firme" size="lg" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-10 hidden lg:block"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        <TofuMascot variant="ahumado" size="md" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 border-2 border-background text-sm font-body mb-6">
              PARA NEGOCIOS
            </span>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl mb-6">
              ¿ERES{" "}
              <span className="text-primary">MAYORISTA</span>?
            </h2>
            <p className="font-body text-lg text-background/80 max-w-xl mx-auto mb-12">
              Llevamos el mejor tofu de México a tu negocio. Precios competitivos, entregas puntuales y productos de primera calidad.
            </p>
            <div className="font-body text-sm text-background/80 max-w-xl mx-auto mb-8 space-y-1">
              <p>• Puebla: entregas jueves, viernes y sábado.</p>
              <p>• CDMX: entregas los viernes.</p>
            </div>
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
                className={`p-6 border-2 border-background bg-background/5 backdrop-blur-sm ${
                  index % 2 === 0 ? "rotate-chaos-1" : "rotate-chaos-2"
                }`}
              >
                <benefit.icon size={40} className="mb-4 text-primary mx-auto" />
                <h3 className="font-display text-xl mb-2">{benefit.title}</h3>
                <p className="font-body text-sm text-background/70">{benefit.description}</p>
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
              href="https://wa.me/522215606205?text=Hola!%20Soy%20mayorista%20y%20me%20interesa%20distribuir%20tofu%20Empatika"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-foreground font-display text-2xl uppercase border-4 border-background shadow-[8px_8px_0_0_hsl(var(--background))] hover:shadow-[12px_12px_0_0_hsl(var(--background))] hover:-translate-x-1 hover:-translate-y-1 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              QUIERO DISTRIBUIR
              <ArrowRight size={28} />
            </motion.a>
            <p className="font-body text-sm text-background/60">
              Respuesta en menos de 24 horas
            </p>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-background/60 font-body text-sm"
          >
            <span>+100 negocios confían en nosotros</span>
            <span>•</span>
            <span>Entregas en toda la República</span>
            <span>•</span>
            <span>Facturación inmediata</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default B2BSection;
