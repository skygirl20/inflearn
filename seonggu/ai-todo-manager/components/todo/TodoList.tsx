"use client";

import * as React from "react";

import { Todo } from "@/types/todo.types";
import TodoCard from "./TodoCard";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * 할 일 목록을 표시하는 컴포넌트
 * @param todos - 표시할 할 일 목록
 * @param onToggleComplete - 완료 상태 토글 핸들러
 * @param onEdit - 수정 버튼 클릭 핸들러
 * @param onDelete - 삭제 버튼 클릭 핸들러
 * @param isLoading - 로딩 상태
 * @param className - 추가 CSS 클래스
 * @param allTodos - 필터링 전 전체 할 일 목록 (통계 계산용)
 */
interface TodoListProps {
  todos: Todo[];
  onToggleComplete?: (id: string, completed: boolean) => void;
  onEdit?: (todo: Todo) => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
  className?: string;
  allTodos?: Todo[];
}

const TodoList = ({
  todos,
  onToggleComplete,
  onEdit,
  onDelete,
  isLoading = false,
  className,
  allTodos = [],
}: TodoListProps) => {
  // 통계 계산
  const stats = React.useMemo(() => {
    const now = new Date();
    const all = allTodos.length || todos.length;
    const completed = (allTodos.length > 0 ? allTodos : todos).filter((todo) => todo.completed).length;
    const inProgress = (allTodos.length > 0 ? allTodos : todos).filter(
      (todo) => !todo.completed && (!todo.due_date || new Date(todo.due_date) >= now)
    ).length;
    const overdue = (allTodos.length > 0 ? allTodos : todos).filter(
      (todo) => !todo.completed && todo.due_date && new Date(todo.due_date) < now
    ).length;

    return { all, completed, inProgress, overdue };
  }, [todos, allTodos]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-12", className)}>
        <div className="text-muted-foreground">할 일 목록을 불러오는 중입니다...</div>
      </div>
    );
  }

  // 빈 상태
  if (!todos || todos.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <div>
          <h2 className="text-xl font-semibold mb-3">할 일 목록</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-sm">
              전체 {stats.all}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              완료 {stats.completed}
            </Badge>
            <Badge variant="default" className="text-sm">
              진행중 {stats.inProgress}
            </Badge>
            <Badge variant="destructive" className="text-sm">
              지연 {stats.overdue}
            </Badge>
          </div>
        </div>
        <Empty className="py-12">
          <EmptyHeader>
            <EmptyTitle>등록된 할 일이 없습니다</EmptyTitle>
            <EmptyDescription>새로운 할 일을 추가해보세요</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  // 할 일 목록 렌더링
  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <h2 className="text-xl font-semibold mb-3">할 일 목록</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-sm">
            전체 {stats.all}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            완료 {stats.completed}
          </Badge>
          <Badge variant="default" className="text-sm">
            진행중 {stats.inProgress}
          </Badge>
          <Badge variant="destructive" className="text-sm">
            지연 {stats.overdue}
          </Badge>
        </div>
      </div>
      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
