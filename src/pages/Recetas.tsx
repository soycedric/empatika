import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Recetas = () => {
  const tips = [
    "Dora el tofu extra firme a fuego medio-alto con poco aceite.",
    "Prensa el tofu 15 min para una textura más firme.",
    "Marina con soya, jengibre y ajo 30 min antes de la plancha.",
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <span className="text-dymo text-xs inline-block">Recetario</span>
            <h1 className="font-display text-4xl sm:text-5xl">Recetas Empatika</h1>
            <p className="font-body text-base text-muted-foreground">
              Próximamente: recetas detalladas con tiempos, técnicas y toppings. Por ahora, algunos tips rápidos para sacar el máximo a tu tofu Empatika.
            </p>

            <div className="grid gap-4">
              {tips.map((tip) => (
                <div key={tip} className="card-brutal bg-card">
                  <p className="font-body text-sm text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link to="/" className="btn-brutal text-sm">Volver al inicio</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Recetas;
