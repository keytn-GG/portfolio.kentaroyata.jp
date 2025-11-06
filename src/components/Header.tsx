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
    return (
        <header className={styles.header}>
            <div className={styles.imageWrapper}>
                <Image
                    src="/portfolioLogo.svg"
                    alt="kentaro yataのポートフォリオサイトのロゴ"
                    className={styles.image}
                    width={512}
                    height={512}
                />
            </div>
            <p className={styles.lead}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nulla qui, rerum reiciendis a quaerat aliquam minus aliquid nobis cumque expedita repellat autem vitae, ut delectus molestias illum eius est.
            </p>
        </header>
    );
}