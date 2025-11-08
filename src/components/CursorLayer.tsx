// components/CursorLayer.tsx
'use client';

// dependencies
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

// css
import styles from '@/src/styles/components/cursorLayer.module.css';

export default function CursorLayer() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const cursor = cursorRef.current!;
        const follower = followerRef.current!;
        if (!cursor || !follower) return;

        const mouseX = { v: 0 };
        const mouseY = { v: 0 };
        const posX = { v: 0 };
        const posY = { v: 0 };
        let hasMoved = false;

        const onMove = (e: MouseEvent) => {
            mouseX.v = e.clientX;
            mouseY.v = e.clientY;

            if (!hasMoved) {
                posX.v = mouseX.v;
                posY.v = mouseY.v;
                hasMoved = true;
                gsap.set([cursor, follower], { opacity: 1 });
            }
        };

        const update = () => {
            posX.v += (mouseX.v - posX.v) / 9;
            posY.v += (mouseY.v - posY.v) / 9;

            gsap.set(follower, {
                left: posX.v - follower.offsetWidth / 2,
                top: posY.v - follower.offsetHeight / 2,
            });

            gsap.set(cursor, {
                left: mouseX.v - cursor.offsetWidth / 2,
                top: mouseY.v - cursor.offsetHeight / 2,
            });
        };

        gsap.set([cursor, follower], { opacity: 0 });

        if (!hasMoved) {
            posX.v = mouseX.v;
            posY.v = mouseY.v;
            hasMoved = true;

            gsap.to([cursor, follower], { opacity: 1, duration: 0.3, ease: "power2.out" });
        }

        document.addEventListener("mousemove", onMove, { passive: true });
        gsap.ticker.add(update);

        const SELECTOR =
        'a[href], button:not([disabled]), input[type="submit"], input[type="button"], input[type="image"], [role="button"]:not([aria-disabled="true"])';

        const onOver = (e: Event) => {
            const target = e.target as Element | null;
            if (target && target.closest(SELECTOR)) {
                cursor.classList.add(styles.active);
                follower.classList.add(styles.active);
            }
        };

        const onOut = (e: Event) => {
            const target = e.target as Element | null;
            if (target && target.closest(SELECTOR)) {
                cursor.classList.remove(styles.active);
                follower.classList.remove(styles.active);
            }
        };

        document.addEventListener("pointerover", onOver, true);
        document.addEventListener("pointerout", onOut, true);

        const deactivate = () => {
            cursor.classList.remove(styles.active);
            follower.classList.remove(styles.active);
        };

        const onPointerDown = () => deactivate();
        const onBlur = () => deactivate();
        const onVisibility = () => {
            if (document.visibilityState !== "visible") deactivate();
        };

        document.addEventListener("pointerdown", onPointerDown, true);
        window.addEventListener("blur", onBlur);
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            document.removeEventListener("mousemove", onMove);
            gsap.ticker.remove(update);

            document.removeEventListener("pointerover", onOver, true);
            document.removeEventListener("pointerout", onOut, true);

            document.removeEventListener("pointerdown", onPointerDown, true);
            window.removeEventListener("blur", onBlur);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

    useEffect(() => {
        const c = cursorRef.current;
        const f = followerRef.current;
        if (!c || !f) return;
        c.classList.remove(styles.active);
        f.classList.remove(styles.active);
    }, [pathname]);

    return (
        <>
        <div ref={cursorRef} className={styles.cursor}></div>
        <div ref={followerRef} className={styles.follower}></div>
        </>
    );
}

