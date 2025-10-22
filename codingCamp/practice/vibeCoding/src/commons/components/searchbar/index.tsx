'use client';

import React from 'react';
import styles from './styles.module.css';

/**
 * Searchbar Component Props
 * Figma 디자인 기반 검색바 컴포넌트 (노드 ID: 3:1566)
 */
export interface SearchbarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 검색바 variant 타입 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 검색바 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 모드 */
  theme?: 'light' | 'dark';
  /** 검색바 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 에러 상태 여부 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 헬퍼 텍스트 */
  helperText?: string;
  /** 라벨 */
  label?: string;
  /** 필수 입력 여부 */
  required?: boolean;
  /** 검색 아이콘 표시 여부 */
  showSearchIcon?: boolean;
  /** 검색 아이콘 클릭 핸들러 */
  onSearchClick?: () => void;
}

/**
 * Searchbar Component
 * 
 * @description
 * Figma 디자인 시스템 기반의 검색바 컴포넌트
 * - variant: primary(기본), secondary(보조), tertiary(텍스트)
 * - size: small, medium, large
 * - theme: light, dark 모드 지원
 * - error, disabled, focus 상태 지원
 * - 검색 아이콘 포함
 * 
 * @example
 * ```tsx
 * <Searchbar 
 *   variant="primary" 
 *   size="medium" 
 *   theme="light"
 *   placeholder="검색어를 입력해 주세요."
 *   showSearchIcon={true}
 * />
 * ```
 */
export const Searchbar = React.forwardRef<HTMLInputElement, SearchbarProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      fullWidth = false,
      error = false,
      errorMessage,
      helperText,
      label,
      required = false,
      showSearchIcon = true,
      onSearchClick,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    // 클래스명 조합
    const searchbarClasses = [
      styles.searchbar,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      fullWidth ? styles.fullWidth : '',
      error ? styles.error : '',
      disabled ? styles.disabled : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const containerClasses = [
      styles.container,
      fullWidth ? styles.fullWidth : '',
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = [
      styles.label,
      styles[`label-size-${size}`],
      styles[`label-theme-${theme}`],
      required ? styles.required : '',
      disabled ? styles.disabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    const helperTextClasses = [
      styles.helperText,
      styles[`helper-size-${size}`],
      styles[`helper-theme-${theme}`],
      error ? styles.error : '',
    ]
      .filter(Boolean)
      .join(' ');

    const iconClasses = [
      styles.searchIcon,
      styles[`icon-size-${size}`],
      styles[`icon-theme-${theme}`],
      disabled ? styles.disabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label className={labelClasses}>
            {label}
            {required && <span className={styles.requiredMark}>*</span>}
          </label>
        )}
        <div className={searchbarClasses}>
          {showSearchIcon && (
            <div className={iconClasses} onClick={onSearchClick}>
              <img 
                src="/icons/search_outline_light_m.svg" 
                alt="검색" 
                className={styles.iconImage}
              />
            </div>
          )}
          <input
            ref={ref}
            className={styles.input}
            disabled={disabled}
            aria-invalid={error}
            aria-required={required}
            {...props}
          />
        </div>
        {(helperText || errorMessage) && (
          <span className={helperTextClasses}>
            {error && errorMessage ? errorMessage : helperText}
          </span>
        )}
      </div>
    );
  }
);

Searchbar.displayName = 'Searchbar';

export default Searchbar;
