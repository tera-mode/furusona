import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata: Metadata = {
  title: "ふるそな - もう12月に慌てない。AIがあなた専属でふるさと納税をサポート",
  description: "限度額の管理から、旬の食材の通知まで。AIがあなたの好みに合わせた返礼品を、最適なタイミングでお届けします。完全無料・クレジットカード登録不要。",
  keywords: [
    "ふるさと納税",
    "返礼品",
    "AI推薦",
    "限度額計算",
    "パーソナライズ",
    "楽天ふるさと納税",
    "旬の食材",
    "通知",
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
    title: "ふるそな - もう12月に慌てない。AIがあなた専属でふるさと納税をサポート",
    description: "限度額の管理から、旬の食材の通知まで。AIがあなたの好みに合わせた返礼品を、最適なタイミングでお届けします。完全無料。",
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
    title: "ふるそな - もう12月に慌てない。AIがあなた専属でふるさと納税をサポート",
    description: "限度額の管理から、旬の食材の通知まで。完全無料でAIがサポート。",
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
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
