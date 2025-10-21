import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "TARGET 2.0 - FiveM Cheat Status",
  description: "Target 2.0 Status - Real-time status monitoring for Target FiveM cheat. Check system status and anticheat bypass information.",
  keywords: "Target 2.0, FiveM cheat, status page, anticheat bypass, undetected",
  authors: [{ name: "Target 2.0" }],
  creator: "Target 2.0",
  icons: {
    icon: "/target.png",
    shortcut: "/target.png",
    apple: "/target.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="dark" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
