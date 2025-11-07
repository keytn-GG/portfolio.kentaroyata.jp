// rendering
'use client';

// dependensies
import { useState, useEffect } from 'react';

// CSS
import styles from '@/src/styles/components/returnTop.module.css';

export default function ReturnTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const returnTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!visible) return null;

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