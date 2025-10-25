'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import SelectBox from '../../commons/components/selectbox';
import Searchbar from '../../commons/components/searchbar';
import Button from '../../commons/components/button';
import Pagination from '../../commons/components/pagination';
import { EmotionType, EMOTION_INFO } from '../../commons/constants/enum';

const Diaries = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 필터 옵션 (피그마 디자인에 맞게)
  const filterOptions = [
    { value: 'all', label: '전체' },
    { value: 'recent', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
    { value: 'emotion', label: '감정별' },
  ];

  // 일기 데이터 (enum 타입 활용) - pagination 테스트를 위해 데이터 확장
  const allDiaryData = [
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
    // 추가 데이터 (pagination 테스트용)
    { id: 13, title: '새로운 일기입니다.', date: '2024. 03. 11', emotion: EmotionType.HAPPY, content: '좋은 하루였어요...' },
    { id: 14, title: '오늘의 감정', date: '2024. 03. 10', emotion: EmotionType.SAD, content: '조금 우울했지만...' },
    { id: 15, title: '놀라운 하루', date: '2024. 03. 09', emotion: EmotionType.SURPRISE, content: '예상치 못한 일이...' },
    { id: 16, title: '화나는 순간', date: '2024. 03. 08', emotion: EmotionType.ANGRY, content: '정말 화가 났어요...' },
    { id: 17, title: '평범한 하루', date: '2024. 03. 07', emotion: EmotionType.ETC, content: '특별한 일은 없었지만...' },
    { id: 18, title: '기쁜 소식', date: '2024. 03. 06', emotion: EmotionType.HAPPY, content: '정말 기뻤어요...' },
    { id: 19, title: '슬픈 하루', date: '2024. 03. 05', emotion: EmotionType.SAD, content: '마음이 무거웠어요...' },
    { id: 20, title: '놀라운 경험', date: '2024. 03. 04', emotion: EmotionType.SURPRISE, content: '정말 놀라웠어요...' },
    { id: 21, title: '화나는 일', date: '2024. 03. 03', emotion: EmotionType.ANGRY, content: '정말 화가 났어요...' },
    { id: 22, title: '행복한 순간', date: '2024. 03. 02', emotion: EmotionType.HAPPY, content: '정말 행복했어요...' },
    { id: 23, title: '우울한 하루', date: '2024. 03. 01', emotion: EmotionType.SAD, content: '조금 우울했어요...' },
    { id: 24, title: '특별한 하루', date: '2024. 02. 29', emotion: EmotionType.ETC, content: '특별한 하루였어요...' },
    // 더 많은 데이터 추가 (5페이지 이상 만들기)
    { id: 25, title: '봄의 시작', date: '2024. 02. 28', emotion: EmotionType.HAPPY, content: '봄이 왔어요...' },
    { id: 26, title: '우울한 날', date: '2024. 02. 27', emotion: EmotionType.SAD, content: '조금 우울했어요...' },
    { id: 27, title: '놀라운 소식', date: '2024. 02. 26', emotion: EmotionType.SURPRISE, content: '정말 놀라웠어요...' },
    { id: 28, title: '화나는 일', date: '2024. 02. 25', emotion: EmotionType.ANGRY, content: '정말 화가 났어요...' },
    { id: 29, title: '평범한 하루', date: '2024. 02. 24', emotion: EmotionType.ETC, content: '특별한 일은 없었어요...' },
    { id: 30, title: '기쁜 하루', date: '2024. 02. 23', emotion: EmotionType.HAPPY, content: '정말 기뻤어요...' },
    { id: 31, title: '슬픈 순간', date: '2024. 02. 22', emotion: EmotionType.SAD, content: '마음이 아팠어요...' },
    { id: 32, title: '놀라운 경험', date: '2024. 02. 21', emotion: EmotionType.SURPRISE, content: '정말 놀라웠어요...' },
    { id: 33, title: '화나는 순간', date: '2024. 02. 20', emotion: EmotionType.ANGRY, content: '정말 화가 났어요...' },
    { id: 34, title: '행복한 하루', date: '2024. 02. 19', emotion: EmotionType.HAPPY, content: '정말 행복했어요...' },
    { id: 35, title: '우울한 하루', date: '2024. 02. 18', emotion: EmotionType.SAD, content: '조금 우울했어요...' },
    { id: 36, title: '특별한 하루', date: '2024. 02. 17', emotion: EmotionType.ETC, content: '특별한 하루였어요...' },
    { id: 37, title: '봄의 기운', date: '2024. 02. 16', emotion: EmotionType.HAPPY, content: '봄 기운이 느껴져요...' },
    { id: 38, title: '슬픈 하루', date: '2024. 02. 15', emotion: EmotionType.SAD, content: '마음이 무거웠어요...' },
    { id: 39, title: '놀라운 일', date: '2024. 02. 14', emotion: EmotionType.SURPRISE, content: '예상치 못한 일이...' },
    { id: 40, title: '화나는 하루', date: '2024. 02. 13', emotion: EmotionType.ANGRY, content: '정말 화가 났어요...' },
    { id: 41, title: '평범한 하루', date: '2024. 02. 12', emotion: EmotionType.ETC, content: '특별한 일은 없었어요...' },
    { id: 42, title: '기쁜 소식', date: '2024. 02. 11', emotion: EmotionType.HAPPY, content: '정말 기뻤어요...' },
    { id: 43, title: '슬픈 하루', date: '2024. 02. 10', emotion: EmotionType.SAD, content: '조금 우울했어요...' },
    { id: 44, title: '놀라운 경험', date: '2024. 02. 09', emotion: EmotionType.SURPRISE, content: '정말 놀라웠어요...' },
    { id: 45, title: '화나는 순간', date: '2024. 02. 08', emotion: EmotionType.ANGRY, content: '정말 화가 났어요...' },
    { id: 46, title: '행복한 하루', date: '2024. 02. 07', emotion: EmotionType.HAPPY, content: '정말 행복했어요...' },
    { id: 47, title: '우울한 하루', date: '2024. 02. 06', emotion: EmotionType.SAD, content: '조금 우울했어요...' },
    { id: 48, title: '특별한 하루', date: '2024. 02. 05', emotion: EmotionType.ETC, content: '특별한 하루였어요...' },
    { id: 49, title: '봄의 시작', date: '2024. 02. 04', emotion: EmotionType.HAPPY, content: '봄이 왔어요...' },
    { id: 50, title: '슬픈 하루', date: '2024. 02. 03', emotion: EmotionType.SAD, content: '마음이 아팠어요...' },
    { id: 51, title: '놀라운 소식', date: '2024. 02. 02', emotion: EmotionType.SURPRISE, content: '정말 놀라웠어요...' },
    { id: 52, title: '화나는 일', date: '2024. 02. 01', emotion: EmotionType.ANGRY, content: '정말 화가 났어요...' },
    { id: 53, title: '평범한 하루', date: '2024. 01. 31', emotion: EmotionType.ETC, content: '특별한 일은 없었어요...' },
    { id: 54, title: '기쁜 하루', date: '2024. 01. 30', emotion: EmotionType.HAPPY, content: '정말 기뻤어요...' },
    { id: 55, title: '슬픈 순간', date: '2024. 01. 29', emotion: EmotionType.SAD, content: '마음이 무거웠어요...' },
    { id: 56, title: '놀라운 경험', date: '2024. 01. 28', emotion: EmotionType.SURPRISE, content: '정말 놀라웠어요...' },
    { id: 57, title: '화나는 순간', date: '2024. 01. 27', emotion: EmotionType.ANGRY, content: '정말 화가 났어요...' },
    { id: 58, title: '행복한 하루', date: '2024. 01. 26', emotion: EmotionType.HAPPY, content: '정말 행복했어요...' },
    { id: 59, title: '우울한 하루', date: '2024. 01. 25', emotion: EmotionType.SAD, content: '조금 우울했어요...' },
    { id: 60, title: '특별한 하루', date: '2024. 01. 24', emotion: EmotionType.ETC, content: '특별한 하루였어요...' },
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  // 페이지네이션 계산
  const itemsPerPage = 12;
  const totalPages = Math.ceil(allDiaryData.length / itemsPerPage);
  
  // 현재 페이지에 해당하는 데이터만 필터링
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const diaryData = allDiaryData.slice(startIndex, endIndex);

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
                    <button className={styles.closeButton}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.closeIcon}>
                        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={5}
        />
      </div>
    </div>
  );
};

export default Diaries;
