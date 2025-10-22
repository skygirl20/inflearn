'use client';

import React from 'react';
import styles from './styles.module.css';

/**
 * Button Component Props
 * Figma 디자인 기반 버튼 컴포넌트 (노드 ID: 3:2291)
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 variant 타입 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 버튼 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 모드 */
  theme?: 'light' | 'dark';
  /** 버튼 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
  /** 자식 요소 (버튼 텍스트 또는 아이콘) */
  children: React.ReactNode;
}

/**
 * Button Component
 * 
 * @description
 * Figma 디자인 시스템 기반의 버튼 컴포넌트
 * - variant: primary(기본 강조), secondary(보조), tertiary(텍스트)
 * - size: small, medium, large
 * - theme: light, dark 모드 지원
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="medium" theme="light">
 *   클릭하기
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      fullWidth = false,
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // 클래스명 조합
    const buttonClasses = [
      styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      fullWidth ? styles.fullWidth : '',
      disabled ? styles.disabled : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

