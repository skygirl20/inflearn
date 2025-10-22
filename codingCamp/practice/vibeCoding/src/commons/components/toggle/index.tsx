'use client';

import React from 'react';
import styles from './styles.module.css';

/**
 * Toggle Component Props
 * Figma 디자인 기반 토글 컴포넌트 (노드 ID: 3:1704, 3:3070)
 */
export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** 토글 variant 타입 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 토글 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 모드 */
  theme?: 'light' | 'dark';
  /** 토글 상태 (제어 컴포넌트) */
  checked?: boolean;
  /** 토글 상태 변경 핸들러 */
  onChange?: (checked: boolean) => void;
  /** 토글 비활성화 여부 */
  disabled?: boolean;
  /** 토글 라벨 텍스트 */
  label?: string;
  /** 라벨 위치 */
  labelPosition?: 'left' | 'right';
  /** 접근성을 위한 aria-label */
  'aria-label'?: string;
}

/**
 * Toggle Component
 * 
 * @description
 * Figma 디자인 시스템 기반의 토글 스위치 컴포넌트
 * - variant: primary(기본 강조), secondary(보조), tertiary(심플)
 * - size: small, medium, large
 * - theme: light, dark 모드 지원
 * - 접근성 지원 (키보드 네비게이션, 스크린 리더)
 * 
 * @example
 * ```tsx
 * <Toggle 
 *   variant="primary" 
 *   size="medium" 
 *   theme="light"
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 *   label="알림 설정"
 * />
 * ```
 */
export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      checked = false,
      onChange,
      disabled = false,
      label,
      labelPosition = 'right',
      className = '',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // 토글 상태 변경 핸들러
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      
      const newChecked = event.target.checked;
      onChange?.(newChecked);
    };

    // 클래스명 조합
    const toggleClasses = [
      styles.toggle,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      checked ? styles.checked : '',
      disabled ? styles.disabled : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = [
      styles.label,
      styles[`label-${labelPosition}`],
      styles[`theme-${theme}`],
      disabled ? styles.labelDisabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    // 토글 요소
    const toggleElement = (
      <label className={toggleClasses}>
        <input
          ref={ref}
          type="checkbox"
          className={styles.input}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          aria-label={ariaLabel || label}
          {...props}
        />
        <span className={styles.slider}>
          <span className={styles.thumb} />
        </span>
      </label>
    );

    // 라벨이 있는 경우 래퍼로 감싸기
    if (label) {
      return (
        <div className={styles.wrapper}>
          {labelPosition === 'left' && (
            <span className={labelClasses}>{label}</span>
          )}
          {toggleElement}
          {labelPosition === 'right' && (
            <span className={labelClasses}>{label}</span>
          )}
        </div>
      );
    }

    return toggleElement;
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
