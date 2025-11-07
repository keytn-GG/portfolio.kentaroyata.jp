// rendering
'use client';

// dependensies
import { useState, useEffect } from 'react';

// CSS
import styles from '@/src/styles/components/returnTop.module.css';

export default function ReturnTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const target = document.querySelector('.container');
        if (!target) return;

        const handleScroll = () => {
            if (target.scrollTop > 200) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        target.addEventListener('scroll', handleScroll);

        return () => {
            target.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const returnTop = (): void => {
        const target = document.querySelector('.container');
        if (target) {
            target.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    if (!visible) return null;

    return (
        <button
            type="button"
            onClick={returnTop}
            className={`${styles.button} ${visible ? styles.visible : ''}`}
        >
            ↑
        </button>
    );
}