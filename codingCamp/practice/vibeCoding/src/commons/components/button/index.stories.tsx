import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Commons/Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Figma 디자인 시스템 기반의 버튼 컴포넌트입니다.

## Features
- **Variant**: primary(기본 강조), secondary(보조), tertiary(텍스트)
- **Size**: small, medium, large
- **Theme**: light, dark 모드 지원
- **Full Width**: 전체 너비 사용 옵션
- **Disabled**: 비활성화 상태 지원

## Figma Reference
- Node ID: 3:2291
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '버튼의 스타일 variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
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
    children: {
      control: { type: 'text' },
      description: '버튼 텍스트',
    },
  },
  args: {
    children: '버튼',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    fullWidth: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    children: '기본 버튼',
  },
};

// Variant Stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary 버튼',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary 버튼',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary 버튼',
  },
};

// Size Stories
export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small 버튼',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium 버튼',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large 버튼',
  },
};

// Theme Stories
export const LightTheme: Story = {
  args: {
    theme: 'light',
    children: 'Light 테마',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    children: 'Dark 테마',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// State Stories
export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성화 버튼',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: '전체 너비 버튼',
  },
  parameters: {
    layout: 'padded',
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
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
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
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
          <Button variant="primary" theme="light">Primary</Button>
          <Button variant="secondary" theme="light">Secondary</Button>
          <Button variant="tertiary" theme="light">Tertiary</Button>
        </div>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h4>
        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
          <Button variant="primary" theme="dark">Primary</Button>
          <Button variant="secondary" theme="dark">Secondary</Button>
          <Button variant="tertiary" theme="dark">Tertiary</Button>
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

// Disabled States
export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary" disabled>Primary Disabled</Button>
      <Button variant="secondary" disabled>Secondary Disabled</Button>
      <Button variant="tertiary" disabled>Tertiary Disabled</Button>
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

// Interactive Example
export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button onClick={() => alert('Primary 버튼 클릭!')}>
        클릭해보세요
      </Button>
      <Button variant="secondary" onClick={() => alert('Secondary 버튼 클릭!')}>
        Secondary 클릭
      </Button>
      <Button variant="tertiary" onClick={() => alert('Tertiary 버튼 클릭!')}>
        Tertiary 클릭
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제로 클릭해볼 수 있는 인터랙티브 예제입니다.',
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
                  {sizes.map((size) => (
                    <Button
                      key={`${variant}-${size}-${theme}`}
                      variant={variant}
                      size={size}
                      theme={theme}
                    >
                      {size}
                    </Button>
                  ))}
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
