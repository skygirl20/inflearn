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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles, Loader2, ChevronDown, ChevronUp } from "lucide-react";
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
  const [aiInput, setAiInput] = React.useState("");
  const [isAiLoading, setIsAiLoading] = React.useState(false);
  const [aiError, setAiError] = React.useState<string | null>(null);
  const [showAiInput, setShowAiInput] = React.useState(false);

  // AI 자연어 파싱 핸들러
  const handleAiParse = async () => {
    if (!aiInput.trim()) {
      setAiError("자연어 입력을 입력해주세요.");
      return;
    }

    setIsAiLoading(true);
    setAiError(null);

    try {
      const response = await fetch("/api/ai/parse-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ naturalLanguage: aiInput.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI 파싱 중 오류가 발생했습니다.");
      }

      // 파싱된 데이터를 폼에 적용
      const parsed = data.data;
      
      // 날짜와 시간을 결합하여 datetime-local 형식으로 변환
      let dueDateTime: string | null = null;
      if (parsed.due_date) {
        const time = parsed.due_time || "09:00"; // 기본값 09:00
        dueDateTime = `${parsed.due_date}T${time}`;
      }

      setFormData({
        title: parsed.title || "",
        description: parsed.description || "",
        due_date: dueDateTime,
        priority: parsed.priority || "medium",
        category: parsed.category || [],
      });

      // AI 입력 필드 초기화
      setAiInput("");
    } catch (error) {
      console.error("AI 파싱 오류:", error);
      setAiError(
        error instanceof Error
          ? error.message
          : "자연어 파싱 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsAiLoading(false);
    }
  };

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
          {/* AI 자연어 입력 토글 */}
          {!todo && (
            <div className="space-y-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowAiInput(!showAiInput)}
                className="w-full justify-between p-3 h-auto"
                disabled={isLoading}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  <span className="font-medium">AI로 할 일 생성</span>
                </div>
                {showAiInput ? (
                  <ChevronUp className="size-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-4 text-muted-foreground" />
                )}
              </Button>
              
              {showAiInput && (
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg border">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      id="ai-input"
                      value={aiInput}
                      onChange={(e) => {
                        setAiInput(e.target.value);
                        setAiError(null);
                      }}
                      placeholder="예: 내일 오후 3시까지 중요한 팀 회의 준비하기"
                      disabled={isAiLoading || isLoading}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleAiParse();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleAiParse}
                      disabled={isAiLoading || isLoading || !aiInput.trim()}
                      className="w-full sm:w-auto"
                    >
                      {isAiLoading ? (
                        <>
                          <Loader2 className="size-4 mr-2 animate-spin" />
                          분석 중...
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-4 mr-2" />
                          생성
                        </>
                      )}
                    </Button>
                  </div>
                  {aiError && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertDescription className="text-sm">{aiError}</AlertDescription>
                    </Alert>
                  )}
                  <p className="text-xs text-muted-foreground">
                    자연어로 할 일을 입력하면 자동으로 제목, 날짜, 우선순위, 카테고리를 추출합니다.
                  </p>
                </div>
              )}
            </div>
          )}

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
