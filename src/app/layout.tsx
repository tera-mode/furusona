import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "あなたのふるさと納税AI - AIがあなたの返礼品選びをサポート【無料】",
  description: "AIがあなたにぴったりの返礼品を提案。限度額計算から楽天ふるさと納税の選び方まで完全サポート。確定申告・ワンストップ特例も簡単。完全無料。",
  keywords: [
    "ふるさと納税",
    "おすすめ",
    "返礼品",
    "AI",
    "選び方",
    "限度額計算",
    "シミュレーション",
    "AI推薦",
    "パーソナライズ",
    "楽天ふるさと納税",
    "確定申告",
    "ワンストップ特例",
    "牛肉",
    "海鮮",
    "日用品",
    "無料",
    "12月",
  ],
  authors: [{ name: "LAIV LLC" }],
  creator: "LAIV LLC",
  publisher: "LAIV LLC",
  metadataBase: new URL("https://furusona.jp"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/img/furusona-fav.png",
    apple: "/img/furusona-fav.png",
  },
  openGraph: {
    title: "あなたのふるさと納税AI - AIがあなたの返礼品選びをサポート【無料】",
    description: "AIがあなたにぴったりの返礼品を提案。限度額計算から楽天ふるさと納税の選び方まで完全サポート。完全無料。",
    url: "https://furusona.jp",
    siteName: "あなたのふるさと納税AI",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/img/furusona-logo.png",
        width: 1200,
        height: 630,
        alt: "あなたのふるさと納税AI - AIふるさと納税アシスタント",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "あなたのふるさと納税AI - AIがあなたの返礼品選びをサポート【無料】",
    description: "AIがあなたにぴったりの返礼品を提案。限度額計算・確定申告サポートも。完全無料。",
    images: ["/img/furusona-logo.png"],
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
    // Google Search Console verification (必要に応じて追加)
    // google: 'your-verification-code',
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
        <GoogleAnalytics />
        <AuthProvider>
          {children}
        </AuthProvider>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5781326713622626"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
