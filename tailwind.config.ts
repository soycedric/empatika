import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Gunplay", "sans-serif"],
        body: ["CMU Typewriter Text", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        paper: "hsl(var(--paper))",
        ink: "hsl(var(--ink))",
        "yellow-industrial": "hsl(var(--yellow-industrial))",
        "orange-rust": "hsl(var(--orange-rust))",
        cream: "hsl(var(--cream))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-10px) rotate(3deg)" },
          "75%": { transform: "translateY(-5px) rotate(-2deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "snap-in-left": {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "snap-in-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glitch: {
          "0%": { transform: "translateX(-2px) skewX(-2deg)", opacity: "0.8" },
          "25%": { transform: "translateX(2px) skewX(2deg)", opacity: "0.6" },
          "50%": { transform: "translateX(-1px)", opacity: "0.9" },
          "75%": { transform: "translateX(1px) skewX(-1deg)", opacity: "0.7" },
          "100%": { transform: "translateX(0)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 4s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "snap-in-left": "snap-in-left 0.15s cubic-bezier(0.4,0,0.2,1) both",
        "snap-in-up": "snap-in-up 0.15s cubic-bezier(0.4,0,0.2,1) both",
        glitch: "glitch 0.3s steps(2) forwards",
      },
      // Tamaños personalizados para tofuchos - pasos graduales de 4px
      spacing: {
        '13': '3.25rem',  // 52px
        '15': '3.75rem',  // 60px
        '17': '4.25rem',  // 68px
        '18': '4.5rem',   // 72px
        '19': '4.75rem',  // 76px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
