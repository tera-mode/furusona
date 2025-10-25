import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata: Metadata = {
  title: "ふるそな - ふるさと納税パーソナライズ推薦",
  description: "AIがあなたにぴったりのふるさと納税返礼品を提案。年収・家族構成から限度額を自動計算し、最適な返礼品を3つ推薦します。",
  keywords: ["ふるさと納税", "返礼品", "AI推薦", "限度額計算", "パーソナライズ"],
  authors: [{ name: "ふるそな" }],
  icons: {
    icon: "/img/furusona-fav.png",
    apple: "/img/furusona-fav.png",
  },
  openGraph: {
    title: "ふるそな - ふるさと納税パーソナライズ推薦",
    description: "AIがあなたにぴったりのふるさと納税返礼品を提案。年収・家族構成から限度額を自動計算し、最適な返礼品を3つ推薦します。",
    url: "https://furusona.jp",
    siteName: "ふるそな",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ふるそな - ふるさと納税パーソナライズ推薦",
    description: "AIがあなたにぴったりのふるさと納税返礼品を提案",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased bg-slate-50 dark:bg-slate-900">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
