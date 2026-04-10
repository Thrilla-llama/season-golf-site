import { Geist } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
})

export const metadata = {
  title: {
    template: "%s | Season Golf",
    default: "Season Golf – Match Play Golf Platform",
  },
  description:
    "Season Golf is the match play golf platform. Browse Georgia golf courses, view leaderboards, and compete with friends.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-white text-foreground font-sans">
        {children}
      </body>
    </html>
  )
}
