// viewport
export const viewport = {
    width: 'device-width',
    initialScale: '1'
}

// dependencies
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import ReturnTop from '@/src/components/ReturnTop';

// components
import CursorLayer from '@/src/components/CursorLayer';
import Header from '@/src/components/Header';

// CSS
import '@/src/styles/uaplus.css';
import '@/src/styles/globals.css';

// fonts
const notoSansJp = Noto_Sans_JP ({
    subsets: ['latin'],
    weight: ['400', '500'],
    variable: '--font-notoSansJp',
    display: 'swap'
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
                <CursorLayer />
                <Header />
                <div className="container">
                    {children}
                </div>
                <ReturnTop />
            </body>
        </html>
    );
}
