import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "V Momentum — SaaS Technology Apps Design",
  description: "La fábrica de software más rápida de México. Apps PWA premium para negocios en 7 días.",
  metadataBase: new URL("https://vmomentum.site"),
  openGraph: {
    title: "V Momentum",
    description: "Apps PWA premium para negocios mexicanos. De idea a producción en 7 días.",
    url: "https://vmomentum.site",
    siteName: "V Momentum",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@LuisVmomentums",
    creator: "@LuisVmomentums",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18205066708"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "AW-18205066708");
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
