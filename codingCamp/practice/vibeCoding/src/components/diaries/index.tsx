import React from 'react';
import styles from './styles.module.css';

const Diaries = () => {
  return (
    <div className={styles.container}>
      {/* Search 영역 */}
      <div className={styles.search}>
        <div className={styles.searchContent}>Search</div>
      </div>
      
      {/* Main 영역 */}
      <div className={styles.main}>
        <div className={styles.mainContent}>Main Content</div>
      </div>
      
      {/* Pagination 영역 */}
      <div className={styles.pagination}>
        <div className={styles.paginationContent}>Pagination</div>
      </div>
    </div>
  );
};

export default Diaries;
