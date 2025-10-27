import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "ふるそな - ふるさと納税おすすめ診断・限度額シミュレーション【無料】",
  description: "もう12月に慌てない！AIがあなたにぴったりの返礼品を診断。限度額計算から楽天ふるさと納税の選び方まで完全サポート。確定申告・ワンストップ特例も簡単。完全無料。",
  keywords: [
    "ふるさと納税",
    "おすすめ",
    "返礼品",
    "診断",
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
    title: "ふるそな - ふるさと納税おすすめ診断・限度額シミュレーション【無料】",
    description: "もう12月に慌てない！AIがあなたにぴったりの返礼品を診断。限度額計算から楽天ふるさと納税の選び方まで完全サポート。完全無料。",
    url: "https://furusona.jp",
    siteName: "ふるそな",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/img/furusona-logo.png",
        width: 1200,
        height: 630,
        alt: "ふるそな - AIふるさと納税アシスタント",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ふるそな - ふるさと納税おすすめ診断【無料】",
    description: "AIがあなたにぴったりの返礼品を診断。限度額計算・確定申告サポートも。完全無料。",
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
      </body>
    </html>
  );
}
