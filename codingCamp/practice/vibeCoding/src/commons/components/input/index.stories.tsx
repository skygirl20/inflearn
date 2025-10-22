import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './index';

const meta: Meta<typeof Input> = {
  title: 'Commons/Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Figma 디자인 시스템 기반의 입력 컴포넌트입니다.

## Features
- **Variant**: primary(기본), secondary(보조), tertiary(텍스트)
- **Size**: small, medium, large
- **Theme**: light, dark 모드 지원
- **Full Width**: 전체 너비 사용 옵션
- **Error State**: 에러 상태 및 메시지 지원
- **Helper Text**: 도움말 텍스트 지원
- **Label**: 라벨 및 필수 표시 지원
- **Disabled**: 비활성화 상태 지원

## Figma Reference
- Node ID: 3:1297
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '입력 필드의 스타일 variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '입력 필드의 크기',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '테마 모드',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '전체 너비 사용 여부',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    error: {
      control: { type: 'boolean' },
      description: '에러 상태',
    },
    required: {
      control: { type: 'boolean' },
      description: '필수 입력 여부',
    },
    label: {
      control: { type: 'text' },
      description: '라벨 텍스트',
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
    helperText: {
      control: { type: 'text' },
      description: '도움말 텍스트',
    },
    errorMessage: {
      control: { type: 'text' },
      description: '에러 메시지',
    },
  },
  args: {
    placeholder: '회고를 남겨보세요.',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    fullWidth: false,
    disabled: false,
    error: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    placeholder: '기본 입력 필드',
  },
};

// Variant Stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    placeholder: 'Primary 입력 필드',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    placeholder: 'Secondary 입력 필드',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    placeholder: 'Tertiary 입력 필드',
  },
};

// Size Stories
export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small 입력 필드',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    placeholder: 'Medium 입력 필드',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large 입력 필드',
  },
};

// Theme Stories
export const LightTheme: Story = {
  args: {
    theme: 'light',
    placeholder: 'Light 테마 입력 필드',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    placeholder: 'Dark 테마 입력 필드',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Label Stories
export const WithLabel: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
  },
};

export const RequiredField: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    required: true,
  },
};

// Helper Text Stories
export const WithHelperText: Story = {
  args: {
    label: '사용자명',
    placeholder: '사용자명을 입력하세요',
    helperText: '영문, 숫자, 언더스코어만 사용 가능합니다',
  },
};

export const WithErrorMessage: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    error: true,
    errorMessage: '올바른 이메일 형식이 아닙니다',
  },
};

// State Stories
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화된 입력 필드',
    value: '비활성화된 값',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: '전체 너비 입력 필드',
  },
  parameters: {
    layout: 'padded',
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', width: '300px' }}>
      <Input variant="primary" placeholder="Primary 입력 필드" />
      <Input variant="secondary" placeholder="Secondary 입력 필드" />
      <Input variant="tertiary" placeholder="Tertiary 입력 필드" />
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
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', width: '300px' }}>
      <Input size="small" placeholder="Small 입력 필드" />
      <Input size="medium" placeholder="Medium 입력 필드" />
      <Input size="large" placeholder="Large 입력 필드" />
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
          <Input variant="primary" theme="light" placeholder="Primary" />
          <Input variant="secondary" theme="light" placeholder="Secondary" />
          <Input variant="tertiary" theme="light" placeholder="Tertiary" />
        </div>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h4>
        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
          <Input variant="primary" theme="dark" placeholder="Primary" />
          <Input variant="secondary" theme="dark" placeholder="Secondary" />
          <Input variant="tertiary" theme="dark" placeholder="Tertiary" />
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

// Error States
export const ErrorStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', width: '300px' }}>
      <Input 
        variant="primary" 
        error 
        errorMessage="Primary 에러 상태" 
        placeholder="Primary 에러" 
      />
      <Input 
        variant="secondary" 
        error 
        errorMessage="Secondary 에러 상태" 
        placeholder="Secondary 에러" 
      />
      <Input 
        variant="tertiary" 
        error 
        errorMessage="Tertiary 에러 상태" 
        placeholder="Tertiary 에러" 
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 variant의 에러 상태를 확인할 수 있습니다.',
      },
    },
  },
};

// Disabled States
export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', width: '300px' }}>
      <Input variant="primary" disabled placeholder="Primary Disabled" />
      <Input variant="secondary" disabled placeholder="Secondary Disabled" />
      <Input variant="tertiary" disabled placeholder="Tertiary Disabled" />
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

// Form Example
export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
      <Input 
        label="이름" 
        placeholder="이름을 입력하세요" 
        required 
      />
      <Input 
        label="이메일" 
        placeholder="이메일을 입력하세요" 
        type="email"
        required 
      />
      <Input 
        label="비밀번호" 
        placeholder="비밀번호를 입력하세요" 
        type="password"
        required 
        helperText="8자 이상 입력해주세요"
      />
      <Input 
        label="전화번호" 
        placeholder="전화번호를 입력하세요" 
        type="tel"
      />
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 폼에서 사용되는 입력 필드들의 예제입니다.',
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      setError(newValue.length > 0 && newValue.length < 3);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <Input 
          label="사용자명"
          placeholder="3자 이상 입력하세요"
          value={value}
          onChange={handleChange}
          error={error}
          errorMessage={error ? "3자 이상 입력해주세요" : ""}
          helperText={!error ? "영문, 숫자, 언더스코어만 사용 가능" : ""}
        />
        <div style={{ fontSize: '14px', color: '#666' }}>
          입력된 값: {value || '(없음)'}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실시간으로 입력값을 검증하는 인터랙티브 예제입니다.',
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
                      <Input
                        key={`${variant}-${size}-${theme}`}
                        variant={variant}
                        size={size}
                        theme={theme}
                        placeholder={size}
                        style={{ width: '120px' }}
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
