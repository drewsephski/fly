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
    default: "Drew Sepeczi - Web Developer",
    template: "%s | Drew Sepeczi"
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
    title: "Drew Sepeczi - Web Developer",
    description: "A minimal colored web development portfolio showcasing modern frontend projects and skills.",
    siteName: "Drew Sepeczi",
    images: [
      {
        url: "https://drewsepeczi.xyz/me-coffee.jpg",
        width: 585,
        height: 571,
        alt: "Drew Sepeczi - Web Development Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Drew Sepeczi - Web Developer",
    description: "A minimal colored web development portfolio showcasing modern frontend projects and skills.",
    images: ["https://drewsepeczi.xyz/me-coffee.jpg"],
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
    google: "81XT-CaAWLudKC3TmpkXs4k53NA5AmvYpVKflg2k8r0"
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

        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
