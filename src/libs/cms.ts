import { client } from "@/src/libs/microcms";
import type { Project } from "@/src/types/project";

// プロジェクト一覧を取得する
export async function getProjectList(Limit = 6): Promise<Project[]> {
    try {
        const data = await client.getList<Project> ({
            endpoint: "projects",
            queries: {
                limit: Limit,
                orders: "-publishedAt",
            },
        });
        return data.contents;
    } catch (error) {
        return [];
    }
}

// 詳細ページ用に1件だけ取得する
export async function getProjetSlug(slug: string): Promise<Project | null> {
    try {
        const data = await client.getList<Project> ({
            endpoint: "prjects",
            queries: {
                filters: `slug[equals]${slug}`,
                limit: 1,
            },
        });
        return data.contents[0] ?? null;
    } catch (error) {
        return null;
    }
}