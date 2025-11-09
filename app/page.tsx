// rendering
export const revalidate = 60;

// dependensies
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProjectsPage } from "@/src/libs/cms";

// component
import ProjectList from "@/src/components/project/ProjectList";
import Pagination from "@/src/components/ui/Pagination";

// CSS
import shared from "@/src/styles/shared.module.css";
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