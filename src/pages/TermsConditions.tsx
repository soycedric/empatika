import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";

const TermsConditions = () => {
  return (
    <>
      <SEOHead 
        title="Términos y Condiciones - Empátika"
        description="Términos y Condiciones de uso de Empátika. Lee nuestras políticas de compra, entrega y garantías."
      />
      <div className="min-h-screen bg-background bg-paper-texture">
        <Header />
        
        <main className="container mx-auto px-4 py-24 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-4">
                TÉRMINOS Y <span className="bg-primary text-foreground px-2">CONDICIONES</span>
              </h1>
              <p className="text-sm text-muted-foreground font-body">
                Última actualización: Febrero 2026
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8 font-body text-foreground/90">
              {/* Introducción */}
              <section className="bg-cream border-2 border-foreground p-6 shadow-brutal">
                <h2 className="font-display text-2xl mb-4">1. ACEPTACIÓN DE LOS TÉRMINOS</h2>
                <p className="mb-3">
                  Bienvenido a <strong>Empátika</strong>. Al acceder y utilizar nuestro sitio web, 
                  realizar pedidos o contactarnos para adquirir nuestros productos, usted acepta 
                  cumplir y estar sujeto a los siguientes términos y condiciones de uso.
                </p>
                <p>
                  Si no está de acuerdo con estos términos, le pedimos que no utilice nuestros servicios. 
                  Nos reservamos el derecho de modificar estos términos en cualquier momento.
                </p>
              </section>

              {/* Sobre Empátika */}
              <section className="bg-cream border-2 border-foreground p-6 shadow-brutal">
                <h2 className="font-display text-2xl mb-4">2. SOBRE EMPÁTIKA</h2>
                <p className="mb-3">
                  Empátika es una marca dedicada a la producción y comercialización de tofu artesanal 
                  de alta calidad en Puebla, México. Nos especializamos en:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Tofu Extra Firme - Perfecto para marinar, asar y freír</li>
                  <li>Tofu Ahumado - Con sabor intenso y textura única</li>
                </ul>
                <p className="mt-4">
                  Todos nuestros productos son elaborados artesanalmente con ingredientes de calidad, 
                  sin conservadores artificiales.
                </p>
              </section>

              {/* Productos y Precios */}
              <section className="bg-cream border-2 border-foreground p-6 shadow-brutal">
                <h2 className="font-display text-2xl mb-4">3. PRODUCTOS Y PRECIOS</h2>
                <p className="mb-3">
                  <strong>3.1. Disponibilidad:</strong> Todos nuestros productos están sujetos a disponibilidad. 
                  Al ser tofu artesanal, producimos lotes frescos semanalmente. Nos reservamos el derecho de 
                  limitar cantidades o descontinuar productos sin previo aviso.
                </p>
                <p className="mb-3">
                  <strong>3.2. Precios:</strong> Los precios mostrados en nuestro sitio web o comunicados 
                  vía WhatsApp están en pesos mexicanos (MXN) e incluyen IVA cuando aplique. Nos reservamos 
                  el derecho de modificar precios sin previo aviso.
                </p>
                <p className="mb-3">
                  <strong>3.3. Frescura:</strong> Nuestro tofu es un producto fresco y artesanal. 
                  Se recomienda consumir dentro de los 7 días posteriores a la entrega cuando se mantiene 
                  refrigerado adecuadamente.
                </p>
              </section>

              {/* Pedidos */}
              <section className="bg-cream border-2 border-foreground p-6 shadow-brutal">
                <h2 className="font-display text-2xl mb-4">4. PROCESO DE PEDIDOS</h2>
                <p className="mb-3">
                  <strong>4.1. Cómo ordenar:</strong> Los pedidos se realizan principalmente a través de 
                  WhatsApp al <strong>+52 221 560 6205</strong>. Al realizar un pedido, usted se compromete 
                  a proporcionar información completa y precisa.
                </p>
                <p className="mb-3">
                  <strong>4.2. Confirmación:</strong> Una vez recibido su pedido, le enviaremos una 
                  confirmación vía WhatsApp con los detalles del pedido, precio total y fecha estimada de entrega.
                </p>
                <p className="mb-3">
                  <strong>4.3. Modificaciones:</strong> Puede modificar o cancelar su pedido contactándonos 
                  por WhatsApp antes de que el producto entre en producción. No se podrán realizar cambios 
                  una vez iniciada la preparación.
                </p>
                <p className="mb-3">
                  <strong>4.4. Pedidos mayoristas:</strong> Para pedidos de restaurantes, distribuidores 
                  o compras al por mayor, se requiere contacto previo para coordinar cantidades, 
                  precios especiales y logística de entrega.
                </p>
              </section>

              {/* Pago */}
              <section className="bg-cream border-2 border-foreground p-6 shadow-brutal">
                <h2 className="font-display text-2xl mb-4">5. MÉTODOS DE PAGO</h2>
                <p className="mb-3">
                  <strong>5.1. Formas de pago aceptadas:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Transferencia bancaria</li>
                  <li>Efectivo contra entrega (sujeto a disponibilidad)</li>
                  <li>Otros métodos coordinados vía WhatsApp</li>
                </ul>
                <p className="mt-4 mb-3">
                  <strong>5.2. Facturación:</strong> Si requiere factura, debe solicitarla al momento 
                  de realizar su pedido proporcionando sus datos fiscales completos.
                </p>
              </section>

              {/* Envío y Entrega */}
              <section className="bg-cream border-2 border-foreground p-6 shadow-brutal">
                <h2 className="font-display text-2xl mb-4">6. ENVÍO Y ENTREGA</h2>
                <p className="mb-3">
                  <strong>6.1. Zonas de entrega:</strong> Actualmente entregamos en Puebla y Ciudad de México. 
                  Para otras ubicaciones, contacte con nosotros para evaluar posibilidades.
                </p>
                <p className="mb-3">
                  <strong>6.2. Costos de envío:</strong> Los costos de envío varían según la ubicación 
                  y serán informados al momento de confirmar su pedido.
                </p>
                <p className="mb-3">
                  <strong>6.3. Tiempos de entrega:</strong> Los tiempos de entrega varían entre 1-3 días 
                  hábiles en zona metropolitana de Puebla, y 2-5 días hábiles en CDMX, dependiendo de la 
                  disponibilidad y logística. Los tiempos son estimados y no garantizados.
                </p>
                <p className="mb-3">
                  <strong>6.4. Responsabilidad de recepción:</strong> Es responsabilidad del comprador 
                  estar disponible para recibir el pedido en la dirección proporcionada. Si no hay nadie 
                  disponible, se coordinará una nueva entrega que podría generar costos adicionales.
                </p>
                <p className="mb-3">
                  <strong>6.5. Cadena de frío:</strong> El tofu es un producto perecedero que debe 
                  mantenerse refrigerado. Al recibir su pedido, verifique que el producto esté frío 
                  y refrigérelo inmediatamente.
                </p>
              </section>

              {/* Devoluciones */}
              <section className="bg-cream border-2 border-foreground p-6 shadow-brutal">
                <h2 className="font-display text-2xl mb-4">7. DEVOLUCIONES Y GARANTÍA</h2>
                <p className="mb-3">
                  <strong>7.1. Garantía de calidad:</strong> Garantizamos que todos nuestros productos 
                  salen en óptimas condiciones. Si recibe un producto defectuoso, en mal estado o que 
                  no cumple con sus expectativas de calidad, contacte con nosotros dentro de las 
                  primeras 24 horas.
                </p>
                <p className="mb-3">
                  <strong>7.2. Proceso de reclamación:</strong> Para realizar una reclamación, contacte 
                  por WhatsApp al <strong>+52 221 560 6205</strong> proporcionando:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Número de pedido</li>
                  <li>Fotografías del producto</li>
                  <li>Descripción del problema</li>
                </ul>
                <p className="mt-4 mb-3">
                  <strong>7.3. Soluciones:</strong> En caso de productos defectuosos, ofreceremos:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Reemplazo del producto</li>
                  <li>Reembolso total del monto pagado</li>
                  <li>Crédito para compra futura</li>
                </ul>
                <p className="mt-4">
                  <strong>7.4. Excepciones:</strong> No se aceptarán devoluciones por cambio de opinión, 
                  productos que no hayan sido refrigerados adecuadamente, o reclamos realizados después 
                  de 24 horas de recibido el producto.
                </p>
              </section>

              {/* Uso del Sitio */}
              <section className="bg-cream border-2 border-foreground p-6 shadow-brutal">
                <h2 className="font-display text-2xl mb-4">8. USO DEL SITIO WEB</h2>
                <p className="mb-3">
                  <strong>8.1. Propiedad intelectual:</strong> Todo el contenido de este sitio web, 
                  incluyendo textos, imágenes, logos, diseños y código, es propiedad de Empátika y está 
                  protegido por leyes de propiedad intelectual.
                </p>
                <p className="mb-3">
                  <strong>8.2. Uso permitido:</strong> Usted puede navegar y utilizar el sitio para 
                  fines personales y comerciales legítimos relacionados con la compra de nuestros productos.
                </p>
                <p className="mb-3">
                  <strong>8.3. Prohibiciones:</strong> Está prohibido:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Copiar o reproducir contenido sin autorización</li>
                  <li>Usar el sitio para fines ilegales</li>
                  <li>Intentar acceder a áreas restringidas del sitio</li>
                  <li>Distribuir malware o contenido dañino</li>
                </ul>
              </section>

              {/* Limitación de Responsabilidad */}
              <section className="bg-cream border-2 border-foreground p-6 shadow-brutal">
                <h2 className="font-display text-2xl mb-4">9. LIMITACIÓN DE RESPONSABILIDAD</h2>
                <p className="mb-3">
                  Empátika no será responsable por:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Daños indirectos, incidentales o consecuentes derivados del uso de nuestros productos</li>
                  <li>Retrasos en entregas causados por servicios de terceros o causas de fuerza mayor</li>
                  <li>Problemas derivados del mal almacenamiento del producto por parte del cliente</li>
                  <li>Reacciones alérgicas (nuestros productos contienen soya)</li>
                  <li>Interrupciones del servicio del sitio web por mantenimiento o problemas técnicos</li>
                </ul>
              </section>

              {/* Privacidad */}
              <section className="bg-cream border-2 border-foreground p-6 shadow-brutal">
                <h2 className="font-display text-2xl mb-4">10. PRIVACIDAD Y DATOS PERSONALES</h2>
                <p>
                  El tratamiento de sus datos personales se rige por nuestro 
                  <a href="/aviso-privacidad" className="text-primary hover:underline font-bold"> Aviso de Privacidad</a>, 
                  el cual forma parte integral de estos Términos y Condiciones. Le recomendamos leerlo 
                  detenidamente para conocer cómo protegemos su información.
                </p>
              </section>

              {/* Contacto */}
              <section className="bg-cream border-2 border-foreground p-6 shadow-brutal">
                <h2 className="font-display text-2xl mb-4">11. CONTACTO</h2>
                <p className="mb-3">
                  Para cualquier duda, aclaración o comentario sobre estos Términos y Condiciones, 
                  puede contactarnos:
                </p>
                <ul className="list-none space-y-2 ml-4">
                  <li><strong>WhatsApp:</strong> +52 221 560 6205</li>
                  <li><strong>Ubicación:</strong> 7 sur 2907, Col. Chulavista, Puebla, Puebla, México</li>
                  <li><strong>Instagram:</strong> @empatika.mx</li>
                  <li><strong>Facebook:</strong> /empatika.mx</li>
                </ul>
              </section>

              {/* Jurisdicción */}
              <section className="bg-cream border-2 border-foreground p-6 shadow-brutal">
                <h2 className="font-display text-2xl mb-4">12. LEY APLICABLE Y JURISDICCIÓN</h2>
                <p>
                  Estos Términos y Condiciones se rigen por las leyes de los Estados Unidos Mexicanos. 
                  Para cualquier controversia o conflicto derivado de la interpretación o cumplimiento 
                  de estos términos, las partes se someten a la jurisdicción de los tribunales competentes 
                  en Puebla, Puebla, México.
                </p>
              </section>

              {/* Aceptación */}
              <section className="bg-primary border-2 border-foreground p-6 shadow-brutal">
                <h2 className="font-display text-2xl mb-4">ACEPTACIÓN</h2>
                <p>
                  Al realizar un pedido o utilizar nuestros servicios, usted reconoce haber leído, 
                  entendido y aceptado estos Términos y Condiciones en su totalidad. Si tiene alguna 
                  pregunta antes de realizar su pedido, no dude en contactarnos por WhatsApp.
                </p>
              </section>
            </div>

            {/* Back Button */}
            <div className="mt-12 text-center">
              <a
                href="/"
                className="inline-block px-8 py-3 border-2 border-foreground bg-background hover:bg-primary shadow-brutal hover:-translate-y-1 transition-all font-display text-lg"
              >
                ← VOLVER AL INICIO
              </a>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TermsConditions;
