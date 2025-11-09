// app/projects/[slug]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/src/lib/cms';
import type { Project } from '@/src/types/project';
import { formatDateJP } from '@/src/lib/datetime';

export const revalidate = 1800; // ISR: 30分毎に再生成

// ─────────────────────────────────────────────
// 動的メタデータ
// ─────────────────────────────────────────────
export async function generateMetadata({ params }: any) {
  const { slug } = params as { slug: string };
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

// ─────────────────────────────────────────────
// ページ本体
// ─────────────────────────────────────────────
export default async function ProjectDetail({ params }: any) {
  const { slug } = params as { slug: string };
  console.log('[detail] slug =', slug);
  const project: Project | null = await getProjectBySlug(slug);
  console.log('[detail] project =', project);
  if (!project) return notFound();

  const published = project.publishedAt ? formatDateJP(project.publishedAt) : null;
  const updated   = project.updatedAt   ? formatDateJP(project.updatedAt)   : null;

  return (
    <main style={{ padding: 24, maxWidth: 960, marginInline: 'auto' }}>
      <p style={{ margin: 0 }}>
        <Link href="/">← 一覧に戻る</Link>
      </p>

      <h1 style={{ margin: '12px 0 8px' }}>{project.title}</h1>

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
            width={project.cover.width ?? 1200}
            height={project.cover.height ?? 630}
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </div>
      ) : (
        <div style={{ marginTop: 16, aspectRatio: '1200/630', background: '#f3f4f6' }} />
      )}

      {project.lead && <p style={{ marginTop: 16, fontSize: 16 }}>{project.lead}</p>}

      {Array.isArray(project.tech) && project.tech.length > 0 && (
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 0, marginTop: 8, listStyle: 'none' }}>
          {project.tech.map((t) => (
            <li key={t} style={{ fontSize: 12, background: '#f3f4f6', padding: '2px 8px', borderRadius: 4 }}>
              {t}
            </li>
          ))}
        </ul>
      )}

      {/* 本文（microCMSのリッチテキストをHTMLで保持している場合） */}
      {project.body && (
        <article
          style={{ marginTop: 24, lineHeight: 1.9 }}
          // TODO: 本番では isomorphic-dompurify 等で sanitize してから描画する
          dangerouslySetInnerHTML={{ __html: project.body }}
        />
      )}

      {(project.url || project.repo) && (
        <div style={{ marginTop: 24 }}>
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
    </main>
  );
}
