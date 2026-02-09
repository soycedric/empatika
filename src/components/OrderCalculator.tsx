/**
 * Componente: Calculadora de Pedidos
 * Versión simplificada: Solo valida 3 kg mínimo para envío gratuito
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrderCalculator } from '@/hooks/use-order-calculator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Package, Plus, Minus, Trash2, ShoppingCart, MessageCircle, Truck, MapPin } from 'lucide-react';

type DeliveryZone = 'puebla' | 'cdmx';

const DELIVERY_ZONES: Record<DeliveryZone, string> = {
  puebla: 'Puebla',
  cdmx: 'Ciudad de México'
};

// Tofuchos para decorar la calculadora
const calculatorTofuchos = [
  { src: "/tofuchos/tofucho pensando.png", position: "top-12 left-4 xl:left-12", size: "w-20 h-20 xl:w-24 xl:h-24", animation: { y: [0, -8, 0], rotate: [-3, 3, -3] } },
  { src: "/tofuchos/tofucho sorprendido.png", position: "bottom-12 right-4 xl:right-12", size: "w-16 h-16 xl:w-20 xl:h-20", animation: { y: [0, -10, 0], scale: [1, 1.02, 1] } },
];

export const OrderCalculator = () => {
  const {
    items,
    products,
    totalVolume,
    validation,
    minimumVolume,
    addItem,
    updateItemQuantity,
    removeItem,
    clearOrder
  } = useOrderCalculator();

  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>('puebla');

  const handleAddProduct = () => {
    if (selectedProductId) {
      addItem(selectedProductId, 1);
      setSelectedProductId('');
    }
  };

  const handleCalculate = () => {
    if (validation.shouldRedirectToDistributors) {
      // Redirigir a distribuidores
      window.location.href = '#distribuidores';
    } else {
      // Redirigir a WhatsApp con el pedido
      const phoneNumber = '522213089090';
      let message = `¡Hola! Quiero hacer un pedido con envío gratis:\n\n`;
      message += `📍 Zona de entrega: ${DELIVERY_ZONES[deliveryZone]}\n`;
      message += `📦 Total: ${totalVolume.toFixed(2)} kg\n\n`;
      message += `Productos:\n`;
      
      items.forEach((item, index) => {
        message += `${index + 1}. ${item.product.name} (${item.product.weight}kg) x${item.quantity} = ${(item.product.weight * item.quantity).toFixed(2)}kg\n`;
      });

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    }
  };

  return (
    <section id="calculadora" className="py-24 relative overflow-hidden bg-muted/30 bg-paper-texture">
      {/* Tofuchos decorativos flotantes */}
      {calculatorTofuchos.map((tofucho, index) => (
        <motion.div
          key={index}
          className={`absolute ${tofucho.position} z-10 hidden lg:block`}
          animate={tofucho.animation}
          transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
        >
          <img 
            src={tofucho.src} 
            alt="Tofucho decorativo" 
            className={`${tofucho.size} object-contain opacity-70 drop-shadow-lg`}
          />
        </motion.div>
      ))}

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6"
            >
              CALCULA TU <span className="inline-block bg-primary text-foreground px-2">PEDIDO</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Agrega productos y verifica si calificas para envío gratuito. Necesitas mínimo 3 kg.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Panel Izquierdo: Productos */}
            <div className="space-y-6">
              {/* Agregar Productos */}
              <div className="bg-background border-4 border-foreground shadow-brutal p-6">
                <h3 className="font-display text-2xl mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  AGREGAR PRODUCTOS
                </h3>
                
                {/* Zona de entrega */}
                <div className="mb-4 p-3 bg-muted border-2 border-foreground/20">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <label className="text-xs font-display uppercase tracking-wider text-muted-foreground">
                      Zona de entrega
                    </label>
                  </div>
                  <Select value={deliveryZone} onValueChange={(value) => setDeliveryZone(value as DeliveryZone)}>
                    <SelectTrigger className="border-2 border-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(DELIVERY_ZONES).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                    <SelectTrigger className="flex-1 border-2 border-foreground">
                      <SelectValue placeholder="Selecciona un producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - {product.weight} kg
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleAddProduct} 
                    disabled={!selectedProductId}
                    size="icon"
                    className="btn-brutal-icon"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Lista de Items */}
              <div className="bg-background border-4 border-foreground shadow-brutal p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display text-2xl flex items-center gap-2">
                    <Package className="w-6 h-6" />
                    TU PEDIDO
                  </h3>
                  {items.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearOrder}
                      className="text-destructive hover:text-destructive border-2 border-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <AnimatePresence mode="popLayout">
                  {items.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8 text-muted-foreground"
                    >
                      <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p className="text-sm">Aún no has agregado productos</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center gap-3 p-3 bg-muted/50 border-2 border-foreground/20 hover:border-primary/50 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(item.product.weight * item.quantity).toFixed(2)} kg
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 border-2"
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            
                            <span className="w-7 text-center font-bold font-display text-sm">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 border-2"
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Panel Derecho: Estado del Pedido */}
            <div className="space-y-6">
              {/* Badges informativos */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <div className="bg-background border-4 border-foreground shadow-brutal px-4 py-2 font-display text-xs flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>ENVÍO GRATIS +3KG</span>
                </div>
                <div className="bg-background border-4 border-foreground shadow-brutal px-4 py-2 font-display text-xs flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>PUEBLA & CDMX</span>
                </div>
              </div>

              {/* Card Principal: Estado */}
              {/* Card Principal: Estado */}
              <div className={`bg-background border-4 border-foreground shadow-brutal p-6 ${
                validation.isValid 
                  ? 'bg-green-50 dark:bg-green-950/30' 
                  : items.length === 0
                  ? ''
                  : 'bg-orange-50 dark:bg-orange-950/30'
              }`}>
                <div className="text-center pb-3 border-b-2 border-foreground/20 mb-6">
                  <div className="flex justify-center mb-3">
                    {validation.isValid ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 rounded-full bg-green-500 border-4 border-foreground flex items-center justify-center shadow-brutal-sm"
                      >
                        <Truck className="w-8 h-8 text-white" />
                      </motion.div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-muted border-4 border-foreground flex items-center justify-center">
                        <Package className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-3xl">
                    {validation.isValid ? '¡ENVÍO GRATIS!' : 'TU PEDIDO'}
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {/* Volumen Total */}
                  <div className="text-center py-4">
                    <p className="text-xs text-muted-foreground mb-2 font-display uppercase tracking-wider">
                      Volumen Total
                    </p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-7xl font-display font-bold text-primary">
                        {totalVolume.toFixed(1)}
                      </span>
                      <span className="text-3xl font-display text-muted-foreground">kg</span>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground text-xs uppercase font-display">Mínimo:</span>
                      <Badge variant="outline" className="font-display border-2 border-foreground">
                        {minimumVolume} kg
                      </Badge>
                    </div>

                    <div className="h-4 bg-muted border-2 border-foreground overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          validation.isValid 
                            ? 'bg-green-500' 
                            : 'bg-primary'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${Math.min(100, (totalVolume / minimumVolume) * 100)}%` 
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>

                    {!validation.isValid && items.length > 0 && (
                      <p className="text-center text-sm text-muted-foreground font-display">
                        Faltan <strong className="text-primary">{(minimumVolume - totalVolume).toFixed(2)} kg</strong>
                      </p>
                    )}
                  </div>

                  {/* Mensaje */}
                  {items.length > 0 && (
                    <div className={`p-4 border-2 border-foreground text-center font-medium text-sm ${
                      validation.isValid 
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' 
                        : 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200'
                    }`}>
                      {validation.message}
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {validation.shouldRedirectToDistributors ? (
                    <div className="bg-background border-4 border-foreground shadow-brutal p-6 bg-orange-50 dark:bg-orange-950/30">
                      <div className="text-center mb-4">
                        <h3 className="font-display text-lg font-bold mb-2">
                          ¿BUSCAS MENOS CANTIDAD?
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Encuentra nuestros productos en distribuidores cerca de ti
                        </p>
                      </div>
                      <Button 
                        className="w-full font-display text-base py-6 btn-brutal" 
                        size="lg"
                        onClick={handleCalculate}
                      >
                        VER DISTRIBUIDORES
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-background border-4 border-foreground shadow-brutal p-6 bg-green-50 dark:bg-green-950/30">
                      <div className="text-center mb-4">
                        <h3 className="font-display text-lg font-bold text-green-700 dark:text-green-300 mb-2">
                          ¡LISTO PARA ENVIAR!
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Tu pedido califica para envío gratis
                        </p>
                      </div>
                      <Button 
                        className="w-full font-display text-base py-6 bg-green-600 hover:bg-green-700 border-4 border-foreground shadow-brutal hover:shadow-brutal-hover active:shadow-none transition-all" 
                        size="lg"
                        onClick={handleCalculate}
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        ENVIAR POR WHATSAPP
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
