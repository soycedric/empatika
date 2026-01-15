import { motion } from "framer-motion";

const RecipesSection = () => {
  return (
    <section id="recetas" className="py-16 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <span className="text-dymo text-xs inline-block">Recetario</span>
          <h2 className="font-display text-3xl sm:text-4xl">
            Recetas pronto en /recetas
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Estamos montando el recetario con tips de plancha, marinado y fritura. Mientras tanto, descubre las recetas destacadas en la nueva ruta.
          </p>
          <div className="flex justify-center">
            <a href="/recetas" className="btn-brutal text-sm">Ir a /recetas</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecipesSection;
