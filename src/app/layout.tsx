import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RugFlip Tap",
  description: "🎮 The ultimate crypto revenge story! Join the narrative to flip the 11.3B rugged from memecoins. Click, upgrade, and dominate in this cyberpunk clicker game where every tap fights back against rug pulls. Can you reach 11.3B market cap and flip the script? 🚀⚡",
  keywords: "rugflip, crypto clicker, rug pull revenge, meme coins, blockchain game, cyberpunk game, crypto gaming, web3 clicker, solana gaming",
  authors: [{ name: "RugFlip Team" }],
  openGraph: {
    title: "RugFlip Tap",
    description: "🎮 Join the narrative to flip the 11.3B rugged from memecoins! The ultimate crypto revenge clicker game. 🚀",
    url: "https://rugflip-game.vercel.app",
    siteName: "RugFlip Tap",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "RugFlip Tap - Crypto Clicker Game",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RugFlip Tap",
    description: "🎮 Join the narrative to flip the 11.3B rugged from memecoins! The ultimate crypto revenge clicker game. 🚀",
    images: ["/logo.png"],
    creator: "@RugFlip",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#0a0f1c" />
        
        {/* Favicon */}
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Additional Social Media Meta */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image:alt" content="RugFlip Tap - Join the narrative to flip the 11.3B rugged from memecoins!" />
      </head>
      <body
        className={`${rajdhani.variable} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
