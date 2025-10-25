import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { Button } from '../../commons/components/button';
import { Input } from '../../commons/components/input';
import { EmotionType, EMOTION_INFO } from '../../commons/constants/enum';

interface DiariesDetailProps {
  id?: string;
  title?: string;
  content?: string;
  emotion?: EmotionType;
  createdAt?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onCopyContent?: () => void;
}

const DiariesDetail: React.FC<DiariesDetailProps> = ({
  id,
  title = "이것은 타이틀 입니다.",
  content = "내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다",
  emotion = EmotionType.HAPPY,
  createdAt = "2024. 07. 12",
  onEdit,
  onDelete,
  onCopyContent,
}) => {
  const emotionInfo = EMOTION_INFO[emotion];

  return (
    <div className={styles.container}>
      {/* Gap 64px */}
      <div className={styles.gap64}></div>
      
      {/* Detail Title Section */}
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        
        <div className={styles.emotionAndDate}>
          <div className={styles.emotionSection}>
            <Image
              src={emotionInfo.imageS}
              alt={emotionInfo.label}
              width={32}
              height={32}
              className={styles.emotionIcon}
            />
            <span className={styles.emotionText}>{emotionInfo.label}</span>
          </div>
          
          <div className={styles.dateSection}>
            <span className={styles.dateText}>{createdAt}</span>
            <span className={styles.writtenText}>작성</span>
          </div>
        </div>
      </div>
      
      {/* Gap 24px */}
      <div className={styles.gap24}></div>
      
      {/* Detail Content Section */}
      <div className={styles.detailContent}>
        <div className={styles.contentLabel}>내용</div>
        <div className={styles.contentText}>{content}</div>
        
        <div className={styles.copySection}>
          <button 
            className={styles.copyButton}
            onClick={onCopyContent}
            aria-label="내용 복사"
          >
            <Image
              src="/icons/copy_outline_light_m.svg"
              alt="복사"
              width={24}
              height={24}
              className={styles.copyIcon}
            />
            <span className={styles.copyText}>내용 복사</span>
          </button>
        </div>
      </div>
      
      {/* Gap 24px */}
      <div className={styles.gap24}></div>
      
      {/* Detail Footer Section */}
      <div className={styles.detailFooter}>
        <Button
          variant="secondary"
          size="medium"
          theme="light"
          onClick={onEdit}
          className={styles.editButton}
        >
          수정
        </Button>
        <Button
          variant="secondary"
          size="medium"
          theme="light"
          onClick={onDelete}
          className={styles.deleteButton}
        >
          삭제
        </Button>
      </div>
      
      {/* Gap 24px */}
      <div className={styles.gap24}></div>
      
      {/* Retrospect Input Section */}
      <div className={styles.retrospectInput}>
        <div className={styles.retrospectLabel}>회고</div>
        <div className={styles.retrospectInputContainer}>
          <Input
            variant="primary"
            size="medium"
            theme="light"
            placeholder="회고를 남겨보세요."
            className={styles.retrospectInputField}
          />
          <Button
            variant="primary"
            size="medium"
            theme="light"
            className={styles.retrospectSubmitButton}
          >
            입력
          </Button>
        </div>
      </div>
      
      {/* Gap 16px */}
      <div className={styles.gap16}></div>
      
      {/* Retrospect List Section */}
      <div className={styles.retrospectList}>
        <div className={styles.retrospectItem}>
          <span className={styles.retrospectText}>3년이 지나고 다시 보니 이때가 그립다.</span>
          <span className={styles.retrospectDate}>[2024. 09. 24]</span>
        </div>
        <div className={styles.retrospectItem}>
          <span className={styles.retrospectText}>3년이 지나고 다시 보니 이때가 그립다.</span>
          <span className={styles.retrospectDate}>[2024. 09. 24]</span>
        </div>
      </div>
    </div>
  );
};

export default DiariesDetail;
