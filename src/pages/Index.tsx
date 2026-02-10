import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Lazy load de componentes below-the-fold para reducir bundle inicial
const OrderCalculator = lazy(() => import("@/components/OrderCalculator").then(m => ({ default: m.OrderCalculator })));
const RestaurantsSection = lazy(() => import("@/components/RestaurantsSection"));
const DistributorsSection = lazy(() => import("@/components/DistributorsSection"));
const B2BSection = lazy(() => import("@/components/B2BSection"));

/** Skeleton de carga para secciones lazy */
const SectionSkeleton = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-foreground border-t-primary animate-spin" />
      <p className="font-display text-sm text-muted-foreground uppercase tracking-wider">Cargando...</p>
    </div>
  </div>
);

const Index = () => {
  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-background bg-paper-texture">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <Header />
        <main id="main-content">
          <HeroSection />
          <ProductsSection />
          <Suspense fallback={<SectionSkeleton />}>
            <OrderCalculator />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <RestaurantsSection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <DistributorsSection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <B2BSection />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
