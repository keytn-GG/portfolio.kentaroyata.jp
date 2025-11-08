// rendering

// dependensies
import Image from 'next/image';
import Link from 'next/link';

// components

// stylea
import shared from '@/src/styles/shared.module.css';
import styles from '@/src/styles/pages/about.module.css';

export default function About() {
    return (
        <main className={shared.main}>
            <Link href="./" className={shared.button}>Return Home</Link>
            <section className={shared.section}>
                <h1 className={styles.heading}></h1>
            </section>
        </main>
    );
}