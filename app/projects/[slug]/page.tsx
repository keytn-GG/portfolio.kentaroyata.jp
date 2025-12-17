// rendering
export const revalidate = 60;

// dependensies
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjectNavBySlug } from '@/src/lib/cms';
import { formatDateJP } from '@/src/lib/datetime';
import { OpenInNew } from '@/src/components/Icon';

// types
import type { Project } from '@/src/types/project';

// CSS
import shared from "@/src/styles/shared.module.css";
import styles from "@/src/styles/components/projects/projectDetails.module.css";

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

export default async function ProjectDetail({ params }: any) {
    const { slug } = await params as { slug: string };
    const project: Project | null = await getProjectBySlug(slug);
    if (!project) return notFound();

    const published = project.publishedAt ? formatDateJP(project.publishedAt) : null;
    const updated   = project.updatedAt   ? formatDateJP(project.updatedAt)   : null;
    const { prev, next } = await getProjectNavBySlug(slug);

    return (
        <main className={shared.main}>
            <div>
                <Link href="/" className={`${shared.button} ${styles.aboutButton}`}>
                    Return Home
                </Link>
                <div>
                    {prev && (
                        <Link href={`/projects/${prev.slug}`} className={`${shared.button} ${styles.navButton}`}>
                            ← {prev.title}
                        </Link>
                    )}
                    {next && (
                        <Link href={`/projects/${next.slug}`} className={`${shared.button} ${styles.navButton}`}>
                            {next.title} →
                        </Link>
                    )}
                </div>
            </div>
            <div className={shared.section}>
                {project.cover?.url ? (
                    <div className={styles.imageWrapper}>
                        <Image
                            src={project.cover.url}
                            alt={project.title}
                            width={768}
                            height={432}
                            className={styles.image}
                            priority
                        />
                    </div>
                ) : (
                    <div />
                )}
                <hgroup className={styles.hgroup}>
                    <h1 className={styles.title}>{project.title}</h1>
                    {project.lead && <p className={styles.lead}>{project.lead}</p>}
                </hgroup>
                <div className={styles.meta}>
                    {published && 
                        <time dateTime={published} className={styles.date}>
                            <span className={styles.metaTitle}>Published:</span>
                            {published}
                        </time>
                    }
                    {updated && 
                        <time dateTime={updated} className={styles.date}>
                            <span className={styles.metaTitle}>Updated:</span>
                            {updated}
                        </time>
                    }
                    {project.tech && project.tech.length > 0 && (
                        <div className={styles.tech}>
                            <span className={styles.metaTitle}>Tech:</span>
                            <ul className={styles.techList}>
                                {project.tech.map((tech) => (
                                    <li key={tech} className={styles.techItems}>{tech}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {(project.url || project.repo) && (
                        <div className={styles.projectButton}>
                            {project.url && (
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                                    View Project <OpenInNew />
                                </a>
                            )}
                            {project.repo && (
                                <a href={project.repo} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                                    View Repository <OpenInNew />
                                </a>
                            )}
                        </div>
                    )}
                </div>
                {project.body && (
                    <article
                    // TODO: 本番では isomorphic-dompurify 等で sanitize してから描画する
                    dangerouslySetInnerHTML={{ __html: project.body }}
                    className={styles.body}
                    />
                )}
            </div>
        </main>
    );
}
