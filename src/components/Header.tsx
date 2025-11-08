// rendering
'use client';

// dependensies
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

// CSS
import shared from '@/src/styles/shared.module.css';
import styles from '@/src/styles/components/header.module.css';

export default function Header() {
    const removeFocus = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.currentTarget.blur();
    }
    return (
        <header className={styles.header}>
            <div className={styles.imageWrapper}>
                <Image
                    src="/portfolioLogo.svg"
                    alt="kentaro yataのポートフォリオサイトのロゴ"
                    className={styles.image}
                    width={325}
                    height={161}
                    priority
                />
            </div>
            <p className={styles.lead}>
                Frontend Engineer &amp; Programmer<br />
                Sapporo, Hokkaido, Japan
            </p>
            <Link href="/about" className={`${shared.button} ${styles.aboutButton}`} onClick={removeFocus}>
                About Me
            </Link>
        </header>
    );
}