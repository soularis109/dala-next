import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { gtagInit, posthogInit } from "./analytics";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const desc = "Your workplace has the answer. Just ask Dala for it.";
const ogAlt =
  'The Dala logo above the headline "Unlock collective wisdom", with a large 3D document assembled from thousands of small paper documents.';

export const metadata: Metadata = {
  metadataBase: new URL("https://dala.ai"),
  title: "Dala",
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
    title: "Dala",
    siteName: desc,
    url: "https://dala.ai/",
    description: desc,
    type: "website",
    images: [{ url: "https://dala.ai/images/fb-og.jpg", alt: ogAlt, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@askdala",
    title: "Dala",
    description: desc,
    images: [{ url: "https://dala.ai/images/twitter-og.jpg", alt: ogAlt }],
  },
  other: {
    "msapplication-TileColor": "#F6F2E9",
    "msapplication-config": "/images/favicons/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F2E9" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
  ],
};

// Runs before first paint: picks saved theme or the system preference.
// Also enables "animation only" mode (all site copy hidden via CSS, layout untouched) unless the URL has ?text.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}try{if(!/[?&]text(=|&|$)/.test(location.search))document.documentElement.setAttribute('data-anim-only','')}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/style.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/light-theme.css" />
      </head>
      <body className="bg-background font-montserrat font-light text-primary antialiased">
        {children}
        <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gtagInit }} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-L5SSFERMSM" strategy="afterInteractive" />
        <Script id="posthog-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: posthogInit }} />
      </body>
    </html>
  );
}
