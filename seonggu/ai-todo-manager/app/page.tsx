"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckSquare2,
  Search,
  LogOut,
  User,
  Filter,
  ArrowUpDown,
} from "lucide-react";

import { Todo, TodoFormData, Priority } from "@/types/todo.types";
import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import AIAnalysis from "@/components/todo/AIAnalysis";


/**
 * 메인 페이지 컴포넌트
 * 할 일 관리의 메인 화면을 구성합니다.
 */
const HomePageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [priorityFilter, setPriorityFilter] = React.useState<string>("all");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<string>("created_date");
  const [editingTodo, setEditingTodo] = React.useState<Todo | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isLoadingTodos, setIsLoadingTodos] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // 사용자 정보 상태
  const [currentUser, setCurrentUser] = React.useState<{
    email: string;
    name: string;
    id: string;
  } | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

  // 사용자 정보 로드 및 인증 상태 감지
  React.useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    // 초기 사용자 정보 로드
    const loadUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (!isMounted) return;

        // 사용자가 없으면 로그인 페이지로 리다이렉트
        if (error || !user) {
          setIsCheckingAuth(false);
          router.replace("/login");
          return;
        }

        // 사용자 프로필 정보 가져오기
        try {
          const { data: profile } = await supabase
            .from("users")
            .select("name, email")
            .eq("id", user.id)
            .single();

          if (isMounted) {
            setCurrentUser({
              id: user.id,
              email: user.email || profile?.email || "",
              name: profile?.name || user.user_metadata?.name || user.email?.split("@")[0] || "사용자",
            });
          }
        } catch (profileError) {
          // 프로필이 없어도 기본 정보로 설정
          if (isMounted) {
            setCurrentUser({
              id: user.id,
              email: user.email || "",
              name: user.user_metadata?.name || user.email?.split("@")[0] || "사용자",
            });
          }
        }

        // 로딩 완료
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      } catch (err) {
        console.error("사용자 정보 로드 오류:", err);
        if (isMounted) {
          setIsCheckingAuth(false);
          router.replace("/login");
        }
      }
    };

    loadUser();

    // 인증 상태 변화 감지 (로그아웃 처리만)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;

      // 로그아웃 시에만 처리
      if (event === "SIGNED_OUT" || (event !== "INITIAL_SESSION" && !session)) {
        setCurrentUser(null);
        router.replace("/login");
      }
    });

    // cleanup
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  // 할 일 목록 로드
  const loadTodos = React.useCallback(async () => {
    if (!currentUser?.id) return;

    setIsLoadingTodos(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_date", { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setTodos(data || []);
    } catch (err) {
      console.error("할 일 목록 로드 오류:", err);
      setError(
        err instanceof Error
          ? err.message
          : "할 일 목록을 불러오는 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoadingTodos(false);
    }
  }, [currentUser?.id]);

  // 사용자 정보가 로드되면 할 일 목록도 로드
  React.useEffect(() => {
    if (currentUser?.id && !isCheckingAuth) {
      loadTodos();
    }
  }, [currentUser?.id, isCheckingAuth, loadTodos]);

  // 이메일 확인 오류 처리
  React.useEffect(() => {
    const error = searchParams.get("error");
    const errorCode = searchParams.get("error_code");
    const errorDescription = searchParams.get("error_description");

    if (error || errorCode) {
      // 이메일 확인 오류가 있는 경우 로그인 페이지로 리다이렉트
      const loginUrl = new URL("/login", window.location.origin);
      
      if (errorCode === "otp_expired") {
        loginUrl.searchParams.set("error", "이메일 확인 링크가 만료되었습니다. 다시 회원가입해주세요.");
      } else if (errorDescription) {
        loginUrl.searchParams.set("error", decodeURIComponent(errorDescription));
      } else {
        loginUrl.searchParams.set("error", "이메일 확인 중 오류가 발생했습니다.");
      }
      
      router.replace(loginUrl.toString());
    }
  }, [searchParams, router]);

  // 고유한 카테고리 목록 추출
  const uniqueCategories = React.useMemo(() => {
    const categories = new Set<string>();
    todos.forEach((todo) => {
      if (todo.category && todo.category.length > 0) {
        todo.category.forEach((cat) => categories.add(cat));
      }
    });
    return Array.from(categories).sort();
  }, [todos]);

  // 검색, 필터, 정렬 적용된 할 일 목록
  const filteredAndSortedTodos = React.useMemo(() => {
    let filtered = [...todos];

    // 검색 필터 (제목만 검색)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((todo) =>
        todo.title.toLowerCase().includes(query)
      );
    }

    // 상태 필터
    if (statusFilter !== "all") {
      const now = new Date();
      filtered = filtered.filter((todo) => {
        switch (statusFilter) {
          case "in_progress":
            return !todo.completed && (!todo.due_date || new Date(todo.due_date) >= now);
          case "completed":
            return todo.completed;
          case "overdue":
            return !todo.completed && todo.due_date && new Date(todo.due_date) < now;
          default:
            return true;
        }
      });
    }

    // 우선순위 필터
    if (priorityFilter !== "all") {
      filtered = filtered.filter((todo) => todo.priority === priorityFilter);
    }

    // 카테고리 필터
    if (categoryFilter !== "all") {
      filtered = filtered.filter((todo) =>
        todo.category && todo.category.includes(categoryFilter)
      );
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "due_date":
          if (!a.due_date && !b.due_date) return 0;
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        case "title":
          return a.title.localeCompare(b.title, "ko");
        case "created_date":
        default:
          return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
      }
    });

    return filtered;
  }, [todos, searchQuery, statusFilter, priorityFilter, categoryFilter, sortBy]);

  // 할 일 추가 핸들러
  const handleAddTodo = async (data: TodoFormData) => {
    if (!currentUser?.id) {
      setError("사용자 정보를 불러올 수 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      const supabase = createClient();
      
      // due_date를 ISO 문자열로 변환 (datetime-local 형식에서 변환)
      // datetime-local은 로컬 시간대이므로 그대로 사용
      const dueDate = data.due_date ? new Date(data.due_date).toISOString() : null;

      const { data: newTodo, error: insertError } = await supabase
        .from("todos")
        .insert({
          user_id: currentUser.id,
          title: data.title.trim(),
          description: data.description?.trim() || null,
          due_date: dueDate,
          priority: data.priority,
          category: data.category,
          completed: false,
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      // 목록 다시 로드
      await loadTodos();
      setIsFormOpen(false);
      setEditingTodo(null);
      setError(null);
    } catch (err) {
      console.error("할 일 추가 오류:", err);
      setError(
        err instanceof Error
          ? err.message
          : "할 일을 추가하는 중 오류가 발생했습니다."
      );
    }
  };

  // 할 일 수정 핸들러
  const handleUpdateTodo = async (data: TodoFormData) => {
    if (!editingTodo || !currentUser?.id) {
      setError("수정할 할 일 정보를 불러올 수 없습니다.");
      return;
    }

    // 본인 소유 확인
    if (editingTodo.user_id !== currentUser.id) {
      setError("본인의 할 일만 수정할 수 있습니다.");
      return;
    }

    try {
      const supabase = createClient();
      
      // due_date를 ISO 문자열로 변환
      const dueDate = data.due_date ? new Date(data.due_date).toISOString() : null;

      const { error: updateError } = await supabase
        .from("todos")
        .update({
          title: data.title.trim(),
          description: data.description?.trim() || null,
          due_date: dueDate,
          priority: data.priority,
          category: data.category,
        })
        .eq("id", editingTodo.id)
        .eq("user_id", currentUser.id); // 본인 소유 확인

      if (updateError) {
        throw updateError;
      }

      // 목록 다시 로드
      await loadTodos();
      setIsFormOpen(false);
      setEditingTodo(null);
      setError(null);
    } catch (err) {
      console.error("할 일 수정 오류:", err);
      setError(
        err instanceof Error
          ? err.message
          : "할 일을 수정하는 중 오류가 발생했습니다."
      );
    }
  };

  // 할 일 삭제 핸들러
  const handleDeleteTodo = async (id: string) => {
    if (!currentUser?.id) {
      setError("사용자 정보를 불러올 수 없습니다.");
      return;
    }

    // 삭제할 할 일 찾기
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (!todoToDelete) {
      setError("삭제할 할 일을 찾을 수 없습니다.");
      return;
    }

    // 본인 소유 확인
    if (todoToDelete.user_id !== currentUser.id) {
      setError("본인의 할 일만 삭제할 수 있습니다.");
      return;
    }

    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const supabase = createClient();
      const { error: deleteError } = await supabase
        .from("todos")
        .delete()
        .eq("id", id)
        .eq("user_id", currentUser.id); // 본인 소유 확인

      if (deleteError) {
        throw deleteError;
      }

      // 목록 다시 로드
      await loadTodos();
      setError(null);
    } catch (err) {
      console.error("할 일 삭제 오류:", err);
      setError(
        err instanceof Error
          ? err.message
          : "할 일을 삭제하는 중 오류가 발생했습니다."
      );
    }
  };

  // 할 일 완료 토글 핸들러
  const handleToggleComplete = async (id: string, completed: boolean) => {
    if (!currentUser?.id) {
      setError("사용자 정보를 불러올 수 없습니다.");
      return;
    }

    // 토글할 할 일 찾기
    const todoToToggle = todos.find((todo) => todo.id === id);
    if (!todoToToggle) {
      setError("할 일을 찾을 수 없습니다.");
      return;
    }

    // 본인 소유 확인
    if (todoToToggle.user_id !== currentUser.id) {
      setError("본인의 할 일만 수정할 수 있습니다.");
      return;
    }

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("todos")
        .update({ completed })
        .eq("id", id)
        .eq("user_id", currentUser.id); // 본인 소유 확인

      if (updateError) {
        throw updateError;
      }

      // 목록 다시 로드
      await loadTodos();
      setError(null);
    } catch (err) {
      console.error("할 일 완료 상태 변경 오류:", err);
      setError(
        err instanceof Error
          ? err.message
          : "할 일 상태를 변경하는 중 오류가 발생했습니다."
      );
    }
  };

  // 할 일 수정 시작 핸들러
  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  // 폼 취소 핸들러
  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  // 다이얼로그 열림/닫힘 핸들러
  const handleDialogOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setEditingTodo(null);
    }
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      // 먼저 상태 초기화
      setCurrentUser(null);
      
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("로그아웃 오류:", error);
        alert("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.");
        return;
      }

      // 로그아웃 성공 시 로그인 페이지로 이동
      // onAuthStateChange의 SIGNED_OUT 이벤트도 리다이렉트하지만
      // 명시적으로 여기서도 리다이렉트 처리
      router.replace("/login");
    } catch (err) {
      console.error("로그아웃 오류:", err);
      alert("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 폼 제출 핸들러
  const handleFormSubmit = async (data: TodoFormData) => {
    if (editingTodo) {
      await handleUpdateTodo(data);
    } else {
      await handleAddTodo(data);
    }
  };

  // 인증 확인 중이면 아무것도 렌더링하지 않음
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">로딩 중...</div>
      </div>
    );
  }

  // 사용자가 없으면 아무것도 렌더링하지 않음 (리다이렉트 중)
  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="flex items-center justify-center size-8 sm:size-10 rounded bg-foreground text-background flex-shrink-0">
              <CheckSquare2 className="size-4 sm:size-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-bold truncate">AI Todo Manager</h1>
              <p className="hidden sm:block text-xs text-muted-foreground">스마트한 할 일 관리</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {isCheckingAuth ? (
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                사용자 정보 로딩 중...
              </div>
            ) : currentUser ? (
              <>
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  <User className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground truncate max-w-[100px] sm:max-w-[120px] lg:max-w-none">
                    {currentUser.name}
                  </span>
                  <span className="hidden lg:inline text-muted-foreground truncate max-w-[200px] xl:max-w-none">
                    ({currentUser.email})
                  </span>
                </div>
                <div className="sm:hidden flex items-center gap-1">
                  <User className="size-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground truncate max-w-[80px]">
                    {currentUser.name}
                  </span>
                </div>
                <Separator orientation="vertical" className="h-6 hidden sm:block" />
                <Button variant="ghost" size="sm" onClick={handleLogout} className="flex-shrink-0">
                  <LogOut className="size-4" />
                  <span className="sr-only">로그아웃</span>
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </header>

      {/* 툴바 */}
      <div className="border-b bg-muted/40">
        <div className="container px-4 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* 검색 */}
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="제목 또는 설명으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* 필터, 정렬 및 새 할 일 추가 버튼 */}
            <div className="flex flex-wrap items-center gap-2">
              {/* 상태 필터 */}
              <div className="flex items-center gap-2">
                <Filter className="size-4 text-muted-foreground flex-shrink-0" />
                <div className="flex flex-col">
                  <label className="text-xs text-muted-foreground mb-1">상태</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[120px] sm:w-[140px] text-xs sm:text-sm h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="in_progress">진행 중</SelectItem>
                      <SelectItem value="completed">완료</SelectItem>
                      <SelectItem value="overdue">지연</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 우선순위 필터 */}
              <div className="flex flex-col">
                <label className="text-xs text-muted-foreground mb-1">우선순위</label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[120px] sm:w-[140px] text-xs sm:text-sm h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="high">높음</SelectItem>
                    <SelectItem value="medium">보통</SelectItem>
                    <SelectItem value="low">낮음</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 카테고리 필터 */}
              {uniqueCategories.length > 0 && (
                <div className="flex flex-col">
                  <label className="text-xs text-muted-foreground mb-1">카테고리</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[120px] sm:w-[140px] text-xs sm:text-sm h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      {uniqueCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* 정렬 */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="size-4 text-muted-foreground flex-shrink-0" />
                <div className="flex flex-col">
                  <label className="text-xs text-muted-foreground mb-1">정렬</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[120px] sm:w-[140px] text-xs sm:text-sm h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created_date">생성일순</SelectItem>
                      <SelectItem value="due_date">마감일순</SelectItem>
                      <SelectItem value="priority">우선순위순</SelectItem>
                      <SelectItem value="title">제목순</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 새 할 일 추가 버튼 */}
              {!isFormOpen ? (
                <Button
                  onClick={() => setIsFormOpen(true)}
                  className="ml-auto w-full sm:w-auto"
                  size="sm"
                >
                  새 할 일 추가
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* 본문 영역 */}
      <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6">
        <div className="mx-auto max-w-7xl">
          {/* 에러 메시지 표시 */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 sm:gap-6">
            {/* 할 일 추가/편집 다이얼로그 */}
            <Dialog open={isFormOpen} onOpenChange={handleDialogOpenChange}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingTodo ? "할 일 수정" : "새 할 일 추가"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingTodo
                      ? "할 일 정보를 수정하세요."
                      : "새로운 할 일을 추가하세요."}
                  </DialogDescription>
                </DialogHeader>
                <TodoForm
                  todo={editingTodo}
                  onSubmit={handleFormSubmit}
                  onCancel={handleCancelForm}
                  isLoading={isLoadingTodos}
                />
              </DialogContent>
            </Dialog>

            {/* AI 요약 및 분석 섹션 */}
            {currentUser && (
              <section className="min-w-0">
                <Tabs defaultValue="today" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="today">오늘의 요약</TabsTrigger>
                    <TabsTrigger value="week">이번 주 요약</TabsTrigger>
                  </TabsList>
                  <TabsContent value="today" className="mt-4">
                    <AIAnalysis
                      todos={todos}
                      userId={currentUser.id}
                      period="today"
                    />
                  </TabsContent>
                  <TabsContent value="week" className="mt-4">
                    <AIAnalysis
                      todos={todos}
                      userId={currentUser.id}
                      period="week"
                    />
                  </TabsContent>
                </Tabs>
              </section>
            )}

            {/* 할 일 목록 */}
            <section className="min-w-0">
              <TodoList
                todos={filteredAndSortedTodos}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
                isLoading={isLoadingTodos}
                allTodos={todos}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

// Suspense로 감싼 메인 페이지
const HomePage = () => {
  return (
    <React.Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">로딩 중...</div>
      </div>
    }>
      <HomePageContent />
    </React.Suspense>
  );
};

export default HomePage;
