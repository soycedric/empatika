import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import RecipesSection from "@/components/RecipesSection";
import DistributorsSection from "@/components/DistributorsSection";
import RestaurantsSection from "@/components/RestaurantsSection";
import B2BSection from "@/components/B2BSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";

const Index = () => {
  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <HeroSection />
          <AboutSection />
          <ProductsSection />
          <RecipesSection />
          <RestaurantsSection />
          <DistributorsSection />
          <B2BSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
