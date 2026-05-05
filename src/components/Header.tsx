import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { withBaseUrl } from "@/lib/base-url";

const SCROLL_THRESHOLD = 10;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Always show at top of page
      if (currentY < 60) {
        setIsVisible(true);
      } else if (Math.abs(currentY - lastScrollY.current) > SCROLL_THRESHOLD) {
        setIsVisible(currentY < lastScrollY.current);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: withBaseUrl("#productos"), label: "Productos" },
    { href: withBaseUrl("#distribuidores"), label: "Dónde comprar" },
    { href: withBaseUrl("#mayoristas"), label: "Mayoristas" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-foreground transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <a href={withBaseUrl("#inicio")} className="flex items-center gap-2 group">
          <img src={withBaseUrl("logo/logo_icono_empatika.svg")} alt="Empatika" className="h-8 w-auto" />
          <img src={withBaseUrl("logo/letras_empatika.svg")} alt="empátika" className="h-8 w-auto hidden sm:block" />
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
            className="inline-flex items-center gap-2 px-4 py-2 font-display text-sm uppercase bg-[#128C7E] hover:bg-[#075E54] text-white border-2 border-foreground shadow-brutal transition-colors"
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 border-2 border-foreground shadow-brutal bg-background"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
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
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 font-display text-sm uppercase bg-[#128C7E] hover:bg-[#075E54] text-white border-2 border-foreground shadow-brutal transition-colors w-full"
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
