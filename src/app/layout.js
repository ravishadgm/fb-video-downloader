import Script from "next/script";
import Header from "@/layout/Header/Page";
import Footer from "@/layout/Footer/Page";
import "../styles/globals.scss";

export default function RootLayout({ children }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FacebookDl",
    "url": "https://video-downloader-sigma-seven.vercel.app/",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "email": "abc@gmail.com",
        "contactType": "customer support",
        "availableLanguage": ["English"]
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <meta property="og:title" content="FacebookDl - Free Video Downloader" />
        <meta property="og:description" content="Download videos instantly from your favorite platforms for free." />
        <meta property="og:image" content="https://video-downloader-sigma-seven.vercel.app/og-image.jpg" />
        <meta property="og:url" content="https://video-downloader-sigma-seven.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FacebookDl - Free Video Downloader" />
        <meta name="twitter:description" content="Download videos instantly from your favorite platforms for free." />
        <meta name="twitter:image" content="https://video-downloader-sigma-seven.vercel.app/og-image.jpg" />
      </head>
      <body className="layout-wrapper">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
