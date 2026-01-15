import { motion } from "framer-motion";
import TofuMascot from "./TofuMascot";

interface ProductCardProps {
  name: string;
  variant: "extra-firme" | "ahumado";
  description: string;
  weight: string;
  protein: string;
  image: string;
  index: number;
}

const ProductCard = ({ name, variant, description, weight, protein, image, index }: ProductCardProps) => {
  const isYellow = variant === "extra-firme";
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`card-brutal relative overflow-hidden ${
        index % 2 === 0 ? "rotate-chaos-1" : "rotate-chaos-2"
      }`}
    >
      {/* Tape effect */}
      <div className="tape" />
      
      {/* Product Image */}
      <div className="relative aspect-square mb-4 bg-cream border-2 border-foreground overflow-hidden">
        <img
          src={image}
          alt={`Tofu ${name} Empatika - Proteína vegetal mexicana`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Floating mascot */}
        <motion.div
          className="absolute -bottom-4 -right-4"
          animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <TofuMascot variant={variant} size="md" />
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h3 className="font-display text-3xl">
          TOFU{" "}
          <span className={isYellow ? "text-highlight-yellow" : "text-highlight-orange"}>
            {name}
          </span>
        </h3>
        
        <p className="font-body text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Specs */}
        <div className="flex flex-wrap gap-2">
          <span className="sticker bg-muted text-xs" style={{ transform: "rotate(-2deg)" }}>
            📦 {weight}
          </span>
          <span className="sticker bg-primary text-xs" style={{ transform: "rotate(1deg)" }}>
            💪 {protein} proteína
          </span>
        </div>

        {/* Nutritional highlight */}
        <div className="mt-4 p-3 bg-foreground text-background font-body text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>Calorías: <strong>50</strong></div>
            <div>Grasa: <strong>0g</strong></div>
            <div>Sodio: <strong>0mg</strong></div>
            <div>Carbohidratos: <strong>7g</strong></div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
