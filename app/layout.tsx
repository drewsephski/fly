import { DM_Sans, Fraunces, IBM_Plex_Mono } from "next/font/google"
import { Metadata } from "next"

import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
})

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: {
    default: "Drew Sepeczi — AI Product Engineer",
    template: "%s | Drew Sepeczi",
  },
  description:
    "Drew Sepeczi turns rough ideas into shipped AI products, interfaces, and infrastructure. Explore selected work, or get in touch to build something useful.",
  keywords: [
    "web developer",
    "frontend developer",
    "portfolio",
    "nextjs",
    "react",
    "typescript",
    "minimal design",
    "modern web",
    "UI/UX",
    "full stack",
  ],
  authors: [{ name: "Drew Sepeczi", url: "https://drewsepeczi.xyz" }],
  creator: "Drew Sepeczi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://drewsepeczi.xyz",
    title: "Drew Sepeczi — AI Product Engineer",
    description:
      "AI products, interfaces, and infrastructure designed and shipped by Drew Sepeczi.",
    siteName: "Drew Sepeczi",
    images: [
      {
        url: "https://drewsepeczi.xyz/me-coffee.jpg",
        width: 585,
        height: 571,
        alt: "Drew Sepeczi - Web Development Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drew Sepeczi — AI Product Engineer",
    description:
      "AI products, interfaces, and infrastructure designed and shipped by Drew Sepeczi.",
    images: ["https://drewsepeczi.xyz/me-coffee.jpg"],
    creator: "@drewsepeczi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "81XT-CaAWLudKC3TmpkXs4k53NA5AmvYpVKflg2k8r0",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fraunces.variable,
        dmSans.variable,
        plexMono.variable
      )}
    >
      <body>
        <a id="skip-to-content" href="#main-content">
          Skip to content
        </a>
        <ThemeProvider>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
