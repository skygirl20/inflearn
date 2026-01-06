"use client";

import * as React from "react";
import { format } from "date-fns";

import { Todo, TodoFormData, Priority } from "@/types/todo.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * 할 일 추가/편집 폼 컴포넌트
 * @param todo - 편집할 할 일 데이터 (없으면 새로 생성)
 * @param onSubmit - 폼 제출 핸들러
 * @param onCancel - 취소 버튼 클릭 핸들러
 * @param isLoading - 제출 중 로딩 상태
 */
interface TodoFormProps {
  todo?: Todo | null;
  onSubmit: (data: TodoFormData) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

const TodoForm = ({ todo, onSubmit, onCancel, isLoading = false }: TodoFormProps) => {
  const [formData, setFormData] = React.useState<TodoFormData>({
    title: todo?.title || "",
    description: todo?.description || "",
    due_date: todo?.due_date
      ? format(new Date(todo.due_date), "yyyy-MM-dd'T'HH:mm")
      : null,
    priority: todo?.priority || "medium",
    category: todo?.category || [],
  });

  const [categoryInput, setCategoryInput] = React.useState("");

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 제목 필수 검증
    if (!formData.title.trim()) {
      return;
    }

    await onSubmit(formData);
  };

  // 카테고리 추가 핸들러
  const handleAddCategory = () => {
    if (categoryInput.trim() && !formData.category.includes(categoryInput.trim())) {
      setFormData({
        ...formData,
        category: [...formData.category, categoryInput.trim()],
      });
      setCategoryInput("");
    }
  };

  // 카테고리 제거 핸들러
  const handleRemoveCategory = (categoryToRemove: string) => {
    setFormData({
      ...formData,
      category: formData.category.filter((cat) => cat !== categoryToRemove),
    });
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

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">{todo ? "할 일 수정" : "새 할 일 추가"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 px-4 sm:px-6">
          {/* 제목 입력 */}
          <div className="space-y-2">
            <Label htmlFor="title">
              제목 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="할 일 제목을 입력하세요"
              required
              disabled={isLoading}
            />
          </div>

          {/* 설명 입력 */}
          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="할 일에 대한 상세 설명을 입력하세요"
              rows={4}
              disabled={isLoading}
            />
          </div>

          {/* 마감일 입력 */}
          <div className="space-y-2">
            <Label htmlFor="due_date">마감일</Label>
            <Input
              id="due_date"
              type="datetime-local"
              value={formData.due_date || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  due_date: e.target.value || null,
                })
              }
              disabled={isLoading}
            />
          </div>

          {/* 우선순위 선택 */}
          <div className="space-y-2">
            <Label htmlFor="priority">우선순위</Label>
            <Select
              value={formData.priority}
              onValueChange={(value: Priority) =>
                setFormData({ ...formData, priority: value })
              }
              disabled={isLoading}
            >
              <SelectTrigger id="priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">{getPriorityLabel("high")}</SelectItem>
                <SelectItem value="medium">{getPriorityLabel("medium")}</SelectItem>
                <SelectItem value="low">{getPriorityLabel("low")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 카테고리 입력 */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="category">카테고리</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="category"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                placeholder="카테고리 입력 후 추가 버튼 클릭"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleAddCategory}
                disabled={isLoading || !categoryInput.trim()}
                className="w-full sm:w-auto"
              >
                추가
              </Button>
            </div>
            {/* 카테고리 목록 표시 */}
            {formData.category.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.category.map((cat) => (
                  <div
                    key={cat}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                  >
                    <span>{cat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(cat)}
                      className="ml-1 hover:text-destructive"
                      disabled={isLoading}
                      aria-label={`${cat} 카테고리 제거`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 px-4 sm:px-6 pb-4 sm:pb-6 pt-6 border-t">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              취소
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isLoading || !formData.title.trim()}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            {isLoading ? "처리 중..." : todo ? "수정" : "추가"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TodoForm;
