// rendering
export const revalidate = 60;

// dependensies
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// types

// component

// CSS
import shared from "@/src/styles/shared.module.css";
import styles from "@/src/styles/pages/home.module.css";

export default function Home() {
    return (
        <main className={shared.main}>
            ここにmicroCMSのコンテンツ一覧が表示されます。
        </main>
    );
}