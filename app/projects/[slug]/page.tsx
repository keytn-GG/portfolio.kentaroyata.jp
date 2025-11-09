// rendering
export const revalidate = 60;

// metadata
export async function generateMetadata({ params }: any) {
    const { slug } = await params as { slug: string };
    const project = await getProjectBySlug(slug);
    if (!project) return {};

    const title = project.title ?? 'Project';
    const description = project.lead ?? 'Project detail';
    const images = project.cover?.url
        ? [{ url: project.cover.url, width: project.cover.width ?? 1200, height: project.cover.height ?? 630 }]
        : [];

    return {
        title,
        description,
        openGraph: { title, description, images },
        twitter: { card: 'summary_large_image' },
    };
}

// dependensies
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/src/lib/cms';
import { formatDateJP } from '@/src/lib/datetime';

// types
import type { Project } from '@/src/types/project';

// CSS
import shared from "@/src/styles/shared.module.css";
import styles from "@/src/styles/components/projects/projectDetails.module.css";

export default async function ProjectDetail({ params }: any) {
    const { slug } = await params as { slug: string };
    const project: Project | null = await getProjectBySlug(slug);
    if (!project) return notFound();

    const published = project.publishedAt ? formatDateJP(project.publishedAt) : null;
    const updated   = project.updatedAt   ? formatDateJP(project.updatedAt)   : null;

    return (
        <main className={shared.main}>
            <Link href="/" className={`${shared.button} ${styles.aboutButton}`}>
                Return To List
            </Link>
            <div className={shared.section}>
                <h1>{project.title}</h1>
                {(published || updated) && (
                    <div style={{ color: '#6b7280', fontSize: 14, display: 'flex', gap: 16 }}>
                        {published && <span>公開: {published}</span>}
                        {updated && <span>更新: {updated}</span>}
                    </div>
                )}
                {project.cover?.url ? (
                    <div style={{ marginTop: 16 }}>
                    <Image
                        src={project.cover.url}
                        alt={project.title}
                        width={768}
                        height={432}
                        priority
                    />
                    </div>
                ) : (
                    <div />
                )}
                {project.lead && <p className={styles.lead}>{project.lead}</p>}

                {Array.isArray(project.tech) && project.tech.length > 0 && (
                    <ul className={styles.techList}>
                    {project.tech.map((t) => (
                        <li key={t} className={styles.techItems}>
                            {t}
                        </li>
                    ))}
                    </ul>
                )}
                {project.body && (
                    <article
                    // TODO: 本番では isomorphic-dompurify 等で sanitize してから描画する
                    dangerouslySetInnerHTML={{ __html: project.body }}
                    className={styles.article}
                    />
                )}
                {(project.url || project.repo) && (
                    <div className={styles.url}>
                    {project.url && (
                        <p>
                            公開URL:{' '}
                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                                {project.url}
                            </a>
                        </p>
                    )}
                    {project.repo && (
                        <p>
                            リポジトリ:{' '}
                            <a href={project.repo} target="_blank" rel="noopener noreferrer">
                                {project.repo}
                            </a>
                        </p>
                    )}
                    </div>
                )}
            </div>
        </main>
    );
}
