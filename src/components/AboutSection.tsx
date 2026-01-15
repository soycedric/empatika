import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="nosotros" className="py-24 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-dymo text-xs mb-6 inline-block"
          >
            Nuestra historia
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl mb-8"
          >
            SOMOS MÁS QUE TOFU
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-base leading-relaxed text-muted-foreground max-w-xl mx-auto"
          >
            Somos una empresa mexicana que nació para demostrar que la proteína vegetal puede ser deliciosa. 
            Tofu artesanal hecho con soya 100% mexicana, sin conservadores.
          </motion.p>

          {/* Values - Compact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            <span className="sticker bg-background text-sm">🌱 100% Vegano</span>
            <span className="sticker bg-background text-sm" style={{ transform: "rotate(1deg)" }}>
              🇲🇽 Hecho en México
            </span>
            <span className="sticker bg-background text-sm" style={{ transform: "rotate(-1deg)" }}>
              💪 Alto en proteína
            </span>
            <span className="sticker bg-background text-sm" style={{ transform: "rotate(2deg)" }}>
              ❤️ Artesanal
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
