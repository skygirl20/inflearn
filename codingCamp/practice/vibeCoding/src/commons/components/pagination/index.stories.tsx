import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './index';

const meta: Meta<typeof Pagination> = {
  title: 'Commons/Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Figma 디자인 시스템 기반의 페이지네이션 컴포넌트입니다.

## Features
- **현재 페이지 표시**: 활성 페이지를 시각적으로 강조
- **이전/다음 버튼**: 페이지 간 탐색을 위한 네비게이션 버튼
- **페이지 번호 표시**: 최대 5개 페이지 번호를 동적으로 표시
- **반응형 페이지 범위**: 현재 페이지 기준으로 적절한 페이지 범위 계산
- **접근성 지원**: ARIA 라벨 및 키보드 네비게이션 지원

## Figma Reference
- Node ID: 425:2243
        `,
      },
    },
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: '현재 페이지 번호 (1부터 시작)',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: '전체 페이지 수',
    },
    maxVisiblePages: {
      control: { type: 'number', min: 3, max: 10 },
      description: '한 번에 표시할 최대 페이지 수',
    },
    onPageChange: {
      action: 'page-changed',
      description: '페이지 변경 시 호출되는 함수',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스명',
    },
  },
  args: {
    currentPage: 1,
    totalPages: 10,
    maxVisiblePages: 5,
    onPageChange: (page: number) => console.log(`페이지 ${page}로 이동`),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

// 현재 페이지별 스토리
export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
  parameters: {
    docs: {
      description: {
        story: '첫 번째 페이지에 있을 때의 상태입니다. 이전 버튼이 비활성화됩니다.',
      },
    },
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
  parameters: {
    docs: {
      description: {
        story: '중간 페이지에 있을 때의 상태입니다. 양쪽 네비게이션 버튼이 모두 활성화됩니다.',
      },
    },
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
  parameters: {
    docs: {
      description: {
        story: '마지막 페이지에 있을 때의 상태입니다. 다음 버튼이 비활성화됩니다.',
      },
    },
  },
};

// 페이지 수별 스토리
export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
  parameters: {
    docs: {
      description: {
        story: '페이지가 1개뿐일 때의 상태입니다. 네비게이션 버튼 없이 페이지 번호만 표시됩니다.',
      },
    },
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
  },
  parameters: {
    docs: {
      description: {
        story: '전체 페이지 수가 적을 때의 상태입니다. 모든 페이지 번호가 표시됩니다.',
      },
    },
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
  },
  parameters: {
    docs: {
      description: {
        story: '전체 페이지 수가 많을 때의 상태입니다. 현재 페이지 주변의 페이지들만 표시됩니다.',
      },
    },
  },
};

// maxVisiblePages 설정별 스토리
export const ThreeVisiblePages: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    maxVisiblePages: 3,
  },
  parameters: {
    docs: {
      description: {
        story: '최대 3개 페이지만 표시하는 설정입니다.',
      },
    },
  },
};

export const SevenVisiblePages: Story = {
  args: {
    currentPage: 10,
    totalPages: 30,
    maxVisiblePages: 7,
  },
  parameters: {
    docs: {
      description: {
        story: '최대 7개 페이지를 표시하는 설정입니다.',
      },
    },
  },
};

// 인터랙티브 예제
export const Interactive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = 15;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <div style={{ 
          fontSize: '14px', 
          color: '#666',
          textAlign: 'center'
        }}>
          현재 페이지: {currentPage} / {totalPages}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제로 페이지를 변경해볼 수 있는 인터랙티브 예제입니다.',
      },
    },
  },
};

// 다양한 시나리오 쇼케이스
export const AllScenarios: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gap: '32px', 
      padding: '20px',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#333' }}>첫 페이지</h4>
        <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#333' }}>중간 페이지</h4>
        <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#333' }}>마지막 페이지</h4>
        <Pagination currentPage={10} totalPages={10} onPageChange={() => {}} />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#333' }}>단일 페이지</h4>
        <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#333' }}>적은 페이지</h4>
        <Pagination currentPage={2} totalPages={3} onPageChange={() => {}} />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#333' }}>많은 페이지</h4>
        <Pagination currentPage={25} totalPages={100} onPageChange={() => {}} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '다양한 시나리오에서의 페이지네이션 동작을 한 번에 확인할 수 있습니다.',
      },
    },
  },
};

// 페이지 범위 테스트
export const PageRangeTest: Story = {
  render: () => {
    const scenarios = [
      { current: 1, total: 20, desc: '시작 부근' },
      { current: 3, total: 20, desc: '시작에서 조금 이동' },
      { current: 10, total: 20, desc: '중간' },
      { current: 18, total: 20, desc: '끝에서 조금 이전' },
      { current: 20, total: 20, desc: '끝' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
        {scenarios.map((scenario, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#333' }}>
              {scenario.desc} (페이지 {scenario.current}/{scenario.total})
            </h4>
            <Pagination 
              currentPage={scenario.current} 
              totalPages={scenario.total} 
              onPageChange={() => {}} 
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '페이지 범위 계산 로직을 다양한 시나리오로 테스트할 수 있습니다.',
      },
    },
  },
};

// 커스텀 maxVisiblePages 비교
export const MaxVisiblePagesComparison: Story = {
  render: () => {
    const maxVisibleOptions = [3, 5, 7];
    const currentPage = 10;
    const totalPages = 30;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
        {maxVisibleOptions.map((maxVisible) => (
          <div key={maxVisible} style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#333' }}>
              최대 {maxVisible}개 페이지 표시
            </h4>
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              maxVisiblePages={maxVisible}
              onPageChange={() => {}} 
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'maxVisiblePages 설정에 따른 페이지네이션 표시 방식을 비교할 수 있습니다.',
      },
    },
  },
};

// 실제 사용 예제 (테이블과 함께)
export const WithTableExample: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = 8;
    const itemsPerPage = 5;
    
    // 가상의 데이터
    const allItems = Array.from({ length: totalPages * itemsPerPage }, (_, i) => ({
      id: i + 1,
      name: `항목 ${i + 1}`,
      description: `항목 ${i + 1}에 대한 설명입니다.`,
    }));
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = allItems.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px',
        width: '500px',
        padding: '20px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px'
      }}>
        <h3 style={{ margin: '0', color: '#333' }}>데이터 목록</h3>
        
        <div style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '60px 1fr 2fr',
            backgroundColor: '#f5f5f5',
            padding: '12px',
            fontWeight: '600',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <div>ID</div>
            <div>이름</div>
            <div>설명</div>
          </div>
          
          {currentItems.map((item) => (
            <div 
              key={item.id}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '60px 1fr 2fr',
                padding: '12px',
                borderBottom: '1px solid #f0f0f0'
              }}
            >
              <div>{item.id}</div>
              <div>{item.name}</div>
              <div style={{ color: '#666' }}>{item.description}</div>
            </div>
          ))}
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          fontSize: '14px',
          color: '#666'
        }}>
          <div>
            총 {allItems.length}개 항목 중 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, allItems.length)}번째
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '실제 테이블 데이터와 함께 사용되는 페이지네이션의 예제입니다.',
      },
    },
  },
};
