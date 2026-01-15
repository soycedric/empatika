import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PhoneCall } from "lucide-react";
import TofuMascot from "./TofuMascot";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#productos", label: "Productos" },
    { href: "#distribuidores", label: "Dónde comprar" },
    { href: "#mayoristas", label: "Mayoristas" },
    { href: "/recetas", label: "Recetas" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-foreground">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <a href="/#inicio" className="flex items-center gap-2 group">
          <TofuMascot size="sm" variant="neutral" />
          <span className="font-display text-3xl tracking-tight">empatika</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-sm tracking-wide hover:text-dymo transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA / Contacto */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/522215606205?text=Hola%20Empatika!%20Quiero%20información"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal text-sm"
          >
            WhatsApp
          </a>
          <a
            href="tel:+522215606205"
            className="inline-flex items-center gap-1 font-body text-sm hover:text-dymo"
          >
            <PhoneCall size={16} /> +52 221 560 6205
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 border-2 border-foreground shadow-brutal bg-primary"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b-2 border-foreground overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-4">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-body text-lg uppercase block py-2 hover:bg-primary px-3 border-2 border-transparent hover:border-foreground transition-all"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <a
                  href="https://wa.me/522215606205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutal w-full text-center"
                >
                  WhatsApp
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
