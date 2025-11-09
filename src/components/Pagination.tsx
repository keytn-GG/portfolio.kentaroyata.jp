// dependensies
import Link from 'next/link';

// types
import type { FC } from 'react';
type Props = {
    current: number;
    totalPages: number;
    basePath?: string;
    windowSize?: number;
};

// CSS
import styles from "@/src/styles/paginaion.module.css";

const Pagination: FC<Props> = ({
    current,
    totalPages,
    basePath = '/page',
    windowSize = 5,
}) => {
    if (totalPages <= 1) return null;

    const hrefFor = (n: number) => (n === 1 ? '/' : `${basePath}/${n}`);

    const start = Math.max(1, current - Math.floor(windowSize / 2));
    const end = Math.min(totalPages, start + windowSize - 1);
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const renderItem = (n: number) => (
        <li key={n}>
        {n === current ? (
            <span aria-current="page">
                {n}
            </span>
        ) : (
            <Link href={hrefFor(n)}>
                {n}
            </Link>
        )}
        </li>
    );

    return (
        <nav aria-label="Pagination" style={{ marginTop: 24 }}>
            <ul>
                <li>
                {current > 1 ? (
                    <Link href={hrefFor(current - 1)} aria-label="Previous page">Prev</Link>
                ) : (
                    <span aria-disabled="true">Prev</span>
                )}
                </li>

                {start > 1 && (
                <>
                    {renderItem(1)}
                    {start > 2 && <li aria-hidden="true">…</li>}
                </>
                )}

                {pages.map(renderItem)}

                {end < totalPages && (
                <>
                    {end < totalPages - 1 && <li aria-hidden="true">…</li>}
                    {renderItem(totalPages)}
                </>
                )}

                <li>
                {current < totalPages ? (
                    <Link href={hrefFor(current + 1)} aria-label="Next page">Next</Link>
                ) : (
                    <span aria-disabled="true">Next</span>
                )}
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
