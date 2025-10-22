import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        HEADER (1168 × 60)
      </header>
      
      <div className={styles.gap}></div>
      
      <section className={styles.banner}>
        BANNER (1168 × 240)
      </section>
      
      <div className={styles.gap}></div>
      
      <nav className={styles.navigation}>
        NAVIGATION (1168 × 48)
      </nav>
      
      <main className={styles.children}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        FOOTER (1168 × 160)
      </footer>
    </div>
  );
}
