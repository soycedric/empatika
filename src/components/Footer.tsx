import { Instagram, Facebook, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t-4 border-foreground py-12 relative overflow-hidden">
      {/* Tofucho meditando - Desktop */}
      <motion.div 
        className="absolute bottom-20 right-10 hidden lg:block"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/tofuchos/tofucho meditando.png" alt="" aria-hidden="true" className="w-32 h-32 object-contain opacity-40" />
      </motion.div>


      {/* Tofucho meditando - Mobile */}
      <motion.div 
        className="absolute bottom-40 right-20 lg:hidden z-40"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/tofuchos/tofucho meditando.png" alt="" aria-hidden="true" className="w-24 h-24 object-contain drop-shadow-lg" />
      </motion.div>


      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo/logo_icono_empatika.svg" alt="Empátika" className="h-10 w-auto" />
              <img src="/logo/letras_empatika.svg" alt="empátika" className="h-10 w-auto" />
            </div>
            <p className="font-body text-sm text-muted-foreground max-w-sm mb-4">
              Tofu artesanal poblano. Proteína vegetal de la más alta calidad 
              para una alimentación consciente.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/empatika.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-foreground bg-background shadow-brutal hover:-translate-y-1 transition-transform"
                aria-label="Instagram de Empátika"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/empatika.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-foreground bg-background shadow-brutal hover:-translate-y-1 transition-transform"
                aria-label="Facebook de Empátika"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg mb-4">NAVEGACIÓN</h4>
            <ul className="space-y-2 font-body text-sm">
              <li><a href="#productos" className="hover:text-dymo transition-all">Productos</a></li>
              <li><a href="#distribuidores" className="hover:text-dymo transition-all">Dónde Comprar</a></li>
              <li><a href="#mayoristas" className="hover:text-dymo transition-all">Mayoristas</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-4">CONTACTO</h4>
            <ul className="space-y-3 font-body text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>7 sur 2907, Col. Chulavista, Puebla, Puebla, México</span>
              </li>
              <li>
                <a 
                  href="https://wa.me/522215606205"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="hover:text-dymo transition-all"
                >
                  +52 221 560 6205
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t-2 border-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © {currentYear} Empátika. Hecho con 💚 en México.
          </p>
          <div className="flex gap-4 font-body text-xs">
            <a href="/aviso-privacidad" className="hover:underline">Aviso de Privacidad</a>
            <a href="/terminos-condiciones" className="hover:underline">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
