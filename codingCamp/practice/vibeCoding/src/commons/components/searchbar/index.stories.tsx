import type { Meta, StoryObj } from '@storybook/react';
import { Searchbar } from './index';

const meta: Meta<typeof Searchbar> = {
  title: 'Commons/Components/Searchbar',
  component: Searchbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Figma 디자인 시스템 기반의 검색바 컴포넌트입니다.

## Features
- **Variant**: primary(기본), secondary(보조), tertiary(텍스트)
- **Size**: small, medium, large
- **Theme**: light, dark 모드 지원
- **Full Width**: 전체 너비 사용 옵션
- **Error State**: 에러 상태 및 메시지 지원
- **Search Icon**: 검색 아이콘 표시 옵션
- **Label & Helper Text**: 라벨 및 도움말 텍스트 지원

## Figma Reference
- Node ID: 3:1566
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '검색바의 스타일 variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '검색바의 크기',
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
    errorMessage: {
      control: { type: 'text' },
      description: '에러 메시지',
    },
    helperText: {
      control: { type: 'text' },
      description: '도움말 텍스트',
    },
    label: {
      control: { type: 'text' },
      description: '라벨 텍스트',
    },
    required: {
      control: { type: 'boolean' },
      description: '필수 입력 여부',
    },
    showSearchIcon: {
      control: { type: 'boolean' },
      description: '검색 아이콘 표시 여부',
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    fullWidth: false,
    disabled: false,
    error: false,
    required: false,
    showSearchIcon: true,
    placeholder: '검색어를 입력해 주세요.',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    placeholder: '기본 검색바',
  },
};

// Variant Stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    placeholder: 'Primary 검색바',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    placeholder: 'Secondary 검색바',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    placeholder: 'Tertiary 검색바',
  },
};

// Size Stories
export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small 검색바',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    placeholder: 'Medium 검색바',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large 검색바',
  },
};

// Theme Stories
export const LightTheme: Story = {
  args: {
    theme: 'light',
    placeholder: 'Light 테마 검색바',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    placeholder: 'Dark 테마 검색바',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// State Stories
export const WithLabel: Story = {
  args: {
    label: '검색',
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const Required: Story = {
  args: {
    label: '검색',
    required: true,
    placeholder: '필수 검색 필드',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '검색',
    helperText: '최소 2글자 이상 입력해 주세요.',
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const ErrorState: Story = {
  args: {
    label: '검색',
    error: true,
    errorMessage: '검색어를 입력해 주세요.',
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화된 검색바',
  },
};

export const WithoutSearchIcon: Story = {
  args: {
    showSearchIcon: false,
    placeholder: '검색 아이콘 없는 검색바',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: '전체 너비 검색바',
  },
  parameters: {
    layout: 'padded',
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '400px' }}>
      <Searchbar variant="primary" placeholder="Primary 검색바" />
      <Searchbar variant="secondary" placeholder="Secondary 검색바" />
      <Searchbar variant="tertiary" placeholder="Tertiary 검색바" />
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <Searchbar size="small" placeholder="Small 검색바" />
      <Searchbar size="medium" placeholder="Medium 검색바" />
      <Searchbar size="large" placeholder="Large 검색바" />
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
          <Searchbar variant="primary" theme="light" placeholder="Primary" />
          <Searchbar variant="secondary" theme="light" placeholder="Secondary" />
          <Searchbar variant="tertiary" theme="light" placeholder="Tertiary" />
        </div>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h4>
        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
          <Searchbar variant="primary" theme="dark" placeholder="Primary" />
          <Searchbar variant="secondary" theme="dark" placeholder="Secondary" />
          <Searchbar variant="tertiary" theme="dark" placeholder="Tertiary" />
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

// State Variations
export const StateVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '400px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>기본 상태</h4>
        <Searchbar placeholder="기본 검색바" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>라벨 포함</h4>
        <Searchbar label="검색" placeholder="라벨이 있는 검색바" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>필수 필드</h4>
        <Searchbar label="검색" required placeholder="필수 검색 필드" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>도움말 텍스트</h4>
        <Searchbar 
          label="검색" 
          helperText="최소 2글자 이상 입력해 주세요." 
          placeholder="도움말이 있는 검색바" 
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>에러 상태</h4>
        <Searchbar 
          label="검색" 
          error 
          errorMessage="검색어를 입력해 주세요." 
          placeholder="에러 상태 검색바" 
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>비활성화</h4>
        <Searchbar disabled placeholder="비활성화된 검색바" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 상태의 검색바를 확인할 수 있습니다.',
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '400px' }}>
      <Searchbar 
        placeholder="검색해보세요" 
        onSearchClick={() => alert('검색 아이콘 클릭!')}
        onChange={(e) => console.log('입력값:', e.target.value)}
      />
      <Searchbar 
        variant="secondary"
        placeholder="Secondary 검색바" 
        onSearchClick={() => alert('Secondary 검색 클릭!')}
      />
      <Searchbar 
        variant="tertiary"
        placeholder="Tertiary 검색바" 
        onSearchClick={() => alert('Tertiary 검색 클릭!')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제로 입력하고 검색 아이콘을 클릭해볼 수 있는 인터랙티브 예제입니다.',
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
                <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ 
                    color: theme === 'light' ? '#666' : '#ccc',
                    fontSize: '14px',
                    textTransform: 'capitalize',
                    fontWeight: '500'
                  }}>
                    {variant}:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sizes.map((size) => (
                      <Searchbar
                        key={`${variant}-${size}-${theme}`}
                        variant={variant}
                        size={size}
                        theme={theme}
                        placeholder={`${size} 검색바`}
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
