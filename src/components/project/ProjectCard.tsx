// dependensies
import Link from "next/link";
import Image from "next/image";
import { formatDateJP } from "@/src/libs/datetime";

// types
import { Project } from "@/src/types/project";
type Props = { project: Project };

// CSS
import styles from "@/src/styles/components/project/projectCard.module.css";

export default function ProjectCard({ project }: Props) {
    const published = formatDateJP(project.publishedAt);
    const updated = formatDateJP(project.updatedAt);

    return (
        <li className={styles.listItems}>
            <Link
                href="{`/projects/${project.slug}`}"
                className={styles.link}
            >
                <div className={styles.imageWrap}>
                {project.cover?.url ? (
                    <Image
                        src={project.cover.url}
                        alt={project.title}
                        width={768}
                        height={432}
                        priority
                    />
                ) : (
                    <div className={styles.empty}></div>
                )}
                </div>
                <div className={styles.itemHeader}>
                    <p className={styles.title}>
                        {project.title}
                    </p>
                    {project.lead && 
                        <p className={styles.lead}>
                            {project.lead}
                        </p>
                    }
                    <div className={styles.data}>
                        {published && 
                            <time dateTime={project.publishedAt} className={styles.date}>
                                <span className={styles.metaTitle}>Published:</span>
                                {published}
                            </time>
                        }
                        {updated && 
                            <time dateTime={project.updatedAt} className={styles.date}>
                                <span className={styles.metaTitle}>Updated:</span>
                                {updated}
                            </time>
                        }
                    </div>
                </div>
            </Link>
        </li>
    );
}