import type { Meta, StoryObj } from '@storybook/react';
import SelectBox from './index';

const meta: Meta<typeof SelectBox> = {
  title: 'Commons/Components/SelectBox',
  component: SelectBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Figma 디자인 시스템 기반의 셀렉트박스 컴포넌트입니다.

## Features
- **Variant**: primary(기본), secondary(보조), tertiary(3차)
- **Size**: small, medium, large
- **Theme**: light, dark 모드 지원
- **Disabled**: 비활성화 상태 지원
- **Keyboard Navigation**: ESC 키로 닫기, 외부 클릭으로 닫기
- **Accessibility**: ARIA 속성 지원

## Usage
\`\`\`tsx
const options = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
];

<SelectBox 
  options={options}
  placeholder="선택하세요"
  onChange={(value) => console.log(value)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '셀렉트박스의 스타일 variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '셀렉트박스의 크기',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '테마 모드',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
    value: {
      control: { type: 'text' },
      description: '선택된 값 (제어 모드)',
    },
    defaultValue: {
      control: { type: 'text' },
      description: '기본 선택 값 (비제어 모드)',
    },
  },
  args: {
    options: [
      { value: 'apple', label: '사과' },
      { value: 'banana', label: '바나나' },
      { value: 'orange', label: '오렌지' },
      { value: 'grape', label: '포도' },
    ],
    placeholder: '과일을 선택하세요',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    placeholder: '기본 셀렉트박스',
  },
};

// Variant Stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    placeholder: 'Primary 셀렉트박스',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    placeholder: 'Secondary 셀렉트박스',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    placeholder: 'Tertiary 셀렉트박스',
  },
};

// Size Stories
export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small 셀렉트박스',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    placeholder: 'Medium 셀렉트박스',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large 셀렉트박스',
  },
};

// Theme Stories
export const LightTheme: Story = {
  args: {
    theme: 'light',
    placeholder: 'Light 테마',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    placeholder: 'Dark 테마',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// State Stories
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화 셀렉트박스',
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'banana',
    placeholder: '기본값이 있는 셀렉트박스',
  },
  parameters: {
    docs: {
      description: {
        story: '기본값으로 "바나나"가 선택된 상태입니다.',
      },
    },
  },
};

export const WithCustomOptions: Story = {
  args: {
    options: [
      { value: 'seoul', label: '서울특별시' },
      { value: 'busan', label: '부산광역시' },
      { value: 'daegu', label: '대구광역시' },
      { value: 'incheon', label: '인천광역시' },
      { value: 'gwangju', label: '광주광역시' },
      { value: 'daejeon', label: '대전광역시' },
      { value: 'ulsan', label: '울산광역시' },
    ],
    placeholder: '지역을 선택하세요',
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 지역 옵션을 가진 셀렉트박스 예제입니다.',
      },
    },
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <SelectBox
        variant="primary"
        options={[
          { value: '1', label: '옵션 1' },
          { value: '2', label: '옵션 2' },
        ]}
        placeholder="Primary"
      />
      <SelectBox
        variant="secondary"
        options={[
          { value: '1', label: '옵션 1' },
          { value: '2', label: '옵션 2' },
        ]}
        placeholder="Secondary"
      />
      <SelectBox
        variant="tertiary"
        options={[
          { value: '1', label: '옵션 1' },
          { value: '2', label: '옵션 2' },
        ]}
        placeholder="Tertiary"
      />
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
      <SelectBox
        size="small"
        options={[
          { value: '1', label: '옵션 1' },
          { value: '2', label: '옵션 2' },
        ]}
        placeholder="Small"
      />
      <SelectBox
        size="medium"
        options={[
          { value: '1', label: '옵션 1' },
          { value: '2', label: '옵션 2' },
        ]}
        placeholder="Medium"
      />
      <SelectBox
        size="large"
        options={[
          { value: '1', label: '옵션 1' },
          { value: '2', label: '옵션 2' },
        ]}
        placeholder="Large"
      />
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
          <SelectBox
            variant="primary"
            theme="light"
            options={[
              { value: '1', label: '옵션 1' },
              { value: '2', label: '옵션 2' },
            ]}
            placeholder="Primary"
          />
          <SelectBox
            variant="secondary"
            theme="light"
            options={[
              { value: '1', label: '옵션 1' },
              { value: '2', label: '옵션 2' },
            ]}
            placeholder="Secondary"
          />
          <SelectBox
            variant="tertiary"
            theme="light"
            options={[
              { value: '1', label: '옵션 1' },
              { value: '2', label: '옵션 2' },
            ]}
            placeholder="Tertiary"
          />
        </div>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h4>
        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
          <SelectBox
            variant="primary"
            theme="dark"
            options={[
              { value: '1', label: '옵션 1' },
              { value: '2', label: '옵션 2' },
            ]}
            placeholder="Primary"
          />
          <SelectBox
            variant="secondary"
            theme="dark"
            options={[
              { value: '1', label: '옵션 1' },
              { value: '2', label: '옵션 2' },
            ]}
            placeholder="Secondary"
          />
          <SelectBox
            variant="tertiary"
            theme="dark"
            options={[
              { value: '1', label: '옵션 1' },
              { value: '2', label: '옵션 2' },
            ]}
            placeholder="Tertiary"
          />
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
      <SelectBox
        variant="primary"
        disabled
        options={[
          { value: '1', label: '옵션 1' },
          { value: '2', label: '옵션 2' },
        ]}
        placeholder="Primary Disabled"
      />
      <SelectBox
        variant="secondary"
        disabled
        options={[
          { value: '1', label: '옵션 1' },
          { value: '2', label: '옵션 2' },
        ]}
        placeholder="Secondary Disabled"
      />
      <SelectBox
        variant="tertiary"
        disabled
        options={[
          { value: '1', label: '옵션 1' },
          { value: '2', label: '옵션 2' },
        ]}
        placeholder="Tertiary Disabled"
      />
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
  render: () => {
    const handleChange = (value: string) => {
      alert(`선택된 값: ${value}`);
    };

    return (
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <SelectBox
          options={[
            { value: 'coffee', label: '커피' },
            { value: 'tea', label: '차' },
            { value: 'juice', label: '주스' },
          ]}
          placeholder="음료를 선택하세요"
          onChange={handleChange}
        />
        <SelectBox
          variant="secondary"
          options={[
            { value: 'red', label: '빨강' },
            { value: 'blue', label: '파랑' },
            { value: 'green', label: '초록' },
          ]}
          placeholder="색상을 선택하세요"
          onChange={handleChange}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제로 선택해볼 수 있는 인터랙티브 예제입니다. 옵션을 선택하면 알림이 표시됩니다.',
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

    const sampleOptions = [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' },
    ];

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
                    <SelectBox
                      key={`${variant}-${size}-${theme}`}
                      variant={variant}
                      size={size}
                      theme={theme}
                      options={sampleOptions}
                      placeholder={size}
                    />
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

// Long Options List
export const LongOptionsList: Story = {
  args: {
    options: [
      { value: 'afghanistan', label: '아프가니스탄' },
      { value: 'albania', label: '알바니아' },
      { value: 'algeria', label: '알제리' },
      { value: 'argentina', label: '아르헨티나' },
      { value: 'australia', label: '호주' },
      { value: 'austria', label: '오스트리아' },
      { value: 'bangladesh', label: '방글라데시' },
      { value: 'belgium', label: '벨기에' },
      { value: 'brazil', label: '브라질' },
      { value: 'canada', label: '캐나다' },
      { value: 'china', label: '중국' },
      { value: 'france', label: '프랑스' },
      { value: 'germany', label: '독일' },
      { value: 'india', label: '인도' },
      { value: 'japan', label: '일본' },
      { value: 'korea', label: '대한민국' },
      { value: 'usa', label: '미국' },
    ],
    placeholder: '국가를 선택하세요',
  },
  parameters: {
    docs: {
      description: {
        story: '많은 옵션을 가진 셀렉트박스의 스크롤 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// Empty Options
export const EmptyOptions: Story = {
  args: {
    options: [],
    placeholder: '옵션이 없습니다',
  },
  parameters: {
    docs: {
      description: {
        story: '옵션이 없는 경우의 셀렉트박스 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// Long Text Options (width 조정 테스트)
export const LongTextOptions: Story = {
  args: {
    options: [
      { value: 'very-long-option-1', label: '매우 긴 텍스트를 가진 첫 번째 옵션입니다' },
      { value: 'very-long-option-2', label: '이것은 두 번째로 긴 텍스트 옵션입니다' },
      { value: 'very-long-option-3', label: '세 번째 옵션도 상당히 긴 텍스트를 가지고 있습니다' },
      { value: 'short', label: '짧은 옵션' },
    ],
    placeholder: '긴 텍스트가 잘리지 않는지 확인하세요',
    defaultValue: 'very-long-option-1',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 잘리지 않고 전체 표시되는지 확인할 수 있습니다. width가 자동으로 조정됩니다.',
      },
    },
  },
};

// Size Comparison with Long Text
export const SizeComparisonWithLongText: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Small</h4>
        <SelectBox
          size="small"
          options={[
            { value: '1', label: '긴 텍스트 옵션 1번' },
            { value: '2', label: '긴 텍스트 옵션 2번' },
          ]}
          placeholder="Small 사이즈 긴 텍스트"
          defaultValue="1"
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Medium</h4>
        <SelectBox
          size="medium"
          options={[
            { value: '1', label: '긴 텍스트 옵션 1번' },
            { value: '2', label: '긴 텍스트 옵션 2번' },
          ]}
          placeholder="Medium 사이즈 긴 텍스트"
          defaultValue="1"
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Large</h4>
        <SelectBox
          size="large"
          options={[
            { value: '1', label: '긴 텍스트 옵션 1번' },
            { value: '2', label: '긴 텍스트 옵션 2번' },
          ]}
          placeholder="Large 사이즈 긴 텍스트"
          defaultValue="1"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '각 사이즈별로 긴 텍스트가 어떻게 표시되는지 비교할 수 있습니다.',
      },
    },
  },
};