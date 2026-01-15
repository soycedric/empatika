import { motion } from "framer-motion";

interface TofuMascotProps {
  variant?: "extra-firme" | "ahumado" | "neutral";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const TofuMascot = ({ variant = "neutral", size = "md", className = "" }: TofuMascotProps) => {
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const faceColor = variant === "ahumado" ? "#E85A30" : variant === "extra-firme" ? "#FFD600" : "#1A1A1A";

  return (
    <motion.svg
      className={`${sizes[size]} ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ y: 0, rotate: 0 }}
      animate={{ 
        y: [-5, 5, -5],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Tofu cube body */}
      <rect
        x="20"
        y="25"
        width="60"
        height="55"
        rx="4"
        fill="#F5F0E1"
        stroke="#1A1A1A"
        strokeWidth="3"
      />
      
      {/* Texture dots */}
      <circle cx="35" cy="45" r="2" fill="#E5E0D1" />
      <circle cx="50" cy="38" r="1.5" fill="#E5E0D1" />
      <circle cx="65" cy="50" r="2" fill="#E5E0D1" />
      <circle cx="40" cy="60" r="1.5" fill="#E5E0D1" />
      <circle cx="60" cy="65" r="2" fill="#E5E0D1" />
      
      {/* Face */}
      {/* Eyes */}
      <ellipse cx="38" cy="48" rx="4" ry="5" fill="#1A1A1A" />
      <ellipse cx="62" cy="48" rx="4" ry="5" fill="#1A1A1A" />
      <circle cx="39" cy="46" r="1.5" fill="white" />
      <circle cx="63" cy="46" r="1.5" fill="white" />
      
      {/* Cheeks */}
      <ellipse cx="30" cy="55" rx="4" ry="3" fill={faceColor} opacity="0.5" />
      <ellipse cx="70" cy="55" rx="4" ry="3" fill={faceColor} opacity="0.5" />
      
      {/* Mouth - smile */}
      <path
        d="M 42 60 Q 50 68 58 60"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Arms */}
      <motion.g
        animate={{ rotate: [0, 10, 0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "20px 50px" }}
      >
        <path
          d="M 20 50 L 8 42 L 5 48"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>
      <motion.g
        animate={{ rotate: [0, -10, 0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        style={{ transformOrigin: "80px 50px" }}
      >
        <path
          d="M 80 50 L 92 42 L 95 48"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>
      
      {/* Legs */}
      <path
        d="M 35 80 L 35 90 L 30 90"
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 65 80 L 65 90 L 70 90"
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Accessory based on variant */}
      {variant === "ahumado" && (
        <g>
          {/* Smoke wisps for ahumado */}
          <motion.path
            d="M 45 20 Q 48 12 45 5"
            stroke="#888"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
            animate={{ opacity: [0.3, 0.6, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M 55 18 Q 58 10 55 3"
            stroke="#888"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
            animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
          />
        </g>
      )}
      
      {variant === "extra-firme" && (
        <g>
          {/* Flexing arm for extra firme */}
          <motion.ellipse
            cx="95"
            cy="38"
            rx="6"
            ry="4"
            fill="#FFD600"
            stroke="#1A1A1A"
            strokeWidth="2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </g>
      )}
    </motion.svg>
  );
};

export default TofuMascot;
