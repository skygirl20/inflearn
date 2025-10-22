'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

export interface SelectBoxOption {
  value: string;
  label: string;
}

export interface SelectBoxProps {
  options: SelectBoxOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  theme?: 'light' | 'dark';
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  options = [],
  value,
  defaultValue,
  placeholder = '선택하세요',
  variant = 'primary',
  size = 'medium',
  theme = 'light',
  disabled = false,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(value || defaultValue || '');
  const selectRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ESC 키로 드롭다운 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);
  };

  const selectedOption = options.find(option => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // CSS 클래스 조합
  const containerClasses = [
    styles.container,
    styles[variant],
    styles[size],
    styles[theme],
    disabled ? styles.disabled : '',
    isOpen ? styles.open : '',
    className
  ].filter(Boolean).join(' ');

  const triggerClasses = [
    styles.trigger,
    styles[`${variant}Trigger`],
    styles[`${size}Trigger`],
    styles[`${theme}Trigger`],
    disabled ? styles.disabledTrigger : '',
    isOpen ? styles.openTrigger : ''
  ].filter(Boolean).join(' ');

  const dropdownClasses = [
    styles.dropdown,
    styles[`${variant}Dropdown`],
    styles[`${size}Dropdown`],
    styles[`${theme}Dropdown`],
    isOpen ? styles.openDropdown : ''
  ].filter(Boolean).join(' ');

  const optionClasses = [
    styles.option,
    styles[`${variant}Option`],
    styles[`${size}Option`],
    styles[`${theme}Option`]
  ].filter(Boolean).join(' ');

  return (
    <div ref={selectRef} className={containerClasses}>
      <button
        type="button"
        className={triggerClasses}
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={displayText}
      >
        <span className={styles.label}>
          {displayText}
        </span>
        <img
          src="/icons/arrow_drop_down.svg"
          alt="드롭다운"
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
          width="24"
          height="24"
        />
      </button>
      
      {isOpen && (
        <div className={dropdownClasses} role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${optionClasses} ${
                option.value === selectedValue ? styles.selectedOption : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
              role="option"
              aria-selected={option.value === selectedValue}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectBox;
