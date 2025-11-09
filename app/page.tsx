// rendering
export const revalidate = 60;

// dependensies
import React from 'react';
import { getProjectsPage } from "@/src/lib/cms";

// component
import ProjectList from "@/src/components/project/ProjectList";
import Pagination from "@/src/components/ui/Pagination";

// CSS
import styles from "@/src/styles/pages/home.module.css";

export default async function Home() {
    const PAGE_SIZE = 12;
    const { items, totalCount } = await getProjectsPage(1, PAGE_SIZE);
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

    return (
        <main className={styles.main}>
            <ProjectList projects={items} />
            <Pagination current={1} totalPages={totalPages} />
        </main>
    );
}