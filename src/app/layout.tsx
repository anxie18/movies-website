import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CLASSIC MOVIE TIMES — 经典电影时报",
  description: "重温银幕上的永恒经典 | 创刊于2024年",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full flex flex-col paper-texture">{children}</body>
    </html>
  )
}
