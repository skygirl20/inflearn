"use client";

import * as React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar, Trash2, Edit2, AlertCircle, Minus, ArrowDown, Tag, Clock } from "lucide-react";

import { Todo, Priority } from "@/types/todo.types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * 개별 할 일을 표시하는 카드 컴포넌트
 * @param todo - 표시할 할 일 데이터
 * @param onToggleComplete - 완료 상태 토글 핸들러
 * @param onEdit - 수정 버튼 클릭 핸들러
 * @param onDelete - 삭제 버튼 클릭 핸들러
 */
interface TodoCardProps {
  todo: Todo;
  onToggleComplete?: (id: string, completed: boolean) => void;
  onEdit?: (todo: Todo) => void;
  onDelete?: (id: string) => void;
}

const TodoCard = ({ todo, onToggleComplete, onEdit, onDelete }: TodoCardProps) => {
  // 우선순위에 따른 배지 스타일 결정
  const getPriorityVariant = (priority: Priority): "default" | "secondary" | "destructive" => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  // 우선순위 한글 표시
  const getPriorityLabel = (priority: Priority): string => {
    switch (priority) {
      case "high":
        return "높음";
      case "medium":
        return "보통";
      case "low":
        return "낮음";
      default:
        return priority;
    }
  };

  // 우선순위 아이콘
  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="size-3" />;
      case "medium":
        return <Minus className="size-3" />;
      case "low":
        return <ArrowDown className="size-3" />;
      default:
        return null;
    }
  };

  // 마감일이 지났는지 확인
  const isOverdue = todo.due_date && !todo.completed && new Date(todo.due_date) < new Date();

  // 완료 상태 변경 핸들러
  const handleToggleComplete = (checked: boolean) => {
    if (onToggleComplete) {
      onToggleComplete(todo.id, checked);
    }
  };

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        todo.completed && "opacity-60",
        isOverdue && !todo.completed && "border-warning"
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={handleToggleComplete}
              className="mt-1"
              aria-label={todo.completed ? "완료 취소" : "완료"}
            />
            <div className="flex-1 min-w-0">
              <CardTitle
                className={cn(
                  "text-lg font-semibold",
                  todo.completed && "line-through text-muted-foreground"
                )}
              >
                {todo.title}
              </CardTitle>
              {todo.description && (
                <CardDescription className="mt-2 line-clamp-2">
                  {todo.description}
                </CardDescription>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap items-center gap-2">
          {/* 우선순위 배지 */}
          <Badge variant={getPriorityVariant(todo.priority)} className="flex items-center gap-1">
            {getPriorityIcon(todo.priority)}
            {getPriorityLabel(todo.priority)}
          </Badge>

          {/* 카테고리 배지 */}
          {todo.category && todo.category.length > 0 && (
            <>
              {todo.category.map((cat) => (
                <Badge key={cat} variant="outline" className="flex items-center gap-1">
                  <Tag className="size-3" />
                  {cat}
                </Badge>
              ))}
            </>
          )}

          {/* 마감일 표시 */}
          {todo.due_date && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm",
                isOverdue && !todo.completed
                  ? "text-warning font-medium"
                  : "text-muted-foreground"
              )}
            >
              <Calendar className="size-4" />
              <span>
                {format(new Date(todo.due_date), "yyyy년 MM월 dd일", { locale: ko })}
              </span>
              {isOverdue && !todo.completed && (
                <Badge variant="destructive" className="ml-1">
                  지연
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* 생성일 및 수정일 표시 */}
        <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="size-3" />
            <span>생성:</span>
            <span>
              {format(new Date(todo.created_date), "yyyy년 MM월 dd일 HH:mm", { locale: ko })}
            </span>
          </div>
          {todo.updated_at && 
           new Date(todo.updated_at).getTime() !== new Date(todo.created_date).getTime() && (
            <div className="flex items-center gap-1">
              <Clock className="size-3" />
              <span>수정:</span>
              <span>
                {format(new Date(todo.updated_at), "yyyy년 MM월 dd일 HH:mm", { locale: ko })}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(todo)}
            aria-label="수정"
          >
            <Edit2 className="size-4" />
            <span className="sr-only">수정</span>
          </Button>
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(todo.id)}
            aria-label="삭제"
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="size-4" />
            <span className="sr-only">삭제</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
