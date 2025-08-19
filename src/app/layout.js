import Script from "next/script";
import Header from "@/layout/Header/Page";
import Footer from "@/layout/Footer/Page";
import "../styles/globals.scss";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
      </head>
      <body className="layout-wrapper">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
