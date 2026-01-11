# PRD – AI 기반 할 일 관리 서비스

## 1. 개요 (Overview)
본 문서는 **AI 기반 할 일(To‑Do) 관리 서비스**의 제품 요구사항 정의서(PRD)이다.  
Supabase Auth를 활용한 사용자 인증, 기본 할 일 관리 기능, 검색/필터/정렬,  
AI 기반 할 일 생성 및 요약·분석 기능을 제공하는 것을 목표로 한다.

본 PRD는 **실제 개발에 즉시 활용 가능**하도록 기능 정의, 화면 구성, 기술 스택, 데이터 구조를 포함한다.

---

## 2. 목표 (Goals)
- 개인 사용자가 할 일을 체계적으로 관리할 수 있도록 지원
- 자연어 입력만으로 할 일을 자동 구조화하여 생산성 향상
- AI 요약 기능을 통해 하루/주간 업무 흐름을 한눈에 파악

---

## 3. 주요 기능 (Core Features)

### 3.1 사용자 인증 (Authentication)
- 이메일/비밀번호 기반 로그인 및 회원가입
- Supabase Auth 사용
- 기능
  - 회원가입
  - 로그인 / 로그아웃
  - 세션 유지
  - 비밀번호 재설정

---

### 3.2 할 일 관리 (Todo CRUD)

#### 3.2.1 기능
- 할 일 생성(Create)
- 할 일 조회(Read)
- 할 일 수정(Update)
- 할 일 삭제(Delete)

#### 3.2.2 할 일 필드 정의
| 필드명 | 타입 | 설명 |
|------|------|------|
| id | uuid | 할 일 고유 ID |
| user_id | uuid | 사용자 ID (users 테이블 FK) |
| title | text | 할 일 제목 |
| description | text | 할 일 설명 |
| created_date | timestamp | 생성일 |
| due_date | timestamp | 마감일 |
| priority | enum | 우선순위 (high / medium / low) |
| category | text[] | 카테고리 (업무, 개인, 학습 등) |
| completed | boolean | 완료 여부 |
| updated_at | timestamp | 수정일 |

---

### 3.3 검색, 필터, 정렬

#### 3.3.1 검색
- 제목(title), 설명(description) 기준 검색
- 부분 일치 검색 지원

#### 3.3.2 필터
- 우선순위: 높음 / 중간 / 낮음
- 카테고리: 업무 / 개인 / 학습 등
- 진행 상태:
  - 진행 중 (completed = false && due_date >= now)
  - 완료 (completed = true)
  - 지연 (completed = false && due_date < now)

#### 3.3.3 정렬
- 우선순위순
- 마감일순
- 생성일순

---

### 3.4 AI 할 일 생성 기능

#### 3.4.1 기능 설명
- 사용자가 자연어로 입력한 문장을 AI가 분석
- 구조화된 할 일 데이터(JSON)로 변환

#### 3.4.2 입력 예시
```
내일 오전 10시에 팀 회의 준비
```

#### 3.4.3 변환 결과 예시
```json
{
  "title": "팀 회의 준비",
  "description": "내일 오전 10시에 있을 팀 회의를 위해 자료 작성하기",
  "created_date": "YYYY-MM-DDT10:00:00",
  "due_date": "YYYY-MM-DDT10:00:00",
  "priority": "high",
  "category": ["업무"],
  "completed": false
}
```

#### 3.4.4 처리 흐름
1. 사용자 자연어 입력
2. Gemini API 호출
3. JSON Schema 기반 응답 파싱
4. 사용자 확인 후 저장

---

### 3.5 AI 요약 및 분석 기능

#### 3.5.1 일일 요약
- 오늘 완료한 할 일 목록
- 오늘 남은 할 일 요약

#### 3.5.2 주간 요약
- 이번 주 전체 할 일 수
- 완료율 (%)
- 카테고리별 분포
- 가장 많이 설정된 우선순위 분석

---

## 4. 화면 구성 (UI / Screens)

### 4.1 로그인 / 회원가입 화면
- 이메일 입력
- 비밀번호 입력
- 로그인 / 회원가입 버튼
- 비밀번호 재설정

---

### 4.2 할 일 관리 메인 화면
- 상단
  - 검색 바
  - 필터 / 정렬 옵션
- 본문
  - 할 일 리스트
  - 완료 체크박스
  - 수정 / 삭제 버튼
- 하단 또는 모달
  - 할 일 추가 폼
  - AI 할 일 생성 입력창
- AI 요약 버튼
  - 일일 요약
  - 주간 요약

---

### 4.3 확장 화면 (향후)
- 통계 및 분석 대시보드
  - 주간 활동량 그래프
  - 완료율 차트
  - 카테고리별 분포 시각화

---

## 5. 기술 스택 (Tech Stack)

### 5.1 Frontend
- Next.js (App Router)
- Tailwind CSS
- shadcn/ui

### 5.2 Backend / BaaS
- Supabase
  - Auth
  - Database (PostgreSQL)
  - Row Level Security (RLS)

### 5.3 AI
- Google Gemini API
- AI SDK (Prompt + JSON Schema 기반 응답)

---

## 6. 데이터 구조 (Supabase)

### 6.1 users (Supabase Auth 연동)
- Supabase 기본 users 테이블 사용
- 주요 필드
  - id (uuid)
  - email
  - created_at

---

### 6.2 todos
```sql
create table todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text,
  created_date timestamp default now(),
  due_date timestamp,
  priority text check (priority in ('high', 'medium', 'low')),
  category text[],
  completed boolean default false,
  updated_at timestamp default now()
);
```

---

## 7. 보안 및 권한
- Row Level Security(RLS) 적용
- 사용자는 자신의 할 일만 조회/수정/삭제 가능

---

## 8. 성공 지표 (Success Metrics)
- 일일 활성 사용자(DAU)
- 할 일 생성 대비 완료율
- AI 할 일 생성 사용 비율
- AI 요약 기능 사용 빈도

---

## 9. 향후 확장 아이디어
- 알림 (마감일 푸시)
- 팀/공유 할 일
- 캘린더 연동
- 모바일 앱 확장

---