// dependensies
import { client } from "@/src/lib/microcms";
import type { Project } from "@/src/types/project";

const DEFAULT_LIMIT = 12;

export async function getProjectsPage(
    page = 1,
    limit = DEFAULT_LIMIT
): Promise<{
    items: Project[];
    totalCount: number;
    limit: number;
    offset: number;
}> {
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const offset = (safePage - 1) * limit;

    try {
        const { contents, totalCount } = await client.getList<Project>({
            endpoint: "projects",
            queries: {
                limit,
                offset,
                orders: "-publishedAt",
            },
        });
        return { items: contents, totalCount, limit, offset };
    } catch (e) {
        console.error("❌ getProjectsPage failed:", e);
        return { items: [], totalCount: 0, limit, offset };
    }
}

export async function getProjectsList(limit = 6): Promise<Project[]> {
    try {
        const data = await client.getList<Project>({
            endpoint: "projects",
            queries: {
                limit,
                orders: "-publishedAt",
            },
        });
        return data.contents;
    } catch (error) {
        console.error("❌ getProjectsList failed:", error);
        return [];
    }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    try {
        const data = await client.getList<Project>({
            endpoint: "projects",
            queries: {
                filters: `slug[equals]${encodeURIComponent(slug)}`,
                limit: 1,
            },
        });
        return data.contents[0] ?? null;
    } catch (error) {
        console.error("❌ getProjectBySlug failed:", error);
        return null;
    }
}

export async function getProjectNavBySlug(slug: string): Promise<{
    prev: Pick<Project, "id" | "slug" | "title"> | null;
    next: Pick<Project, "id" | "slug" | "title"> | null;
}> {
    try {
        // まず現在の記事を取得（publishedAt が必要）
        const current = await client.getList<Project>({
            endpoint: "projects",
            queries: {
                filters: `slug[equals]${encodeURIComponent(slug)}`,
                limit: 1,
            },
        });

        const project = current.contents[0];
        if (!project?.publishedAt) {
            return { prev: null, next: null };
        }

        const publishedAt = project.publishedAt;

        const prevRes = await client.getList<Project>({
            endpoint: "projects",
            queries: {
                filters: `publishedAt[less_than]${publishedAt}`,
                orders: "-publishedAt",
                limit: 1,
                fields: "id,slug,title",
            },
        });

        const nextRes = await client.getList<Project>({
            endpoint: "projects",
            queries: {
                filters: `publishedAt[greater_than]${publishedAt}`,
                orders: "publishedAt",
                limit: 1,
                fields: "id,slug,title",
            },
        });

        return {
            prev: prevRes.contents[0] ?? null,
            next: nextRes.contents[0] ?? null,
        };
    } catch (error) {
        console.error("❌ getProjectNavBySlug failed:", error);
        return { prev: null, next: null };
    }
}

