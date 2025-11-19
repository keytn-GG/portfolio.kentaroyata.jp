// rendering
export const dynamic = "force-static";

// metadata
export const metadata: Metadata = {
    title: 'ABOUT - KENTARO YATA PORTFOLIO - Frontend Engineer & Plogrammer, Sapporo, Hokkaido, Japan',
};

// dependensies
import React from "react";
import type { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";

// components
import { inspirationItems } from '@/src/lib/inspirationItems';

// styles
import shared from "@/src/styles/shared.module.css";
import styles from "@/src/styles/pages/about.module.css";

const skillItems = [
    { label: 'HTML' },
    { label: 'CSS' },
    { label: 'Javascript' },
    { label: 'Git' },
    { label: 'SCSS/Sass' },
    { label: 'React（学習中）' },
    { label: 'Next.js' },
    { label: 'Java（学習中）' },
    { label: 'WordPress' },
    { label: 'PostgreSQL' },
    { label: 'Photoshop' },
    { label: 'Illustrator' },
    { label: 'XD' },
    { label: 'MS Office' },
];

const certificationItems = [
    { label: 'ウェブデザイン技能検定 3級' },
    { label: 'WEB検定 WEBディレクター' },
];

export default function About() {
    return (
        <main className={shared.main}>
            <Link href="./" className={shared.button}>Return Home</Link>
            <div className={shared.section}>
                <div className={styles.imageWrapper}>
                    <Image
                        src="/img/author.jpg"
                        alt="kentaro yataの写真"
                        width={270}
                        height={270}
                        className={styles.image}
                        priority
                    />
                </div>
                <hgroup className={styles.name}>
                    <span className={styles.nameEng}>Kentaro Yata</span>
                    <span className={styles.nameJpn}>矢田 健太郎</span>
                </hgroup>
                <p className={styles.text}>
                    北海道人と大阪人のハーフ。<br />
                    大阪で育ち、8年間歯科医院で勤めながらWeb制作を独学で学ぶ。<br />
                    2021年に北海道へ移住し、職業訓練で改めてWeb制作の基礎を学びなおした。<br />
                    その後一般企業に入社し、受託開発の制作チームに所属。<br />
                    WordPressをベースとしたサイト構築に従事しながら、ディレクション・開発・デプロイを一通り経験した。<br />
                    また、社内用プラグインやオリジナルテーマ制作で業務改善にも取り組んだ。<br />
                    現在は退職し、Javaを学習中。
                </p>
            </div>
            <div className={shared.section}>
                <p className={styles.sectionTitle}>
                    Skills
                </p>
                <ul className={styles.sectionList}>
                    {skillItems.map((item, index) => (
                        <li className={styles.sectionListItem} key={index}>
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={shared.section}>
                <p className={styles.sectionTitle}>
                    Certification
                </p>
                <ul className={styles.sectionList}>
                    {certificationItems.map((item, index) => (
                        <li className={styles.sectionListItem} key={index}>
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={shared.section}>
                <p className={styles.sectionTitle}>
                    Inspiration
                </p>
                <div className={styles.inspirationList}>
                    {inspirationItems.map((item, index) => {
                        const id = `inspiration-${index}`;
                        return (
                            <React.Fragment key={id}>
                                <button
                                    type='button'
                                    className={`${styles.inspirationButton} ${styles.open}`}
                                    popoverTarget={id}
                                    popoverTargetAction='show'
                                >
                                    {item.label}
                                </button>

                                <div className={styles.modal} id={id} popover='auto'>
                                    <div className={styles.innerModal}>
                                        <p className={styles.modalText}>
                                            {item.description.split('\n').map((line, i) => (
                                                <React.Fragment key={i}>
                                                    {line}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        </p>
                                        <button
                                            type='button'
                                            className={`${styles.inspirationButton} ${styles.close}`}
                                            popoverTarget={id}
                                            popoverTargetAction='hide'
                                        >
                                            close
                                        </button>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}