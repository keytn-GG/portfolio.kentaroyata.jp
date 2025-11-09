// rendering
export const revalidate = 60;

// dependensies
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProjectList } from "@/src/libs/cms";

// types
import type { Project } from "@/src/types/project";

// component
import ProjectList from "@/src/components/project/ProjectList";

// CSS
import shared from "@/src/styles/shared.module.css";
import styles from "@/src/styles/pages/home.module.css";

export default async function Home() {
    const projects: Project[] = await getProjectList();

    return (
        <main className={styles.main}>
            <ProjectList projects={projects} />
        </main>
    );
}