import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { gtagInit, posthogInit } from "./analytics";

const desc = "Your workplace has the answer. Just ask Dala for it.";
const ogAlt =
  'The Dala logo above the headline "Unlock collective wisdom", sitting on top of a 3D brain composed of many small pyramidal particles.';

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

const fonts = ["Light", "Regular", "SemiBold"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {fonts.map((f) => (
          <link
            key={f}
            rel="preload"
            as="font"
            href={`/fonts/PPNeueMontreal-${f}.woff2`}
            crossOrigin=""
          />
        ))}
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
