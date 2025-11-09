// viewport
export const viewport = {
    width: "device-width",
    initialScale: "1"
}

// metadata
export const metadata: Metadata = {
    title: 'KENTARO YATA PORTFOLIO - Frontend Engineer & Plogrammer, Sapporo, Hokkaido, Japan',
    description: '札幌在住のフロントエンドエンジニア、プログラマの矢田健太郎のポートフォリオサイトです。ReactとNext.jsを利用したWeb制作、Javaを利用した業務システム開発などを学習しています。',
    robots: 'noindex, nofollow',
    openGraph: {
        title: 'KENTARO YATA PORTFOLIO - Frontend Engineer & Plogrammer, Sapporo, Hokkaido, Japan',
        description: '札幌在住のフロントエンドエンジニア、プログラマの矢田健太郎のポートフォリオサイトです。ReactとNext.jsを利用したWeb制作、Javaを利用した業務システム開発などを学習しています。',
        url: 'https://portfolio.kentaroyata.jp/',
        siteName: 'KENTARO YATA PORTFOLIO - Frontend Engineer & Plogrammer, Sapporo, Hokkaido, Japan',
        type: 'website',
    },
};

// dependencies
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

// components
import ReturnTop from "@/src/components/ReturnTop";
import CursorLayer from "@/src/components/CursorLayer";
import Header from "@/src/components/Header";

// CSS
import "@/src/styles/uaplus.css";
import "@/src/styles/globals.css";

// fonts
const notoSansJp = Noto_Sans_JP ({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-notoSansJp",
    display: "swap"
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body
                className={`${notoSansJp.variable} antialiased`}
            >
                <Analytics/>
                {/* <CursorLayer /> */}
                <Header />
                <div className="container">
                    {children}
                </div>
                <ReturnTop />
            </body>
        </html>
    );
}
