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
