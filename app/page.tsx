// rendering

// dependensies
import ReturnTop from '@/src/components/ReturnTop';

// CSS
import styles from '@/src/styles/components/returnTop.module.css';
import shared from '@/src/styles/shared.module.css';

export default function Home() {
    return (
        <main className={shared.main}>
            <ReturnTop />
            <div className={shared.container}>
                コンテナです。
            </div>
        </main>
    );
}