/**
 * URL Constants
 * 프로젝트에서 사용되는 모든 URL 경로와 관련 설정을 관리
 */

/**
 * 접근 권한 타입
 */
export enum AccessType {
  /** 누구나 접근 가능 */
  PUBLIC = 'PUBLIC',
  /** 회원 전용 */
  MEMBER_ONLY = 'MEMBER_ONLY',
}

/**
 * UI 노출 설정 인터페이스
 */
export interface UIVisibility {
  /** 헤더 노출 여부 */
  header: {
    /** 헤더 전체 노출 */
    visible: boolean;
    /** 로고 노출 */
    logo: boolean;
    /** 다크모드 전환 토글 노출 */
    darkModeToggle: boolean;
  };
  /** 배너 노출 여부 */
  banner: boolean;
  /** 네비게이션 노출 여부 */
  navigation: boolean;
  /** 푸터 노출 여부 */
  footer: boolean;
}

/**
 * URL 정보 인터페이스
 */
export interface URLInfo {
  /** URL 경로 */
  path: string;
  /** 접근 권한 */
  access: AccessType;
  /** UI 노출 설정 */
  ui: UIVisibility;
  /** 설명 */
  description: string;
}

/**
 * URL 경로 상수
 */
export const URL_PATHS = {
  /** 인증 관련 */
  AUTH: {
    /** 로그인 */
    LOGIN: '/auth/login',
    /** 회원가입 */
    SIGNUP: '/auth/signup',
  },
  /** 일기 관련 */
  DIARIES: {
    /** 일기 목록 */
    LIST: '/diaries',
    /** 일기 상세 (다이나믹 라우팅) */
    DETAIL: '/diaries/[id]',
  },
  /** 사진 관련 */
  PICTURES: {
    /** 사진 목록 */
    LIST: '/pictures',
  },
} as const;

/**
 * URL별 상세 정보 매핑
 */
export const URL_INFO: Record<string, URLInfo> = {
  [URL_PATHS.AUTH.LOGIN]: {
    path: URL_PATHS.AUTH.LOGIN,
    access: AccessType.PUBLIC,
    ui: {
      header: {
        visible: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
    description: '로그인 페이지',
  },
  [URL_PATHS.AUTH.SIGNUP]: {
    path: URL_PATHS.AUTH.SIGNUP,
    access: AccessType.PUBLIC,
    ui: {
      header: {
        visible: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
    description: '회원가입 페이지',
  },
  [URL_PATHS.DIARIES.LIST]: {
    path: URL_PATHS.DIARIES.LIST,
    access: AccessType.PUBLIC,
    ui: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
    description: '일기 목록 페이지',
  },
  [URL_PATHS.DIARIES.DETAIL]: {
    path: URL_PATHS.DIARIES.DETAIL,
    access: AccessType.MEMBER_ONLY,
    ui: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: true,
    },
    description: '일기 상세 페이지',
  },
  [URL_PATHS.PICTURES.LIST]: {
    path: URL_PATHS.PICTURES.LIST,
    access: AccessType.PUBLIC,
    ui: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
    description: '사진 목록 페이지',
  },
} as const;

/**
 * URL 유틸리티 함수들
 */
export const URLUtils = {
  /**
   * 다이나믹 라우팅 URL 생성
   * @param template URL 템플릿 (예: '/diaries/[id]')
   * @param params 파라미터 객체 (예: { id: '123' })
   * @returns 실제 URL (예: '/diaries/123')
   */
  generateDynamicURL: (template: string, params: Record<string, string | number>): string => {
    let url = template;
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`[${key}]`, String(value));
    });
    return url;
  },

  /**
   * URL 정보 가져오기
   * @param path URL 경로
   * @returns URL 정보 또는 undefined
   */
  getURLInfo: (path: string): URLInfo | undefined => {
    return URL_INFO[path];
  },

  /**
   * 접근 권한 확인
   * @param path URL 경로
   * @returns 접근 권한 타입
   */
  getAccessType: (path: string): AccessType | undefined => {
    const info = URLUtils.getURLInfo(path);
    return info?.access;
  },

  /**
   * UI 노출 설정 가져오기
   * @param path URL 경로
   * @returns UI 노출 설정
   */
  getUIVisibility: (path: string): UIVisibility | undefined => {
    const info = URLUtils.getURLInfo(path);
    return info?.ui;
  },

  /**
   * 회원 전용 페이지 여부 확인
   * @param path URL 경로
   * @returns 회원 전용 여부
   */
  isMemberOnly: (path: string): boolean => {
    const accessType = URLUtils.getAccessType(path);
    return accessType === AccessType.MEMBER_ONLY;
  },

  /**
   * 퍼블릭 페이지 여부 확인
   * @param path URL 경로
   * @returns 퍼블릭 페이지 여부
   */
  isPublic: (path: string): boolean => {
    const accessType = URLUtils.getAccessType(path);
    return accessType === AccessType.PUBLIC;
  },

  /**
   * 헤더 노출 여부 확인
   * @param path URL 경로
   * @returns 헤더 노출 여부
   */
  shouldShowHeader: (path: string): boolean => {
    const ui = URLUtils.getUIVisibility(path);
    return ui?.header.visible ?? false;
  },

  /**
   * 로고 노출 여부 확인
   * @param path URL 경로
   * @returns 로고 노출 여부
   */
  shouldShowLogo: (path: string): boolean => {
    const ui = URLUtils.getUIVisibility(path);
    return ui?.header.logo ?? false;
  },

  /**
   * 다크모드 토글 노출 여부 확인
   * @param path URL 경로
   * @returns 다크모드 토글 노출 여부
   */
  shouldShowDarkModeToggle: (path: string): boolean => {
    const ui = URLUtils.getUIVisibility(path);
    return ui?.header.darkModeToggle ?? false;
  },

  /**
   * 배너 노출 여부 확인
   * @param path URL 경로
   * @returns 배너 노출 여부
   */
  shouldShowBanner: (path: string): boolean => {
    const ui = URLUtils.getUIVisibility(path);
    return ui?.banner ?? false;
  },

  /**
   * 네비게이션 노출 여부 확인
   * @param path URL 경로
   * @returns 네비게이션 노출 여부
   */
  shouldShowNavigation: (path: string): boolean => {
    const ui = URLUtils.getUIVisibility(path);
    return ui?.navigation ?? false;
  },

  /**
   * 푸터 노출 여부 확인
   * @param path URL 경로
   * @returns 푸터 노출 여부
   */
  shouldShowFooter: (path: string): boolean => {
    const ui = URLUtils.getUIVisibility(path);
    return ui?.footer ?? false;
  },

  /**
   * 모든 URL 정보 가져오기
   * @returns 모든 URL 정보 배열
   */
  getAllURLs: (): URLInfo[] => {
    return Object.values(URL_INFO);
  },

  /**
   * 접근 권한별 URL 필터링
   * @param accessType 접근 권한 타입
   * @returns 해당 접근 권한의 URL 정보 배열
   */
  getURLsByAccessType: (accessType: AccessType): URLInfo[] => {
    return Object.values(URL_INFO).filter(info => info.access === accessType);
  },
} as const;

/**
 * 기본 내보내기
 */
export default {
  URL_PATHS,
  URL_INFO,
  AccessType,
  URLUtils,
} as const;
