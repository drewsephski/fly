import { Playfair_Display, DM_Sans } from "next/font/google"
import { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
})

export const metadata: Metadata = {
  title: {
    default: "Fly Portfolio - Web Developer",
    template: "%s | Fly Portfolio"
  },
  description: "A minimal colored web development portfolio showcasing modern frontend projects, React/Next.js expertise, and clean design principles.",
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
    "full stack"
  ],
  authors: [{ name: "Drew Sepeczi", url: "https://drewsepeczi.xyz" }],
  creator: "Drew Sepeczi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://drewsepeczi.xyz",
    title: "Fly Portfolio - Web Developer",
    description: "A minimal colored web development portfolio showcasing modern frontend projects and skills.",
    siteName: "Fly Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fly Portfolio - Web Development Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fly Portfolio - Web Developer",
    description: "A minimal colored web development portfolio showcasing modern frontend projects and skills.",
    images: ["/og-image.png"],
    creator: "@drewsepeczi"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code"
  }
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
      className={cn("antialiased", playfair.variable, dmSans.variable)}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
