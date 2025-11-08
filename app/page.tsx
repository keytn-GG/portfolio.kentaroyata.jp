// rendering
export const revalidate = 60;

// dependensies
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// types
import type { Work } from '@/src/types/work';

// component
import { fetchWorksPage, PER_PAGE } from '@/src/libs/getWorks';

// CSS
import shared from "@/src/styles/shared.module.css";
import styles from "@/src/styles/pages/home.module.css";

// JST formatter
function formatJST(iso?: string | null) {
    if (!iso) return null;
    return new Intl.DateTimeFormat('ja-JP', {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(iso));
}

// Pagination (links -> ?page=n)
function Pagination({ current, totalCount }: { current: number; totalCount: number }) {
    const totalPages = Math.ceil(totalCount / PER_PAGE);
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className={styles.pagination} aria-label="Works pages">
            <ul className={styles.paginationList}>
                {pages.map((p) => {
                const href = p === 1 ? `/works` : `/works?page=${p}`;
                const isActive = p === current;
                return (
                    <li key={p} className={isActive ? styles.active : undefined}>
                    <Link
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                        className={styles.paginationLink}
                    >
                        {p}
                    </Link>
                    </li>
                );
                })}
            </ul>
        </nav>
    );
}

type PageProps = {
    searchParams: Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
    const sp = await searchParams;
    const current = Math.max(1, Number(sp?.page ?? 1));

    const { contents, totalCount } = await fetchWorksPage(current);

    return (
        <main className={shared.main}>
            <div className={shared.container}>
                <ul className={styles.list}>
                {contents.map((work: Work) => {
                    const published = work.publishedAt ?? work.createdAt;
                    const modified = work.revisedAt ?? work.updatedAt;
                    const tech = Array.isArray((work as any).tech) ? (work as any).tech : [];

                    return (
                    <li key={work.id} className={styles.item}>
                        <Link href={`/${work.slug}`}>
                            {work.cover && (
                                <Image
                                src={work.cover.url}
                                alt={work.title}
                                width={768}
                                height={432}
                                className={styles.image}
                                />
                            )}
                            <h2 className={styles.title}>{work.title}</h2>
                            {work.lead && <p className={styles.lead}>{work.lead}</p>}
                            <div className={styles.meta}>
                                {published && (
                                <time dateTime={published} className={styles.date}>
                                    <span className={styles.metaTitle}>Published:</span>{' '}
                                    {formatJST(published)}
                                </time>
                                )}
                                {modified && modified !== published && (
                                <time dateTime={modified} className={styles.date}>
                                    <span className={styles.metaTitle}>Modified:</span>{' '}
                                    {formatJST(modified)}
                                </time>
                                )}
                                {tech.length > 0 && (
                                <div className={styles.tech}>
                                    <span className={styles.metaTitle}>Tech:</span>
                                    <ul className={styles.techList}>
                                    {tech.map((t: string) => (
                                        <li key={t} className={styles.techItem}>
                                        {t}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                            </div>
                        </Link>
                    </li>
                    );
                })}
                </ul>
                <Pagination current={current} totalCount={totalCount} />
            </div>
        </main>
    );
}