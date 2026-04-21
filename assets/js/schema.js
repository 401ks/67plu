// Dynamic JSON-LD Schema Injection for Six7 Plumbing
// Injects structured data based on page type

document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname;
  const isService = path.includes('/services/');
  const isLocation = path.includes('/location/');
  const isEmergency = path.includes('/emergency');
  const isPricing = path.includes('/pricing');
  
  // Extract service name from URL if on service page
  let serviceName = '';
  if (isService) {
    const match = path.match(/\/services\/([^/]+)/);
    if (match) {
      serviceName = match[1].split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
  }
  
  // Extract location name from URL if on location page
  let locationName = '';
  if (isLocation) {
    const match = path.match(/\/location\/([^/]+)/);
    if (match) {
      locationName = match[1].charAt(0).toUpperCase() + match[1].slice(1);
    }
  }
  
  // Base schema for all pages
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": isService ? "PlumbingService" : isLocation ? "LocalBusiness" : "HomeAndConstructionBusiness",
    "name": "Six7 Plumbing",
    "image": "https://plumbing.six7.lk/assets/img/logo.svg",
    "telephone": "+94758244216",
    "url": `https://plumbing.six7.lk${path}`,
    "priceRange": "LKR 3,500 - LKR 18,000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mt Lavinia",
      "addressRegion": "Western Province",
      "addressCountry": "LK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "6.8183",
      "longitude": "79.8536"
    },
    "areaServed": [
      {"@type": "City", "name": "Colombo"},
      {"@type": "City", "name": "Kotte"},
      {"@type": "City", "name": "Battaramulla"},
      {"@type": "City", "name": "Maharagama"},
      {"@type": "City", "name": "Kaduwela"},
      {"@type": "City", "name": "Piliyandala"},
      {"@type": "City", "name": "Homagama"},
      {"@type": "City", "name": "Pitipana"},
      {"@type": "City", "name": "Boralesgamuwa"}
    ],
    "openingHours": "Mo-Su 00:00-23:59",
    "availableLanguage": ["English", "Sinhala", "Tamil"],
    "paymentAccepted": "Cash, Bank Transfer",
    "currenciesAccepted": "LKR"
  };
  
  // Add service-specific schema
  if (isService && serviceName) {
    baseSchema["serviceType"] = serviceName;
    baseSchema["description"] = `Professional ${serviceName} services in Colombo and surrounding areas. Available 24/7 for emergency repairs.`;
    baseSchema["hasOfferCatalog"] = {
      "@type": "OfferCatalog",
      "name": `${serviceName} Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `${serviceName} - Emergency Service`,
            "description": `24/7 emergency ${serviceName.toLowerCase()} with fast response time`
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "3500",
            "priceCurrency": "LKR",
            "unitText": "hour"
          }
        }
      ]
    };
  }
  
  // Add location-specific schema
  if (isLocation && locationName) {
    baseSchema["@type"] = "LocalBusiness";
    baseSchema["areaServed"] = {
      "@type": "City",
      "name": locationName
    };
    baseSchema["description"] = `Trusted plumber in ${locationName}. Emergency and routine plumbing services available 24/7.`;
  }
  
  // Add emergency service schema
  if (isEmergency) {
    baseSchema["specialty"] = "Emergency Plumbing";
    baseSchema["description"] = "24/7 emergency plumbing services in Colombo. Fast response, transparent pricing, pay after service.";
  }
  
  // Service catalog for non-service pages
  if (!isService) {
    baseSchema["hasOfferCatalog"] = {
      "@type": "OfferCatalog",
      "name": "Plumbing Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Emergency Services",
          "itemListElement": [
            {"@type": "Service", "name": "Emergency Plumbing", "serviceType": "plumbing"},
            {"@type": "Service", "name": "Leak Detection", "serviceType": "plumbing"},
            {"@type": "Service", "name": "Burst Pipe Repair", "serviceType": "plumbing"}
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Installations",
          "itemListElement": [
            {"@type": "Service", "name": "Tap Installation"},
            {"@type": "Service", "name": "Shower Installation"},
            {"@type": "Service", "name": "Toilet Installation"},
            {"@type": "Service", "name": "Water Heater Installation"}
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Repairs",
          "itemListElement": [
            {"@type": "Service", "name": "Leak Repair"},
            {"@type": "Service", "name": "Pipe Repair"},
            {"@type": "Service", "name": "Drain Cleaning"},
            {"@type": "Service", "name": "Water Tank Repair"}
          ]
        }
      ]
    };
  }
  
  // FAQ Schema for service pages
  if (isService) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you charge a callout fee?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No callout fee if you proceed with repair. Diagnostic billed only for time spent."
          }
        },
        {
          "@type": "Question",
          "name": "What if I'm not satisfied?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pay After Service guarantee: You only pay when the job is done and you're happy. 6-month warranty on all repairs."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly can you arrive?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Average arrival time is 38 minutes for emergency calls in Colombo and surrounding areas."
          }
        }
      ]
    };
    
    // Inject FAQ schema
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);
  }
  
  // Inject main schema
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(baseSchema);
  document.head.appendChild(script);
  
  // Breadcrumb schema for all pages
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://plumbing.six7.lk/"
      }
    ]
  };
  
  // Add current page to breadcrumb
  if (isService && serviceName) {
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://plumbing.six7.lk/services/"
    });
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      "position": 3,
      "name": serviceName,
      "item": `https://plumbing.six7.lk${path}`
    });
  } else if (isLocation && locationName) {
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Locations",
      "item": "https://plumbing.six7.lk/location/"
    });
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      "position": 3,
      "name": locationName,
      "item": `https://plumbing.six7.lk${path}`
    });
  }
  
  // Inject breadcrumb schema
  const breadcrumbScript = document.createElement('script');
  breadcrumbScript.type = 'application/ld+json';
  breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
  document.head.appendChild(breadcrumbScript);
});
