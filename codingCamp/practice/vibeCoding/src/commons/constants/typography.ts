/**
 * Typography Design Tokens
 * Figma Foundation 기반 타이포그래피 시스템 (노드 ID: 3:7885)
 * 한국어(Pretendard), 영문/숫자(SUIT) 폰트 지원
 * 모바일과 데스크톱 반응형 지원
 */

// Font Family Constants
export const fontFamily = {
  korean: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
  english: 'SUIT Variable, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", Arial, sans-serif',
} as const;

// Font Weight Constants
export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

// Device Type
export type DeviceType = 'mobile' | 'desktop';
export type LanguageType = 'korean' | 'english';

// Typography Token Interface
interface TypographyToken {
  fontFamily: string;
  fontWeight: number;
  fontSize: {
    mobile: number;
    desktop: number;
  };
  lineHeight: {
    mobile: number;
    desktop: number;
  };
  letterSpacing?: number;
}

// Web Headline Typography Tokens
export const webHeadline = {
  headline01: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.semibold,
    fontSize: {
      mobile: 36, // 모바일에서는 작게
      desktop: 48,
    },
    lineHeight: {
      mobile: 48,
      desktop: 60,
    },
    letterSpacing: 0,
  },
  headline02: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.semibold,
    fontSize: {
      mobile: 28,
      desktop: 36,
    },
    lineHeight: {
      mobile: 36,
      desktop: 48,
    },
    letterSpacing: 0,
  },
  headline03: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.semibold,
    fontSize: {
      mobile: 24,
      desktop: 28,
    },
    lineHeight: {
      mobile: 32,
      desktop: 36,
    },
    letterSpacing: 0,
  },
} as const satisfies Record<string, TypographyToken>;

// Headline Typography Tokens
export const headline = {
  headline01: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.bold,
    fontSize: {
      mobile: 20,
      desktop: 24,
    },
    lineHeight: {
      mobile: 28,
      desktop: 32,
    },
    letterSpacing: 0,
  },
  headline02: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.extrabold,
    fontSize: {
      mobile: 18,
      desktop: 22,
    },
    lineHeight: {
      mobile: 26,
      desktop: 30,
    },
    letterSpacing: 0,
  },
  headline03: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.bold,
    fontSize: {
      mobile: 16,
      desktop: 20,
    },
    lineHeight: {
      mobile: 24,
      desktop: 28,
    },
    letterSpacing: 0,
  },
} as const satisfies Record<string, TypographyToken>;

// Title Typography Tokens
export const title = {
  title01: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.bold,
    fontSize: {
      mobile: 16,
      desktop: 18,
    },
    lineHeight: {
      mobile: 22,
      desktop: 24,
    },
    letterSpacing: 0,
  },
  title02: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.bold,
    fontSize: {
      mobile: 14,
      desktop: 16,
    },
    lineHeight: {
      mobile: 20,
      desktop: 22,
    },
    letterSpacing: 0,
  },
  title03: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.bold,
    fontSize: {
      mobile: 12,
      desktop: 14,
    },
    lineHeight: {
      mobile: 18,
      desktop: 20,
    },
    letterSpacing: 0,
  },
  subtitle01: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.semibold,
    fontSize: {
      mobile: 12,
      desktop: 14,
    },
    lineHeight: {
      mobile: 18,
      desktop: 22,
    },
    letterSpacing: 0,
  },
  subtitle02: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.semibold,
    fontSize: {
      mobile: 10,
      desktop: 12,
    },
    lineHeight: {
      mobile: 16,
      desktop: 18,
    },
    letterSpacing: 0,
  },
} as const satisfies Record<string, TypographyToken>;

// Body Typography Tokens
export const body = {
  body01: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.medium,
    fontSize: {
      mobile: 14,
      desktop: 16,
    },
    lineHeight: {
      mobile: 20,
      desktop: 24,
    },
    letterSpacing: 0,
  },
  body02: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.medium,
    fontSize: {
      mobile: 12,
      desktop: 14,
    },
    lineHeight: {
      mobile: 18,
      desktop: 22,
    },
    letterSpacing: 0,
  },
  body03: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.medium,
    fontSize: {
      mobile: 10,
      desktop: 12,
    },
    lineHeight: {
      mobile: 16,
      desktop: 18,
    },
    letterSpacing: 0,
  },
  // Regular variants
  body01Regular: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.regular,
    fontSize: {
      mobile: 14,
      desktop: 16,
    },
    lineHeight: {
      mobile: 20,
      desktop: 22,
    },
    letterSpacing: 0,
  },
  body02Regular: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.regular,
    fontSize: {
      mobile: 12,
      desktop: 14,
    },
    lineHeight: {
      mobile: 18,
      desktop: 20,
    },
    letterSpacing: 0,
  },
  body03Regular: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.regular,
    fontSize: {
      mobile: 10,
      desktop: 12,
    },
    lineHeight: {
      mobile: 14,
      desktop: 16,
    },
    letterSpacing: 0,
  },
} as const satisfies Record<string, TypographyToken>;

// Caption Typography Tokens
export const caption = {
  caption01: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.semibold,
    fontSize: {
      mobile: 10,
      desktop: 12,
    },
    lineHeight: {
      mobile: 12,
      desktop: 14,
    },
    letterSpacing: 0,
  },
  caption02: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.semibold,
    fontSize: {
      mobile: 8,
      desktop: 10,
    },
    lineHeight: {
      mobile: 10,
      desktop: 12,
    },
    letterSpacing: 0,
  },
  caption02Medium: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.medium,
    fontSize: {
      mobile: 8,
      desktop: 10,
    },
    lineHeight: {
      mobile: 10,
      desktop: 12,
    },
    letterSpacing: 0,
  },
  caption03: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.semibold,
    fontSize: {
      mobile: 6,
      desktop: 8,
    },
    lineHeight: {
      mobile: 8,
      desktop: 10,
    },
    letterSpacing: 0,
  },
} as const satisfies Record<string, TypographyToken>;

// English Typography Variants
export const english = {
  webHeadline: {
    ...webHeadline,
    headline01: { ...webHeadline.headline01, fontFamily: fontFamily.english },
    headline02: { ...webHeadline.headline02, fontFamily: fontFamily.english },
    headline03: { ...webHeadline.headline03, fontFamily: fontFamily.english },
  },
  headline: {
    ...headline,
    headline01: { ...headline.headline01, fontFamily: fontFamily.english },
    headline02: { ...headline.headline02, fontFamily: fontFamily.english },
    headline03: { ...headline.headline03, fontFamily: fontFamily.english },
  },
  title: {
    ...title,
    title01: { ...title.title01, fontFamily: fontFamily.english },
    title02: { ...title.title02, fontFamily: fontFamily.english },
    title03: { ...title.title03, fontFamily: fontFamily.english },
    subtitle01: { ...title.subtitle01, fontFamily: fontFamily.english },
    subtitle02: { ...title.subtitle02, fontFamily: fontFamily.english },
  },
  body: {
    ...body,
    body01: { ...body.body01, fontFamily: fontFamily.english },
    body02: { ...body.body02, fontFamily: fontFamily.english },
    body03: { ...body.body03, fontFamily: fontFamily.english },
    body01Regular: { ...body.body01Regular, fontFamily: fontFamily.english },
    body02Regular: { ...body.body02Regular, fontFamily: fontFamily.english },
    body03Regular: { ...body.body03Regular, fontFamily: fontFamily.english },
  },
  caption: {
    ...caption,
    caption01: { ...caption.caption01, fontFamily: fontFamily.english },
    caption02: { ...caption.caption02, fontFamily: fontFamily.english },
    caption02Medium: { ...caption.caption02Medium, fontFamily: fontFamily.english },
    caption03: { ...caption.caption03, fontFamily: fontFamily.english },
  },
} as const;

// Typography Utility Functions
export const getTypographyStyle = (
  token: TypographyToken,
  device: DeviceType = 'desktop'
) => ({
  fontFamily: token.fontFamily,
  fontWeight: token.fontWeight,
  fontSize: `${token.fontSize[device]}px`,
  lineHeight: `${token.lineHeight[device]}px`,
  letterSpacing: token.letterSpacing ? `${token.letterSpacing}px` : '0',
});

export const getResponsiveTypography = (token: TypographyToken) => ({
  fontFamily: token.fontFamily,
  fontWeight: token.fontWeight,
  fontSize: `${token.fontSize.mobile}px`,
  lineHeight: `${token.lineHeight.mobile}px`,
  letterSpacing: token.letterSpacing ? `${token.letterSpacing}px` : '0',
  '@media (min-width: 768px)': {
    fontSize: `${token.fontSize.desktop}px`,
    lineHeight: `${token.lineHeight.desktop}px`,
  },
});

// CSS Custom Properties Generator
export const generateTypographyCSSVariables = (device: DeviceType = 'desktop') => {
  const variables: Record<string, string> = {};
  
  // Web Headlines
  Object.entries(webHeadline).forEach(([name, token]) => {
    const prefix = `--typography-web-headline-${name.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    variables[`${prefix}-font-family`] = token.fontFamily;
    variables[`${prefix}-font-weight`] = token.fontWeight.toString();
    variables[`${prefix}-font-size`] = `${token.fontSize[device]}px`;
    variables[`${prefix}-line-height`] = `${token.lineHeight[device]}px`;
    variables[`${prefix}-letter-spacing`] = `${token.letterSpacing}px`;
  });
  
  // Headlines
  Object.entries(headline).forEach(([name, token]) => {
    const prefix = `--typography-headline-${name.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    variables[`${prefix}-font-family`] = token.fontFamily;
    variables[`${prefix}-font-weight`] = token.fontWeight.toString();
    variables[`${prefix}-font-size`] = `${token.fontSize[device]}px`;
    variables[`${prefix}-line-height`] = `${token.lineHeight[device]}px`;
    variables[`${prefix}-letter-spacing`] = `${token.letterSpacing}px`;
  });
  
  // Titles
  Object.entries(title).forEach(([name, token]) => {
    const prefix = `--typography-title-${name.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    variables[`${prefix}-font-family`] = token.fontFamily;
    variables[`${prefix}-font-weight`] = token.fontWeight.toString();
    variables[`${prefix}-font-size`] = `${token.fontSize[device]}px`;
    variables[`${prefix}-line-height`] = `${token.lineHeight[device]}px`;
    variables[`${prefix}-letter-spacing`] = `${token.letterSpacing}px`;
  });
  
  // Body
  Object.entries(body).forEach(([name, token]) => {
    const prefix = `--typography-body-${name.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    variables[`${prefix}-font-family`] = token.fontFamily;
    variables[`${prefix}-font-weight`] = token.fontWeight.toString();
    variables[`${prefix}-font-size`] = `${token.fontSize[device]}px`;
    variables[`${prefix}-line-height`] = `${token.lineHeight[device]}px`;
    variables[`${prefix}-letter-spacing`] = `${token.letterSpacing}px`;
  });
  
  // Captions
  Object.entries(caption).forEach(([name, token]) => {
    const prefix = `--typography-caption-${name.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    variables[`${prefix}-font-family`] = token.fontFamily;
    variables[`${prefix}-font-weight`] = token.fontWeight.toString();
    variables[`${prefix}-font-size`] = `${token.fontSize[device]}px`;
    variables[`${prefix}-line-height`] = `${token.lineHeight[device]}px`;
    variables[`${prefix}-letter-spacing`] = `${token.letterSpacing}px`;
  });
  
  return variables;
};

// All Typography Tokens Export
export const typography = {
  webHeadline,
  headline,
  title,
  body,
  caption,
  english,
  fontFamily,
  fontWeight,
} as const;

// Default export
export default typography;

