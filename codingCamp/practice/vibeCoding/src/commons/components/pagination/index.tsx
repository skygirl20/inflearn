'use client';

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

/**
 * Pagination Component Props
 * Figma 디자인 기반 페이지네이션 컴포넌트 (노드 ID: 425:2243)
 */
export interface PaginationProps {
  /** 현재 페이지 번호 (1부터 시작) */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 핸들러 */
  onPageChange: (page: number) => void;
  /** 한 번에 표시할 최대 페이지 수 (기본값: 5) */
  maxVisiblePages?: number;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * Pagination Component
 * 
 * @description
 * Figma 디자인 기반의 페이지네이션 컴포넌트 (노드 ID: 425:2243)
 * - 현재 페이지를 시각적으로 표시
 * - 이전/다음 버튼으로 페이지 탐색
 * - 최대 5개 페이지 번호 표시
 * 
 * @example
 * ```tsx
 * <Pagination 
 *   currentPage={1} 
 *   totalPages={10} 
 *   onPageChange={(page) => console.log(page)}
 * />
 * ```
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className = '',
}) => {
  // 페이지 범위 계산
  const getPageNumbers = (): number[] => {
    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 maxVisiblePages 이하면 모두 표시
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = currentPage - halfVisible;
    let endPage = currentPage + halfVisible;

    // 시작 페이지가 1보다 작으면 조정
    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(maxVisiblePages, totalPages);
    }

    // 끝 페이지가 totalPages보다 크면 조정
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const pageNumbers = getPageNumbers();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // 페이지 변경 핸들러
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  // 컨테이너 클래스명 조합
  const containerClasses = [
    styles.pagination,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 페이지가 1개인 경우 단순 표시
  if (totalPages === 1) {
    return (
      <div className={containerClasses}>
        <div className={`${styles.pageButton} ${styles.active}`}>
          <span>1</span>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {/* 이전 버튼 */}
      <button
        className={`${styles.navButton} ${isFirstPage ? styles.disabled : ''}`}
        onClick={handlePrevClick}
        disabled={isFirstPage}
        aria-label="이전 페이지"
      >
        <Image
          src={isFirstPage ? '/icons/leftdisabled_outline_light_m.svg' : '/icons/leftenable_outline_light_m.svg'}
          alt="이전"
          width={24}
          height={24}
        />
      </button>

      {/* 페이지 번호 목록 */}
      <div className={styles.pageList}>
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
            onClick={() => handlePageClick(page)}
            aria-label={`페이지 ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            <span>{page}</span>
          </button>
        ))}
      </div>

      {/* 다음 버튼 */}
      <button
        className={`${styles.navButton} ${isLastPage ? styles.disabled : ''}`}
        onClick={handleNextClick}
        disabled={isLastPage}
        aria-label="다음 페이지"
      >
        <Image
          src={isLastPage ? '/icons/rightdisabled_outline_light_m.svg' : '/icons/rightenable_outline_light_m.svg'}
          alt="다음"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default Pagination;

