'use client';

import React from 'react';
import styles from './styles.module.css';

/**
 * Input Component Props
 * Figma 디자인 기반 입력 컴포넌트 (노드 ID: 3:1297)
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 입력 필드 variant 타입 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 입력 필드 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 모드 */
  theme?: 'light' | 'dark';
  /** 입력 필드 전체 너비 사용 여부 */
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
}

/**
 * Input Component
 * 
 * @description
 * Figma 디자인 시스템 기반의 입력 컴포넌트
 * - variant: primary(기본), secondary(보조), tertiary(텍스트)
 * - size: small, medium, large
 * - theme: light, dark 모드 지원
 * - error, disabled, focus 상태 지원
 * 
 * @example
 * ```tsx
 * <Input 
 *   variant="primary" 
 *   size="medium" 
 *   theme="light"
 *   placeholder="회고를 남겨보세요."
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
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
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    // 클래스명 조합
    const inputClasses = [
      styles.input,
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

    return (
      <div className={containerClasses}>
        {label && (
          <label className={labelClasses}>
            {label}
            {required && <span className={styles.requiredMark}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          disabled={disabled}
          aria-invalid={error}
          aria-required={required}
          {...props}
        />
        {(helperText || errorMessage) && (
          <span className={helperTextClasses}>
            {error && errorMessage ? errorMessage : helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

