import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

const SEOHead = ({
  title = "Empátika - Tofu Artesanal Mexicano | Proteína Vegetal",
  description = "El tofu dejó de ser aburrido. Tofu artesanal mexicano, proteína vegetal 100% natural. Extra Firme y Ahumado. Encuentra distribuidores en México y recetas deliciosas.",
  keywords = "tofu México, proteína vegetal, recetas con tofu, tofu firme, tofu ahumado, distribuidora de alimentos veganos, Empátika, tofu artesanal, comida vegana México",
  ogImage = "https://empatika.mx/og-image.jpg",
  ogType = "website",
  canonicalUrl = "https://empatika.mx",
}: SEOHeadProps) => {
  // JSON-LD Structured Data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Empatika",
    url: "https://empatika.mx",
    logo: "https://empatika.mx/logo.png",
    description: "Tofu artesanal mexicano de alta calidad. Proteína vegetal 100% natural.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ciudad de México",
      addressCountry: "MX",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+52-1-234-567-890",
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
    sameAs: [
      "https://instagram.com/empatika",
      "https://facebook.com/empatika",
    ],
  };

  // JSON-LD Structured Data for Products
  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Product",
        position: 1,
        name: "Tofu Extra Firme Empátika",
        description: "Tofu extra firme ideal para freír, asar o saltear. Proteína vegetal mexicana de alta calidad.",
        image: "https://empatika.mx/tofu-extra-firme.jpg",
        brand: {
          "@type": "Brand",
          name: "Empátika",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "MXN",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Empátika",
          },
        },
        nutrition: {
          "@type": "NutritionInformation",
          calories: "50 calories",
          proteinContent: "8g",
          servingSize: "100g",
        },
      },
      {
        "@type": "Product",
        position: 2,
        name: "Tofu Ahumado Empátika",
        description: "Tofu ahumado naturalmente con madera de mezquite. Sabor intenso, listo para comer.",
        image: "https://empatika.mx/tofu-ahumado.jpg",
        brand: {
          "@type": "Brand",
          name: "Empátika",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "MXN",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Empátika",
          },
        },
        nutrition: {
          "@type": "NutritionInformation",
          calories: "50 calories",
          proteinContent: "8g",
          servingSize: "100g",
        },
      },
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Empatika" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:site_name" content="Empatika" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="geo.region" content="MX" />
      <meta name="geo.placename" content="Ciudad de México" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(productsSchema)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
