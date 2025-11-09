// rendering
export const revalidate = 60;

// dependensies
import { notFound, redirect } from "next/navigation";
import { getProjectsPage } from "@/src/libs/cms";
import ProjectList from "@/src/components/project/ProjectList";
import Pagination from "@/src/components/ui/Pagination";

export default async function Paged({
    params,
}: {
    params: Promise<{ page: string }>;
}) {
    const { page } = await params;
    const current = Number(page);
    if (!Number.isFinite(current) || current < 1) redirect("/");

    const PAGE_SIZE = 12;
    const { items, totalCount } = await getProjectsPage(current, PAGE_SIZE);
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

    if (current > totalPages) {
        return totalCount === 0 ? notFound() : redirect(`/page/${totalPages}`);
    }

    return (
        <main>
            <ProjectList projects={items} />
            <Pagination current={current} totalPages={totalPages} />
        </main>
    );
}
