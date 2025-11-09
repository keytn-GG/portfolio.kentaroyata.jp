// dependensies
import Link from "next/link";
import Image from "next/image";
import { formatDateJP } from "@/src/lib/datetime";

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
                href={`/projects/${project.slug}`}
                className={styles.link}
            >
                <div className={styles.imageWrapper}>
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
                    <div className={styles.meta}>
                        {published && 
                            <time dateTime={published} className={styles.date}>
                                <span className={styles.metaTitle}>Published:</span>
                                {published}
                            </time>
                        }
                        {updated && 
                            <time dateTime={updated} className={styles.date}>
                                <span className={styles.metaTitle}>Updated:</span>
                                {updated}
                            </time>
                        }
                        {project.tech && project.tech.length > 0 && (
                            <div className={styles.tech}>
                                <span className={styles.metaTitle}>Tech:</span>
                                <ul className={styles.techList}>
                                    {project.tech.map((tech) => (
                                        <li key={tech} className={styles.techItems}>{tech}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </li>
    );
}