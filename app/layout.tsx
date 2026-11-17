import type { Metadata, Viewport } from "next";
import "./globals.css";


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
    other: [{ rel: "mask-icon", url: "/images/favicons/safari-pinned-tab.svg", color: "#041e42" }],
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
    "msapplication-TileColor": "#041e42",
    "msapplication-config": "/images/favicons/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor: "#041e42",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/style.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/fmb-theme.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
