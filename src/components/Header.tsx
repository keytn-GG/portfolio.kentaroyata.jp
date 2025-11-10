// rendering
"use client";

// dependensies
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

// CSS
import shared from "@/src/styles/shared.module.css";
import styles from "@/src/styles/components/header.module.css";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const removeFocus = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.currentTarget.blur();
        setIsOpen(false);
    }
    return (
        <header className={clsx(styles.header, isOpen && styles.active)}>
            <button
                type='button'
                className={styles.navButton}
                aria-expanded={isOpen}
                aria-controls='nav'
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={styles.navButtonBar}></span>
                <span className={styles.navButtonBar}></span>
                <span className={styles.navButtonBar}></span>
            </button>
            <div className={styles.headerContent}>
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
            </div>
        </header>
    );
}