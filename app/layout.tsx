import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Playfair_Display, Montserrat } from "next/font/google";
import { gtagInit, posthogInit } from "./analytics";

const desc = "Your workplace has the answer. Just ask for it.";

export const metadata: Metadata = {
  title: "Unlock collective wisdom",
  description: desc,
  authors: [{ name: "unseen.co" }],
  manifest: "/images/favicons/site.webmanifest",
  icons: {
    icon: [
      { url: "/images/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/images/favicons/favicon.ico",
    apple: { url: "/images/favicons/apple-touch-icon.png", sizes: "180x180" },
    other: [{ rel: "mask-icon", url: "/images/favicons/safari-pinned-tab.svg", color: "#5bbad5" }],
  },
  openGraph: {
    title: "Unlock collective wisdom",
    siteName: desc,
    description: desc,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unlock collective wisdom",
    description: desc,
  },
  other: {
    "msapplication-TileColor": "#000",
    "msapplication-config": "/images/favicons/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor: "#000000",
};

const playfair = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: "--font-playfair", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin", "cyrillic"], weight: ["300", "700"], variable: "--font-montserrat", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        {children}
        <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gtagInit }} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-L5SSFERMSM" strategy="afterInteractive" />
        <Script id="posthog-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: posthogInit }} />
      </body>
    </html>
  );
}
