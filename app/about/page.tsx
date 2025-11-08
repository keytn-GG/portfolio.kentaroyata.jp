// rendering
export const dynamic = "force-static";

// dependensies
import Image from "next/image";
import Link from "next/link";

// components

// stylea
import shared from "@/src/styles/shared.module.css";
import styles from "@/src/styles/pages/about.module.css";

export default function About() {
    return (
        <main className={shared.main}>
            <Link href="./" className={shared.button}>Return Home</Link>
            <section className={shared.section}>
                <Image
                    src="@/public/img/author.jpg"
                    alt="kentaro yataの写真"
                    width={300}
                    height={300}
                />
                <h1 className={styles.heading}></h1>
            </section>
        </main>
    );
}