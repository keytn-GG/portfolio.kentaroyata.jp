// component
import ProjectCard from "@/src/components/project/ProjectCard";

// types
import type { Project } from "@/src/types/project";
type Props = { projects: Project[] };

// CSS
import styles from "@/src/styles/components/project/projectList.module.css";

export default function ProjectList({ projects }: Props) {
    if (projects.length === 0) {
        return <p className={styles.notFound}>プロジェクトは準備中です。</p>
    }
    return (
        <ul className={styles.list}>
            {projects.map(p => <ProjectCard key={p.id} project={p}/>)}
        </ul>
    );
}