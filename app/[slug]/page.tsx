// rendering
export const revalidate = 60;

// dependencies
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchAllWorkSlugs, fetchWorkBySlug, fetchPrevNext } from '@/src/libs/getWorks';

// types
import type { Work } from '@/src/types/work';

// component
import { PrevIcon, NextIcon } from '@/src/components/Icon';

// css
import shared from '@/src/styles/shared.module.css';
import styles from '@/src/styles/pages/works-detail.module.css';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    const slugs = await fetchAllWorkSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const work = await fetchWorkBySlug(slug);
    if (!work) return { title: 'WORKS - Not found' };

    const title = work.title;
    const description = work.lead ?? 'Project detail';
    const ogImage = work.cover?.url;

    return {
        title: `${title} - KENWEB.pro`,
        description,
        openGraph: {
            title,
            description,
            images: ogImage ? [{ url: ogImage }] : undefined,
            type: 'article',
        },
        twitter: {
            card: ogImage ? 'summary_large_image' : 'summary',
            title,
            description,
            images: ogImage ? [ogImage] : undefined,
        },
    };
}


function formatJST(iso?: string | null) {
    if (!iso) return null;
    return new Intl.DateTimeFormat('ja-JP', {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(iso));
}

export default async function WorkDetailPage({ params }: Props) {
    const { slug } = await params;
    const work = (await fetchWorkBySlug(slug)) as Work | null;
    if (!work) notFound();

    const { prev, next } = await fetchPrevNext(work);
    const published = work.publishedAt ?? work.createdAt;
    const modified  = work.revisedAt   ?? work.updatedAt;
    const coverUrl = work.cover?.url;
    const html = work.body && typeof work.body === 'string'
        ? work.body
        : (work.lead ? `<p>${work.lead}</p>` : '');

    const tech = Array.isArray(work.tech) ? work.tech : [];

    return (
        <main className={shared.main}>
            <div className={shared.container}>
                <article className={styles.article}>
                    {coverUrl && (
                    <div className={styles.cover}>
                        <Image
                            src={coverUrl}
                            alt={work.title}
                            width={768}
                            height={432}
                            className={styles.coverImage}
                            priority
                        />
                    </div>
                    )}

                    <header className={styles.header}>
                        <h1 className={styles.title}>{work.title}</h1>
                        {work.lead && <p className={styles.lead}>{work.lead}</p>}
                        <div className={styles.meta}>
                            {published && (
                            <time dateTime={published} className={styles.date}>
                                <span className={styles.metaTitle}>Published:</span>{formatJST(published)}
                            </time>
                            )}
                            {modified && modified !== published && (
                            <time dateTime={modified} className={styles.date}>
                                <span className={styles.metaTitle}>Modified:</span>{formatJST(modified)}
                            </time>
                            )}
                            {tech.length > 0 && (
                            <div className={styles.tech}>
                                <span className={styles.metaTitle}>Tech:</span>
                                <ul className={styles.techList}>
                                    {tech.map((t) => (
                                        <li key={t} className={styles.techItem}>{t}</li>
                                    ))}
                                </ul>
                            </div>
                            )}
                        </div>
                    </header>

                    {html && (
                    <div
                        className={styles.body}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                    )}
                </article>
                <nav className={styles.pagenav} aria-label="前後の記事">
                    <div className={styles.pagenavBack}>
                        <Link href="/works" className={styles.pagenavLink} aria-label="一覧に戻る">
                            Back To List
                        </Link>
                    </div>
                    <ul className={styles.pagenavList}>
                        <li className={`${styles.pagenavPrev} ${styles.pagenavItems}`}>
                        {prev ? (
                            <Link
                                href={`/${prev.slug}`}
                                aria-label={`前の記事: ${prev.title}`}
                                className={styles.pagenavLink}
                            >
                                <PrevIcon aria-hidden="true" />
                            </Link>
                        ) : (
                            <span
                                className={`${styles.pagenavLink} ${styles.pagenavDisabled}`}
                                aria-hidden="true"
                                aria-disabled="true"
                            >
                                <PrevIcon aria-hidden="true" />
                            </span>
                        )}
                        </li>
                        <li className={`${styles.pagenavNext} ${styles.pagenavItems}`}>
                        {next ? (
                            <Link
                                href={`/${next.slug}`}
                                aria-label={`次の記事: ${next.title}`}
                                className={styles.pagenavLink}
                            >
                                <NextIcon aria-hidden="true" />
                            </Link>
                        ) : (
                            <span
                                className={`${styles.pagenavLink} ${styles.pagenavDisabled}`}
                                aria-hidden="true"
                                aria-disabled="true"
                            >
                                <NextIcon aria-hidden="true" />
                            </span>
                        )}
                        </li>
                    </ul>
                </nav>

            </div>
        </main>
    );
}
