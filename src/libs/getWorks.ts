// /src/lib/getWorks.ts
import { client } from '@/src/libs/microcms';
import type { Work } from '@/src/types/work';

export const PER_PAGE = 12;

export async function fetchWorksPage(page: number) {
    const offset = (page - 1) * PER_PAGE;
    const res = await client.getList<Work>({
        endpoint: 'works',
        queries: {
        limit: PER_PAGE,
        offset,
        orders: 'order',
        },
    });
    return res;
}

export async function fetchWorksTotalCount() {
    const res = await client.getList<Work>({
        endpoint: 'works',
        queries: { limit: 1 },
    });
    return res.totalCount;
}

export async function fetchWorkBySlug(slug: string) {
    const res = await client.getList<Work>({
        endpoint: 'works',
        queries: {
        limit: 1,
        filters: `slug[equals]${slug}`,
        },
    });
    return res.contents?.[0] ?? null;
}

export async function fetchAllWorkSlugs() {
    const first = await client.getList<Pick<Work, 'id' | 'slug'>>({
        endpoint: 'works',
        queries: {
            fields: 'id,slug',
            limit: 100,
            orders: 'order',
        },
    });

    let slugs = first.contents.map((c) => c.slug);
    const pages = Math.ceil(first.totalCount / first.limit);

    for (let i = 2; i <= pages; i++) {
        const page = await client.getList<Pick<Work, 'id' | 'slug'>>({
            endpoint: 'works',
            queries: {
                fields: 'id,slug',
                limit: first.limit,
                offset: (i - 1) * first.limit,
                orders: 'order',
            },
        });
        slugs = slugs.concat(page.contents.map((c) => c.slug));
    }
    return slugs;
}
async function fetchPrevNextByOrder(order: number) {
    const [prevRes, nextRes] = await Promise.all([
        client.getList<Work>({
            endpoint: 'works',
            queries: {
                filters: `order[less_than]${order}`,
                orders: '-order',
                limit: 1,
            },
        }),
        client.getList<Work>({
            endpoint: 'works',
            queries: {
                filters: `order[greater_than]${order}`,
                orders: 'order',
                limit: 1,
            },
        }),
    ]);
    return {
        prev: prevRes.contents?.[0] ?? null,
        next: nextRes.contents?.[0] ?? null,
    };
}

async function fetchPrevNextByDate(publishedAt: string) {
    const [prevRes, nextRes] = await Promise.all([
        client.getList<Work>({
            endpoint: 'works',
            queries: {
                filters: `publishedAt[less_than]${publishedAt}`,
                orders: '-publishedAt',
                limit: 1,
            },
        }),
        client.getList<Work>({
            endpoint: 'works',
            queries: {
                filters: `publishedAt[greater_than]${publishedAt}`,
                orders: 'publishedAt',
                limit: 1,
            },
        }),
    ]);
    return {
        prev: prevRes.contents?.[0] ?? null,
        next: nextRes.contents?.[0] ?? null,
    };
}

export async function fetchPrevNext(work: Work) {
    if (typeof work.order === 'number') {
        return fetchPrevNextByOrder(work.order);
    }
    const base = work.publishedAt || work.createdAt;
    if (!base) return { prev: null, next: null };
    return fetchPrevNextByDate(base);
}