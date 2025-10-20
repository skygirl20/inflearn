/**
 * Color Design Tokens
 * Figma Foundation 기반 컬러 시스템 (노드 ID: 3:7593)
 * 다크모드 지원을 위한 컬러 토큰 정의
 */

// Blue Color Palette
export const blue = {
  5: '#F0F7FF',
  10: '#DBEEFF', 
  20: '#BDDBFF',
  30: '#93BEFF',
  40: '#6DA5FA', // System color
  50: '#497CFF',
  60: '#3A5CF3', // System color
  70: '#274AE1',
  80: '#1530A6',
  90: '#0B2184',
} as const;

// Gray Color Palette
export const gray = {
  white: '#FFFFFF',
  5: '#F2F2F2',
  10: '#E4E4E4',
  20: '#D4D3D3',
  30: '#C7C7C7',
  40: '#ABABAB',
  50: '#919191',
  60: '#777777',
  70: '#5F5F5F',
  80: '#333333',
  90: '#1C1C1C',
  black: '#000000',
} as const;

// Red Color Palette
export const red = {
  5: '#FDD7DC',
  10: '#F797A4',
  20: '#F4677A',
  30: '#F03851', // Error color
  40: '#E4112E',
  50: '#B40E24',
  60: '#850A1B',
} as const;

// Green Color Palette
export const green = {
  5: '#D3F3E0',
  10: '#92E6B9',
  20: '#15D66F',
  30: '#12B75F', // Success color
  40: '#109C51',
  50: '#0E723C',
  60: '#084424',
} as const;

// Yellow Color Palette
export const yellow = {
  5: '#FFE499',
  10: '#FFD666',
  20: '#FFC933',
  30: '#FFB300',
  40: '#EBA500',
  50: '#D69600',
  60: '#B27D00',
} as const;

// Cool Gray Color Palette
export const coolGray = {
  1: '#F8F8FA',
  5: '#F6F6F9',
  10: '#EDEEF2',
  20: '#DDDFE5',
  30: '#D2D4DD',
  40: '#C7C9D5',
  50: '#BBBECD',
  60: '#B0B3C4',
} as const;

// Gradient Colors
export const gradient = {
  primary: 'linear-gradient(135deg, #6DA5FA 0%, #92EAF5 100%)',
  skeleton: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 48.5%, transparent 100%)',
} as const;

// Semantic Color Tokens
export const semantic = {
  // Primary Colors
  primary: {
    light: blue[40], // #6DA5FA
    dark: blue[60],  // #3A5CF3
  },
  
  // Background Colors
  background: {
    primary: {
      light: gray.white,
      dark: gray[90],
    },
    secondary: {
      light: gray[5],
      dark: gray[80],
    },
    tertiary: {
      light: coolGray[5],
      dark: gray[70],
    },
  },
  
  // Text Colors
  text: {
    primary: {
      light: gray.black,
      dark: gray.white,
    },
    secondary: {
      light: gray[60],
      dark: gray[40],
    },
    tertiary: {
      light: gray[50],
      dark: gray[50],
    },
    disabled: {
      light: gray[40],
      dark: gray[60],
    },
  },
  
  // Border Colors
  border: {
    primary: {
      light: gray[20],
      dark: gray[70],
    },
    secondary: {
      light: gray[10],
      dark: gray[80],
    },
    focus: {
      light: blue[40],
      dark: blue[60],
    },
  },
  
  // Status Colors
  status: {
    success: green[30], // #12B75F
    error: red[30],     // #F03851
    warning: yellow[30], // #FFB300
    info: blue[50],     // #497CFF
  },
  
  // Interactive Colors
  interactive: {
    hover: {
      light: gray[5],
      dark: gray[80],
    },
    pressed: {
      light: gray[10],
      dark: gray[70],
    },
    disabled: {
      light: gray[20],
      dark: gray[70],
    },
  },
} as const;

// Theme Type Definition
export type ColorTheme = 'light' | 'dark';

// Color Token Utility Functions
export const getSemanticColor = (
  colorPath: keyof typeof semantic,
  theme: ColorTheme = 'light'
) => {
  const colorGroup = semantic[colorPath];
  
  if (typeof colorGroup === 'string') {
    return colorGroup;
  }
  
  if (typeof colorGroup === 'object' && colorGroup !== null) {
    // Check if it's a themed color object
    if ('light' in colorGroup && 'dark' in colorGroup) {
      return colorGroup[theme];
    }
    
    // If it's a nested object, return the whole object
    return colorGroup;
  }
  
  return colorGroup;
};

// CSS Custom Properties Generator
export const generateCSSVariables = (theme: ColorTheme = 'light') => {
  const variables: Record<string, string> = {};
  
  // Generate palette variables
  const palettes = { blue, gray, red, green, yellow, coolGray };
  Object.entries(palettes).forEach(([paletteName, palette]) => {
    Object.entries(palette).forEach(([shade, color]) => {
      const kebabPaletteName = paletteName === 'coolGray' ? 'cool-gray' : paletteName;
      variables[`--color-${kebabPaletteName}-${shade}`] = color;
    });
  });
  
  // Generate gradient variables
  Object.entries(gradient).forEach(([name, value]) => {
    variables[`--gradient-${name}`] = value;
  });
  
  // Generate semantic color variables based on theme
  if (theme === 'light') {
    variables['--color-primary'] = semantic.primary.light;
    variables['--color-background-primary'] = semantic.background.primary.light;
    variables['--color-background-secondary'] = semantic.background.secondary.light;
    variables['--color-background-tertiary'] = semantic.background.tertiary.light;
    variables['--color-text-primary'] = semantic.text.primary.light;
    variables['--color-text-secondary'] = semantic.text.secondary.light;
    variables['--color-text-tertiary'] = semantic.text.tertiary.light;
    variables['--color-text-disabled'] = semantic.text.disabled.light;
    variables['--color-border-primary'] = semantic.border.primary.light;
    variables['--color-border-secondary'] = semantic.border.secondary.light;
    variables['--color-border-focus'] = semantic.border.focus.light;
    variables['--color-interactive-hover'] = semantic.interactive.hover.light;
    variables['--color-interactive-pressed'] = semantic.interactive.pressed.light;
    variables['--color-interactive-disabled'] = semantic.interactive.disabled.light;
  } else {
    variables['--color-primary'] = semantic.primary.dark;
    variables['--color-background-primary'] = semantic.background.primary.dark;
    variables['--color-background-secondary'] = semantic.background.secondary.dark;
    variables['--color-background-tertiary'] = semantic.background.tertiary.dark;
    variables['--color-text-primary'] = semantic.text.primary.dark;
    variables['--color-text-secondary'] = semantic.text.secondary.dark;
    variables['--color-text-tertiary'] = semantic.text.tertiary.dark;
    variables['--color-text-disabled'] = semantic.text.disabled.dark;
    variables['--color-border-primary'] = semantic.border.primary.dark;
    variables['--color-border-secondary'] = semantic.border.secondary.dark;
    variables['--color-border-focus'] = semantic.border.focus.dark;
    variables['--color-interactive-hover'] = semantic.interactive.hover.dark;
    variables['--color-interactive-pressed'] = semantic.interactive.pressed.dark;
    variables['--color-interactive-disabled'] = semantic.interactive.disabled.dark;
  }
  
  // Status colors (theme-independent)
  variables['--color-status-success'] = semantic.status.success;
  variables['--color-status-error'] = semantic.status.error;
  variables['--color-status-warning'] = semantic.status.warning;
  variables['--color-status-info'] = semantic.status.info;
  
  return variables;
};

// Export all color palettes
export const colors = {
  blue,
  gray,
  red,
  green,
  yellow,
  coolGray,
  gradient,
  semantic,
} as const;

// Default export
export default colors;
