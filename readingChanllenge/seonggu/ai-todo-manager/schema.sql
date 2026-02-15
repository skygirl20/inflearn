-- ============================================
-- AI 할 일 관리 서비스 - Supabase 스키마
-- ============================================

-- ============================================
-- 1. 사용자 프로필 테이블 (public.users)
-- ============================================
-- auth.users와 1:1로 연결되는 사용자 프로필 테이블
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  name text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 사용자 프로필 테이블에 대한 인덱스
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- ============================================
-- 2. 할 일 테이블 (public.todos)
-- ============================================
CREATE TABLE IF NOT EXISTS public.todos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  created_date timestamp with time zone DEFAULT now(),
  due_date timestamp with time zone,
  priority text NOT NULL CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  category text[] DEFAULT '{}',
  completed boolean DEFAULT false,
  updated_at timestamp with time zone DEFAULT now()
);

-- 할 일 테이블에 대한 인덱스
CREATE INDEX IF NOT EXISTS idx_todos_user_id ON public.todos(user_id);
CREATE INDEX IF NOT EXISTS idx_todos_completed ON public.todos(completed);
CREATE INDEX IF NOT EXISTS idx_todos_due_date ON public.todos(due_date);
CREATE INDEX IF NOT EXISTS idx_todos_priority ON public.todos(priority);
CREATE INDEX IF NOT EXISTS idx_todos_created_date ON public.todos(created_date);

-- ============================================
-- 3. Row Level Security (RLS) 활성화
-- ============================================

-- users 테이블 RLS 활성화
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- todos 테이블 RLS 활성화
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. RLS 정책 - users 테이블
-- ============================================

-- 사용자는 자신의 프로필만 조회 가능
CREATE POLICY "Users can view own profile"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- 사용자는 자신의 프로필만 수정 가능
CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- 사용자는 자신의 프로필만 삽입 가능
CREATE POLICY "Users can insert own profile"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- 5. RLS 정책 - todos 테이블
-- ============================================

-- 사용자는 자신의 할 일만 조회 가능
CREATE POLICY "Users can view own todos"
  ON public.todos
  FOR SELECT
  USING (auth.uid() = user_id);

-- 사용자는 자신의 할 일만 삽입 가능
CREATE POLICY "Users can insert own todos"
  ON public.todos
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 사용자는 자신의 할 일만 수정 가능
CREATE POLICY "Users can update own todos"
  ON public.todos
  FOR UPDATE
  USING (auth.uid() = user_id);

-- 사용자는 자신의 할 일만 삭제 가능
CREATE POLICY "Users can delete own todos"
  ON public.todos
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 6. 트리거 함수 - updated_at 자동 업데이트
-- ============================================

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- todos 테이블에 updated_at 트리거 적용
CREATE TRIGGER set_updated_at_todos
  BEFORE UPDATE ON public.todos
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- users 테이블에 updated_at 트리거 적용
CREATE TRIGGER set_updated_at_users
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- 7. 트리거 함수 - 새 사용자 가입 시 프로필 자동 생성
-- ============================================

-- 새 사용자 가입 시 public.users에 프로필 자동 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- auth.users에 INSERT 트리거 적용
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 8. 완료
-- ============================================
-- 스키마 생성이 완료되었습니다.
-- Supabase 대시보드의 SQL Editor에서 이 스크립트를 실행하세요.
