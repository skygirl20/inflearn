/**
 * Enum Constants
 * 프로젝트에서 사용되는 모든 enum 데이터 정의
 */

import { red, blue, gray, yellow, green } from './color';

/**
 * 감정(Emotion) Enum
 * 사용자의 감정 상태를 나타내는 enum 데이터
 */
export enum EmotionType {
  HAPPY = 'HAPPY',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
  SURPRISE = 'SURPRISE',
  ETC = 'ETC',
}

/**
 * 감정별 상세 정보 인터페이스
 */
export interface EmotionInfo {
  /** 화면에 표시될 텍스트 */
  label: string;
  /** 미디엄 사이즈 이미지 경로 */
  imageM: string;
  /** 스몰 사이즈 이미지 경로 */
  imageS: string;
  /** 감정별 색상 */
  color: string;
}

/**
 * 감정별 상세 정보 매핑
 */
export const EMOTION_INFO: Record<EmotionType, EmotionInfo> = {
  [EmotionType.HAPPY]: {
    label: '행복해요',
    imageM: '/images/emotion-happy-m.png',
    imageS: '/images/emotion-happy-s.png',
    color: red[60], // #850A1B
  },
  [EmotionType.SAD]: {
    label: '슬퍼요',
    imageM: '/images/emotion-sad-m.png',
    imageS: '/images/emotion-sad-s.png',
    color: blue[60], // #3A5CF3
  },
  [EmotionType.ANGRY]: {
    label: '화나요',
    imageM: '/images/emotion-angry-m.png',
    imageS: '/images/emotion-angry-s.png',
    color: gray[60], // #777777
  },
  [EmotionType.SURPRISE]: {
    label: '놀랐어요',
    imageM: '/images/emotion-surprise-m.png',
    imageS: '/images/emotion-surprise-s.png',
    color: yellow[60], // #B27D00
  },
  [EmotionType.ETC]: {
    label: '기타',
    imageM: '/images/emotion-etc-m.png',
    imageS: '/images/emotion-etc-s.png',
    color: green[60], // #084424
  },
} as const;

/**
 * 감정 타입 배열 (순서 보장)
 */
export const EMOTION_TYPES = [
  EmotionType.HAPPY,
  EmotionType.SAD,
  EmotionType.ANGRY,
  EmotionType.SURPRISE,
  EmotionType.ETC,
] as const;

/**
 * 감정 정보 유틸리티 함수들
 */
export const EmotionUtils = {
  /**
   * 감정 타입으로 라벨 가져오기
   */
  getLabel: (type: EmotionType): string => {
    return EMOTION_INFO[type].label;
  },

  /**
   * 감정 타입으로 이미지 경로 가져오기
   */
  getImage: (type: EmotionType, size: 'M' | 'S' = 'M'): string => {
    return size === 'M' ? EMOTION_INFO[type].imageM : EMOTION_INFO[type].imageS;
  },

  /**
   * 감정 타입으로 색상 가져오기
   */
  getColor: (type: EmotionType): string => {
    return EMOTION_INFO[type].color;
  },

  /**
   * 모든 감정 정보 가져오기
   */
  getAllEmotions: (): Array<{ type: EmotionType; info: EmotionInfo }> => {
    return EMOTION_TYPES.map(type => ({
      type,
      info: EMOTION_INFO[type],
    }));
  },

  /**
   * 감정 타입 유효성 검사
   */
  isValidEmotionType: (value: string): value is EmotionType => {
    return Object.values(EmotionType).includes(value as EmotionType);
  },
} as const;

/**
 * 기본 내보내기
 */
export default {
  EmotionType,
  EMOTION_INFO,
  EMOTION_TYPES,
  EmotionUtils,
} as const;
