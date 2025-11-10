// rendering
"use client";

// dependensies
import { useState, useEffect } from "react";

// components
import { ArrowUp } from '@/src/components/Icon';

// CSS
import styles from "@/src/styles/components/returnTop.module.css";

export default function ReturnTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const target = document.querySelector(".contentArea");
        if (!target) return;

        const handleScroll = () => {
            if (target.scrollTop > 200) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        target.addEventListener("scroll", handleScroll);

        return () => {
            target.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const returnTop = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const target = document.querySelector(".contentArea");
        if (target) {
            target.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        };
        e.currentTarget.blur();
    };

    return (
        <button
            type="button"
            onClick={returnTop}
            className={`${styles.button} ${visible ? styles.visible : ""}`}
            aria-label="ページ先頭に戻るボタン"
        >
            <ArrowUp />
        </button>
    );
}