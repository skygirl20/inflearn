'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import SelectBox from '../../commons/components/selectbox';
import Searchbar from '../../commons/components/searchbar';
import Button from '../../commons/components/button';
import { EmotionType, EMOTION_INFO } from '../../commons/constants/enum';

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

  // 일기 데이터 (enum 타입 활용)
  const diaryData = [
    { id: 1, title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.', date: '2024. 03. 12', emotion: EmotionType.SAD, content: '오늘은 조금 힘들었지만...' },
    { id: 2, title: '타이틀 영역 입니다.', date: '2024. 03. 12', emotion: EmotionType.SURPRISE, content: '예상치 못한 일이...' },
    { id: 3, title: '타이틀 영역 입니다.', date: '2024. 03. 12', emotion: EmotionType.ANGRY, content: '오늘 정말 화가 났다...' },
    { id: 4, title: '타이틀 영역 입니다.', date: '2024. 03. 12', emotion: EmotionType.HAPPY, content: '정말 기쁜 소식이...' },
    { id: 5, title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.', date: '2024. 03. 12', emotion: EmotionType.ETC, content: '특별한 일은 없었지만...' },
    { id: 6, title: '타이틀 영역 입니다.', date: '2024. 03. 12', emotion: EmotionType.SURPRISE, content: '놀라운 일이...' },
    { id: 7, title: '타이틀 영역 입니다.', date: '2024. 03. 12', emotion: EmotionType.ANGRY, content: '화나는 순간이...' },
    { id: 8, title: '타이틀 영역 입니다.', date: '2024. 03. 12', emotion: EmotionType.HAPPY, content: '행복한 하루였다...' },
    { id: 9, title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.', date: '2024. 03. 12', emotion: EmotionType.SAD, content: '슬픈 하루였다...' },
    { id: 10, title: '타이틀 영역 입니다.', date: '2024. 03. 12', emotion: EmotionType.SURPRISE, content: '놀라운 소식이...' },
    { id: 11, title: '타이틀 영역 입니다.', date: '2024. 03. 12', emotion: EmotionType.ANGRY, content: '화나는 일이...' },
    { id: 12, title: '타이틀 영역 입니다.', date: '2024. 03. 12', emotion: EmotionType.HAPPY, content: '기쁜 하루였다...' },
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
              <img src="/icons/plus_outline_light_m.svg" alt="플러스" className={styles.plusIcon} />
              일기 쓰기
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main 영역 */}
      <div className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.diaryGrid}>
            {diaryData.map((diary) => {
              const emotionInfo = EMOTION_INFO[diary.emotion];
              return (
                <div key={diary.id} className={styles.diaryCard}>
                  <div className={styles.diaryImage}>
                    <img 
                      src={`/images/emotion-${diary.emotion.toLowerCase()}-m.png`} 
                      alt={emotionInfo.label}
                      className={styles.emotionImage}
                    />
                  </div>
                  <div className={styles.diaryInfo}>
                    <div className={styles.diaryHeader}>
                      <span className={styles.emotionText} style={{ color: emotionInfo.color }}>
                        {emotionInfo.label}
                      </span>
                      <span className={styles.diaryDate}>{diary.date}</span>
                    </div>
                    <div className={styles.diaryTitle}>
                      <h3>{diary.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
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
