import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoText}>민지의 다이어리</span>
        </div>
      </header>
      
      <div className={styles.gap}></div>
      
      <section className={styles.banner}>
        <div className={styles.bannerImage}></div>
      </section>
      
      <div className={styles.gap}></div>
      
      <nav className={styles.navigation}>
        <div className={styles.tabContainer}>
          <div className={`${styles.tab} ${styles.tabActive}`}>
            <span className={styles.tabText}>일기보관함</span>
          </div>
          <div className={styles.tab}>
            <span className={styles.tabText}>사진보관함</span>
          </div>
        </div>
      </nav>
      
      <main className={styles.children}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>민지의 다이어리</div>
          <div className={styles.footerInfo}>대표 : {'{name}'}</div>
          <div className={styles.footerCopyright}>Copyright © 2024. {'{name}'} Co., Ltd.</div>
        </div>
      </footer>
    </div>
  );
}




