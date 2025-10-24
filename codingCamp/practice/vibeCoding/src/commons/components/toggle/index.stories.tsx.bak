import React from 'react';
// import type { Meta, StoryObj } from '@storybook/nextjs';
import { Toggle } from './index';

// 임시로 타입 정의
type Meta = any;
type StoryObj = any;

const meta: any = {
  title: 'Commons/Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Figma 디자인 시스템 기반의 토글 스위치 컴포넌트입니다.

## Features
- **Variant**: primary(기본 강조), secondary(보조), tertiary(심플)
- **Size**: small, medium, large
- **Theme**: light, dark 모드 지원
- **Label**: 라벨 및 위치 설정 지원
- **Disabled**: 비활성화 상태 지원
- **Accessibility**: 키보드 네비게이션, 스크린 리더 지원

## Figma Reference
- Node ID: 3:1704, 3:3070
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '토글의 스타일 variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '토글의 크기',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '테마 모드',
    },
    checked: {
      control: { type: 'boolean' },
      description: '토글 상태',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    label: {
      control: { type: 'text' },
      description: '라벨 텍스트',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: '라벨 위치',
    },
    'aria-label': {
      control: { type: 'text' },
      description: '접근성을 위한 aria-label',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
    disabled: false,
    label: '알림 설정',
    labelPosition: 'right',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    label: '기본 토글',
  },
};

// Variant Stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary 토글',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary 토글',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    label: 'Tertiary 토글',
  },
};

// Size Stories
export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small 토글',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    label: 'Medium 토글',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large 토글',
  },
};

// Theme Stories
export const LightTheme: Story = {
  args: {
    theme: 'light',
    label: 'Light 테마',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    label: 'Dark 테마',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Label Position Stories
export const LabelLeft: Story = {
  args: {
    label: '왼쪽 라벨',
    labelPosition: 'left',
  },
};

export const LabelRight: Story = {
  args: {
    label: '오른쪽 라벨',
    labelPosition: 'right',
  },
};

// State Stories
export const Checked: Story = {
  args: {
    checked: true,
    label: '체크된 토글',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: '비활성화 토글',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    label: '비활성화된 체크 토글',
  },
};

// Without Label
export const WithoutLabel: Story = {
  args: {
    'aria-label': '라벨 없는 토글',
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
      <Toggle variant="primary" label="Primary 토글" />
      <Toggle variant="secondary" label="Secondary 토글" />
      <Toggle variant="tertiary" label="Tertiary 토글" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 variant를 한 번에 확인할 수 있습니다.',
      },
    },
  },
};

// All Sizes Showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
      <Toggle size="small" label="Small 토글" />
      <Toggle size="medium" label="Medium 토글" />
      <Toggle size="large" label="Large 토글" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 size를 한 번에 확인할 수 있습니다.',
      },
    },
  },
};

// Theme Comparison
export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#000' }}>Light Theme</h4>
        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
          <Toggle variant="primary" theme="light" label="Primary" />
          <Toggle variant="secondary" theme="light" label="Secondary" />
          <Toggle variant="tertiary" theme="light" label="Tertiary" />
        </div>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h4>
        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
          <Toggle variant="primary" theme="dark" label="Primary" />
          <Toggle variant="secondary" theme="dark" label="Secondary" />
          <Toggle variant="tertiary" theme="dark" label="Tertiary" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Light와 Dark 테마를 비교해서 확인할 수 있습니다.',
      },
    },
  },
};

// Checked States
export const CheckedStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
      <Toggle variant="primary" checked={false} label="Primary (Unchecked)" />
      <Toggle variant="primary" checked={true} label="Primary (Checked)" />
      <Toggle variant="secondary" checked={false} label="Secondary (Unchecked)" />
      <Toggle variant="secondary" checked={true} label="Secondary (Checked)" />
      <Toggle variant="tertiary" checked={false} label="Tertiary (Unchecked)" />
      <Toggle variant="tertiary" checked={true} label="Tertiary (Checked)" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 variant의 체크/언체크 상태를 확인할 수 있습니다.',
      },
    },
  },
};

// Disabled States
export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
      <Toggle variant="primary" disabled label="Primary Disabled" />
      <Toggle variant="secondary" disabled label="Secondary Disabled" />
      <Toggle variant="tertiary" disabled label="Tertiary Disabled" />
      <Toggle variant="primary" disabled checked label="Primary Disabled (Checked)" />
      <Toggle variant="secondary" disabled checked label="Secondary Disabled (Checked)" />
      <Toggle variant="tertiary" disabled checked label="Tertiary Disabled (Checked)" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 variant의 disabled 상태를 확인할 수 있습니다.',
      },
    },
  },
};

// Label Position Showcase
export const LabelPositionShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
      <Toggle label="왼쪽 라벨" labelPosition="left" />
      <Toggle label="오른쪽 라벨" labelPosition="right" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '라벨 위치를 확인할 수 있습니다.',
      },
    },
  },
};

// Settings Panel Example
export const SettingsPanel: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '16px', 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '8px',
      minWidth: '300px'
    }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>설정</h3>
      <Toggle label="알림 받기" checked />
      <Toggle label="이메일 알림" />
      <Toggle label="푸시 알림" checked />
      <Toggle label="마케팅 수신" />
      <Toggle label="위치 서비스" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '설정 패널에서 사용되는 토글들의 예제입니다.',
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState(true);
    const [emailAlerts, setEmailAlerts] = React.useState(false);
    const [pushAlerts, setPushAlerts] = React.useState(true);
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px', 
        padding: '20px', 
        backgroundColor: '#ffffff', 
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        minWidth: '300px'
      }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>알림 설정</h3>
        <Toggle 
          label="알림 받기" 
          checked={notifications}
          onChange={setNotifications}
        />
        <Toggle 
          label="이메일 알림" 
          checked={emailAlerts}
          onChange={setEmailAlerts}
        />
        <Toggle 
          label="푸시 알림" 
          checked={pushAlerts}
          onChange={setPushAlerts}
        />
        <div style={{ 
          marginTop: '16px', 
          padding: '12px', 
          backgroundColor: '#f0f0f0', 
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <div>알림 받기: {notifications ? 'ON' : 'OFF'}</div>
          <div>이메일 알림: {emailAlerts ? 'ON' : 'OFF'}</div>
          <div>푸시 알림: {pushAlerts ? 'ON' : 'OFF'}</div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실시간으로 상태가 변경되는 인터랙티브 예제입니다.',
      },
    },
  },
};

// Complete Matrix (모든 조합)
export const CompleteMatrix: Story = {
  render: () => {
    const variants = ['primary', 'secondary', 'tertiary'] as const;
    const sizes = ['small', 'medium', 'large'] as const;
    const themes = ['light', 'dark'] as const;

    return (
      <div style={{ display: 'grid', gap: '32px' }}>
        {themes.map((theme) => (
          <div
            key={theme}
            style={{
              padding: '24px',
              backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
              borderRadius: '12px',
              border: theme === 'light' ? '1px solid #e0e0e0' : '1px solid #333',
            }}
          >
            <h3 style={{ 
              margin: '0 0 20px 0', 
              color: theme === 'light' ? '#000' : '#fff',
              textAlign: 'center'
            }}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {variants.map((variant) => (
                <div key={variant} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ 
                    minWidth: '80px', 
                    color: theme === 'light' ? '#666' : '#ccc',
                    fontSize: '14px',
                    textTransform: 'capitalize'
                  }}>
                    {variant}:
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {sizes.map((size) => (
                      <Toggle
                        key={`${variant}-${size}-${theme}`}
                        variant={variant}
                        size={size}
                        theme={theme}
                        label={size}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '모든 variant, size, theme 조합을 한 번에 확인할 수 있는 완전한 매트릭스입니다.',
      },
    },
  },
};

// Accessibility Example
export const AccessibilityExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>접근성 예제</h3>
      <Toggle 
        label="키보드로 탐색 가능한 토글" 
        aria-label="키보드로 탐색 가능한 토글"
      />
      <Toggle 
        label="스크린 리더 지원 토글" 
        aria-label="스크린 리더에서 읽을 수 있는 토글"
      />
      <Toggle 
        disabled
        label="비활성화된 토글" 
        aria-label="현재 비활성화된 토글"
      />
      <div style={{ 
        marginTop: '16px', 
        padding: '12px', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <h4 style={{ margin: '0 0 8px 0' }}>접근성 기능:</h4>
        <ul style={{ margin: '0', paddingLeft: '20px' }}>
          <li>Tab 키로 포커스 이동</li>
          <li>Space 키로 토글 상태 변경</li>
          <li>스크린 리더 지원</li>
          <li>고대비 모드 지원</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '접근성 기능을 확인할 수 있는 예제입니다.',
      },
    },
  },
};
