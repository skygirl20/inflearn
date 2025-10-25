'use client';

import React, { useState } from 'react';
import { Input } from '../../commons/components/input';
import { Button } from '../../commons/components/button';
import { EmotionType, EMOTION_INFO, EMOTION_TYPES } from '../../commons/constants/enum';
import styles from './styles.module.css';

/**
 * DiariesNew Component Props
 */
export interface DiariesNewProps {
  /** 닫기 버튼 클릭 핸들러 */
  onClose?: () => void;
  /** 등록하기 버튼 클릭 핸들러 */
  onSubmit?: (data: DiaryFormData) => void;
}

/**
 * 일기 등록 폼 데이터 타입
 */
export interface DiaryFormData {
  /** 선택된 감정 */
  emotion: EmotionType;
  /** 일기 제목 */
  title: string;
  /** 일기 내용 */
  content: string;
}

/**
 * DiariesNew Component
 * 
 * @description
 * 일기 등록을 위한 폼 컴포넌트
 * - 감정 선택 (라디오 버튼)
 * - 제목 입력
 * - 내용 입력
 * - 닫기/등록하기 버튼
 */
export const DiariesNew: React.FC<DiariesNewProps> = ({
  onClose,
  onSubmit,
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(EmotionType.HAPPY);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isFormValid = title.trim() && content.trim();

  const handleSubmit = () => {
    if (!isFormValid) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    onSubmit?.({
      emotion: selectedEmotion,
      title: title.trim(),
      content: content.trim(),
    });
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>일기 쓰기</h1>
      </div>

      {/* Emotion Selection */}
      <div className={styles.emotionBox}>
        <h2 className={styles.emotionTitle}>오늘 기분은 어땠나요?</h2>
        <div className={styles.emotionOptions}>
          {EMOTION_TYPES.map((emotionType: EmotionType) => (
            <label key={emotionType} className={styles.emotionOption}>
              <input
                type="radio"
                name="emotion"
                value={emotionType}
                checked={selectedEmotion === emotionType}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedEmotion(e.target.value as EmotionType)}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                {EMOTION_INFO[emotionType].label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Title Input */}
      <div className={styles.inputTitle}>
        <label className={styles.inputLabel}>제목</label>
        <Input
          variant="primary"
          theme="light"
          size="medium"
          placeholder="제목을 입력합니다."
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className={styles.titleInput}
        />
      </div>

      {/* Content Input */}
      <div className={styles.inputContent}>
        <label className={styles.inputLabel}>내용</label>
        <textarea
          placeholder="내용을 입력합니다."
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          className={styles.contentTextarea}
        />
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <Button
          variant="secondary"
          theme="light"
          size="medium"
          onClick={onClose}
          className={styles.closeButton}
        >
          닫기
        </Button>
        <Button
          variant="primary"
          theme="light"
          size="medium"
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={styles.submitButton}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default DiariesNew;