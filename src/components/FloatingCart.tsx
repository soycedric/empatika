/**
 * FloatingCart: Barra sticky en la parte inferior de la pantalla
 * Muestra el progreso del pedido y un CTA rápido.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight, X } from 'lucide-react';
import { useOrderContext } from '@/hooks/OrderContext';

const FloatingCart = () => {
    const { items, totalVolume, minimumVolume, validation } = useOrderContext();

    if (items.length === 0) return null;

    const fillPercent = Math.min(100, (totalVolume / minimumVolume) * 100);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t-4 border-foreground shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
            >
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                        {/* Left: Cart info */}
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="relative">
                                <ShoppingCart className="w-6 h-6" />
                                <span className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] font-display w-5 h-5 flex items-center justify-center border border-background">
                                    {items.length}
                                </span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-display text-sm truncate">
                                    {totalVolume.toFixed(1)} / {minimumVolume} kg
                                </p>
                                <p className="font-body text-[10px] text-muted-foreground truncate">
                                    {validation.isValid
                                        ? '¡Pedido listo!'
                                        : `Faltan ${(minimumVolume - totalVolume).toFixed(1)} kg`}
                                </p>
                            </div>
                        </div>

                        {/* Center: Progress bar (hidden on very small screens) */}
                        <div className="hidden sm:flex flex-1 max-w-xs items-center gap-2">
                            <div className="flex-1 h-3 bg-muted border-2 border-foreground overflow-hidden">
                                <motion.div
                                    className={`h-full ${validation.isValid
                                            ? 'bg-green-500'
                                            : fillPercent > 60
                                                ? 'bg-amber-500'
                                                : 'bg-red-500'
                                        }`}
                                    animate={{ width: `${fillPercent}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <span className="font-display text-xs whitespace-nowrap">
                                {Math.round(fillPercent)}%
                            </span>
                        </div>

                        {/* Right: CTA */}
                        <a
                            href="#calculadora"
                            className={`inline-flex items-center gap-2 px-5 py-2.5 font-display text-sm uppercase border-[3px] border-foreground shadow-brutal transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg whitespace-nowrap ${validation.isValid
                                    ? 'bg-green-500 text-white'
                                    : 'bg-foreground text-background'
                                }`}
                        >
                            {validation.isValid ? 'Enviar pedido' : 'Ver pedido'}
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default FloatingCart;
