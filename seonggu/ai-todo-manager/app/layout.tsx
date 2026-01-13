import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Todo Manager",
  description: "AI비서와 함께하는 스마트한 할 일 관리",
  keywords: ["할 일 관리", "Todo", "AI", "생산성", "일정 관리", "할 일 목록"],
  authors: [{ name: "AI Todo Manager" }],
  creator: "AI Todo Manager",
  publisher: "AI Todo Manager",
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
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://ai-todo-manager.vercel.app",
    title: "AI Todo Manager",
    description: "AI비서와 함께하는 스마트한 할 일 관리",
    siteName: "AI Todo Manager",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Todo Manager",
    description: "AI비서와 함께하는 스마트한 할 일 관리",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  alternates: {
    canonical: "https://ai-todo-manager.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
