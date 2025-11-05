// viewport
export const viewport = {
    width: 'device-width',
    initialScale: '1'
}

// dependencies
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';

// components
import Header from '@/components/Header';

// CSS
import '@/styles/uaplus.css';
import '@/styles/globals.css';

// fonts
const notoSansJp = Noto_Sans_JP ({
    subsets: ['latin'],
    weight: ['400', '500'],
    variable: '--font-notoSnasJp',
    display: 'swap'
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${notoSansJp.variable} antialiased`}
            >
                <Header />
                {children}
            </body>
        </html>
    );
}
