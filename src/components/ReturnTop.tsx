// rendering
'use client';

// dependensies

// CSS
import styles from '@/src/styles/components/returnTop.module.css';

export default function ReturnTopButton() {
    const returnTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <button
            type="button"
            onClick={returnTop}
            className={styles.button}
        >
            ↑
        </button>
    );
}