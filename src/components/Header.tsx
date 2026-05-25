import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { withBaseUrl } from "@/lib/base-url";
import { useOrderContext } from "@/hooks/OrderContext";

const SCROLL_THRESHOLD = 10;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { items, isCartOpen, setCartOpen } = useOrderContext();

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
  const navLinkClass =
    "group font-body text-[1.05rem] tracking-wide transition-all duration-200";
  const navLinkTextClass =
    "inline-block px-2 py-1 transition-all duration-200 group-hover:bg-foreground group-hover:text-background group-hover:-rotate-1";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-foreground transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <a href={withBaseUrl("#inicio")} className="flex items-center gap-2 group">
          <img src={withBaseUrl("logo/logo_icono_empatika.svg")} alt="Empatika" className="h-8 w-auto" />
          <span className="font-display text-[1.45rem] leading-none tracking-[-0.04em] hidden sm:block">empátika</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                  className={navLinkClass}
              >
                  <span className={navLinkTextClass}>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA / Compra */}
        <div className="hidden md:flex items-center gap-3">
          {items.length > 0 && !isCartOpen && (
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative inline-flex items-center justify-center h-10 w-10 border-2 border-foreground bg-background shadow-brutal"
              aria-label="Abrir carrito"
            >
              <ShoppingCart size={18} />
              <span className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] font-display w-5 h-5 flex items-center justify-center border border-background">
                {items.length}
              </span>
            </button>
          )}
          <a
            href={withBaseUrl("#calculadora")}
            className="inline-flex items-center gap-2 px-4 py-2 font-display text-sm uppercase bg-foreground text-background border-2 border-foreground shadow-brutal transition-colors"
          >
            Comprar
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {items.length > 0 && !isCartOpen && (
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative inline-flex items-center justify-center h-10 w-10 border-2 border-foreground shadow-brutal bg-background"
              aria-label="Abrir carrito"
            >
              <ShoppingCart size={18} />
              <span className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] font-display w-5 h-5 flex items-center justify-center border border-background">
                {items.length}
              </span>
            </button>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 border-2 border-foreground shadow-brutal bg-background"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
            <ul className="flex flex-col items-center p-4 gap-4">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full"
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${navLinkClass} block px-3 py-2 text-center`}
                  >
                    <span className={navLinkTextClass}>{link.label}</span>
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <a
                  href={withBaseUrl("#calculadora")}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 font-display text-sm uppercase bg-foreground text-background border-2 border-foreground shadow-brutal transition-colors w-full"
                >
                  Comprar
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
