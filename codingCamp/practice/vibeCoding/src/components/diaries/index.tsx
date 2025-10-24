'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import SelectBox from '../../commons/components/selectbox';
import Searchbar from '../../commons/components/searchbar';
import Button from '../../commons/components/button';

const Diaries = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 필터 옵션 (피그마 디자인에 맞게)
  const filterOptions = [
    { value: 'all', label: '전체' },
    { value: 'recent', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
    { value: 'emotion', label: '감정별' },
  ];

  // 일기 데이터 (임시)
  const diaryData = [
    { id: 1, title: '오늘의 기분', date: '2024-01-15', emotion: 'happy', content: '오늘은 정말 좋은 하루였다...' },
    { id: 2, title: '힘든 하루', date: '2024-01-14', emotion: 'sad', content: '오늘은 조금 힘들었지만...' },
    { id: 3, title: '놀라운 일', date: '2024-01-13', emotion: 'surprise', content: '예상치 못한 일이...' },
    { id: 4, title: '화나는 순간', date: '2024-01-12', emotion: 'angry', content: '오늘 정말 화가 났다...' },
    { id: 5, title: '평범한 하루', date: '2024-01-11', emotion: 'etc', content: '특별한 일은 없었지만...' },
    { id: 6, title: '기쁜 소식', date: '2024-01-10', emotion: 'happy', content: '정말 기쁜 소식이...' },
  ];

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleWriteDiary = () => {
    // 일기 작성 페이지로 이동
    console.log('일기 작성 페이지로 이동');
  };

  return (
    <div className={styles.container}>
      {/* Search 영역 */}
      <div className={styles.search}>
        <div className={styles.searchContent}>
          <div className={styles.searchLeft}>
            <SelectBox
              options={filterOptions}
              value={selectedFilter}
              placeholder="전체"
              variant="primary"
              size="medium"
              theme="light"
              onChange={handleFilterChange}
              className={styles.filterSelect}
            />
            <Searchbar
              placeholder="검색어를 입력해 주세요."
              variant="primary"
              size="medium"
              theme="light"
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.searchRight}>
            <Button
              variant="secondary"
              size="medium"
              theme="light"
              onClick={handleWriteDiary}
              className={styles.writeButton}
            >
              일기 쓰기
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main 영역 */}
      <div className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.diaryGrid}>
            {diaryData.map((diary) => (
              <div key={diary.id} className={styles.diaryCard}>
                <div className={styles.diaryHeader}>
                  <h3 className={styles.diaryTitle}>{diary.title}</h3>
                  <span className={styles.diaryDate}>{diary.date}</span>
                </div>
                <div className={styles.diaryEmotion}>
                  <img 
                    src={`/images/emotion-${diary.emotion}-m.png`} 
                    alt={diary.emotion}
                    className={styles.emotionIcon}
                  />
                </div>
                <div className={styles.diaryContent}>
                  <p>{diary.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Pagination 영역 */}
      <div className={styles.pagination}>
        <div className={styles.paginationContent}>
          <button className={styles.paginationButton} disabled>
            <img src="/icons/leftdisabled_outline_light_m.svg" alt="이전" />
          </button>
          <div className={styles.paginationNumbers}>
            <button className={`${styles.pageButton} ${styles.active}`}>1</button>
            <button className={styles.pageButton}>2</button>
            <button className={styles.pageButton}>3</button>
            <button className={styles.pageButton}>4</button>
            <button className={styles.pageButton}>5</button>
          </div>
          <button className={styles.paginationButton}>
            <img src="/icons/rightenable_outline_light_m.svg" alt="다음" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Diaries;
