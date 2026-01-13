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
  const [titleError, setTitleError] = React.useState<string | null>(null);
  const [descriptionError, setDescriptionError] = React.useState<string | null>(null);
  const [dueDateError, setDueDateError] = React.useState<string | null>(null);

  // 의미 없는 입력 검증 함수
  const validateMeaningfulInput = (input: string): string | null => {
    const trimmed = input.trim();
    
    if (!trimmed) {
      return "자연어 입력을 입력해주세요.";
    }

    if (trimmed.length < 2) {
      return "최소 2자 이상 입력해주세요.";
    }

    if (trimmed.length > 500) {
      return "최대 500자까지 입력 가능합니다.";
    }

    // 공백만 있는 경우 (trim 후에도 공백이 많으면)
    if (/^\s+$/.test(input)) {
      return "의미 있는 내용을 입력해주세요.";
    }

    // 같은 문자만 반복되는 경우 (3자 이상)
    if (trimmed.length >= 3) {
      const firstChar = trimmed[0];
      if (trimmed.split('').every(char => char === firstChar || char === ' ')) {
        return "의미 있는 내용을 입력해주세요.";
      }
    }

    // 특수문자나 숫자만 있는 경우 (한글/영문이 하나도 없으면)
    const hasKoreanOrEnglish = /[가-힣a-zA-Z]/.test(trimmed);
    if (!hasKoreanOrEnglish && trimmed.length < 10) {
      // 10자 미만이고 한글/영문이 없으면 의미 없는 입력으로 간주
      return "의미 있는 내용을 입력해주세요.";
    }

    return null;
  };

  // AI 자연어 파싱 핸들러
  const handleAiParse = async () => {
    const validationError = validateMeaningfulInput(aiInput);
    
    if (validationError) {
      setAiError(validationError);
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
      
      // 과거 날짜가 감지된 경우 오류 메시지 표시
      if (data.hasPastDate) {
        setAiError("과거 날짜는 선택할 수 없습니다. 오늘 이후의 날짜를 입력해주세요.");
        setIsAiLoading(false);
        return;
      }

      // 원본 입력에서 과거 날짜 키워드 체크
      const pastDateKeywords = ["어제", "그저께", "작년", "지난", "과거"];
      const hasPastKeyword = pastDateKeywords.some(keyword => 
        aiInput.includes(keyword)
      );
      
      if (hasPastKeyword && !parsed.due_date) {
        // 과거 날짜 키워드가 있는데 날짜가 null이면 과거 날짜로 판단
        setAiError("과거 날짜는 선택할 수 없습니다. 오늘 이후의 날짜를 입력해주세요.");
        setIsAiLoading(false);
        return;
      }
      
      // 날짜와 시간을 결합하여 datetime-local 형식으로 변환
      let dueDateTime: string | null = null;
      if (parsed.due_date) {
        const time = parsed.due_time || "09:00"; // 기본값 09:00
        dueDateTime = `${parsed.due_date}T${time}`;
        
        // 프론트엔드에서도 한번 더 체크
        const selectedDate = new Date(dueDateTime);
        const today = new Date();
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
          setAiError("과거 날짜는 선택할 수 없습니다. 오늘 이후의 날짜를 입력해주세요.");
          setIsAiLoading(false);
          return;
        }
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
      
      // 더 구체적인 에러 메시지 제공
      let errorMessage = "자연어 파싱 중 오류가 발생했습니다. 다시 시도해주세요.";
      
      if (error instanceof Error) {
        const errorMsg = error.message.toLowerCase();
        
        // 과거 날짜 관련 오류
        if (errorMsg.includes("과거") || errorMsg.includes("past")) {
          errorMessage = "과거 날짜는 선택할 수 없습니다. 오늘 이후의 날짜를 입력해주세요.";
        }
        // API 한도 초과
        else if (errorMsg.includes("한도") || errorMsg.includes("quota") || errorMsg.includes("rate limit") || errorMsg.includes("429")) {
          errorMessage = "AI 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.";
        }
        // API 키 오류
        else if (errorMsg.includes("api key") || errorMsg.includes("인증") || errorMsg.includes("authentication")) {
          errorMessage = "AI 서비스 인증에 실패했습니다. 관리자에게 문의해주세요.";
        }
        // 기타 오류는 원본 메시지 사용
        else {
          errorMessage = error.message;
        }
      }
      
      setAiError(errorMessage);
    } finally {
      setIsAiLoading(false);
    }
  };

  // 제목 검증 함수
  const validateTitle = (title: string): string | null => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return "제목을 입력해주세요.";
    }

    if (trimmedTitle.length < 2) {
      return "제목은 최소 2자 이상 입력해주세요.";
    }

    if (trimmedTitle.length > 200) {
      return "제목은 최대 200자까지 입력 가능합니다.";
    }

    return null;
  };

  // 설명 검증 함수
  const validateDescription = (description: string): string | null => {
    const trimmedDescription = description.trim();

    // 설명은 선택사항이므로 비어있어도 OK
    if (!trimmedDescription) {
      return null;
    }

    if (trimmedDescription.length > 1000) {
      return "설명은 최대 1000자까지 입력 가능합니다.";
    }

    return null;
  };

  // 마감일 검증 함수
  const validateDueDate = (dueDate: string | null): string | null => {
    if (!dueDate) {
      return null; // 마감일은 선택사항
    }

    try {
      const selectedDate = new Date(dueDate);
      const today = new Date();
      
      // 날짜만 비교 (시간 제외)
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        return "과거 날짜는 선택할 수 없습니다. 오늘 이후의 날짜를 선택해주세요.";
      }

      return null;
    } catch (e) {
      return "올바른 날짜 형식이 아닙니다.";
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 제목 검증
    const titleErr = validateTitle(formData.title);
    if (titleErr) {
      setTitleError(titleErr);
      return;
    }

    // 설명 검증
    const descErr = validateDescription(formData.description);
    if (descErr) {
      setDescriptionError(descErr);
      return;
    }

    // 마감일 검증
    const dateErr = validateDueDate(formData.due_date);
    if (dateErr) {
      setDueDateError(dateErr);
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
                      placeholder="예: 내일 오후 3시까지 중요한 팀 회의 준비하기 (2-500자)"
                      minLength={2}
                      maxLength={500}
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
                      disabled={isAiLoading || isLoading || aiInput.trim().length < 2}
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
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                // 실시간 검증
                const error = validateTitle(e.target.value);
                setTitleError(error);
              }}
              placeholder="할 일 제목을 입력하세요 (2-200자)"
              required
              minLength={2}
              maxLength={200}
              disabled={isLoading}
              className={cn(titleError && "border-destructive")}
            />
            {titleError && (
              <p className="text-sm text-destructive">{titleError}</p>
            )}
          </div>

          {/* 설명 입력 */}
          <div className="space-y-2">
            <Label htmlFor="description">설명 (선택사항)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                // 실시간 검증
                const error = validateDescription(e.target.value);
                setDescriptionError(error);
              }}
              placeholder="할 일에 대한 상세 설명을 입력하세요 (최대 1000자)"
              rows={4}
              maxLength={1000}
              disabled={isLoading}
              className={cn(descriptionError && "border-destructive")}
            />
            {descriptionError && (
              <p className="text-sm text-destructive">{descriptionError}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.description.length} / 1000자
            </p>
          </div>

          {/* 마감일 입력 */}
          <div className="space-y-2">
            <Label htmlFor="due_date">마감일 (선택사항)</Label>
            <Input
              id="due_date"
              type="datetime-local"
              value={formData.due_date || ""}
              onChange={(e) => {
                const value = e.target.value || null;
                setFormData({
                  ...formData,
                  due_date: value,
                });
                // 실시간 검증
                const error = validateDueDate(value);
                setDueDateError(error);
              }}
              disabled={isLoading}
              className={cn(dueDateError && "border-destructive")}
            />
            {dueDateError && (
              <p className="text-sm text-destructive">{dueDateError}</p>
            )}
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
            disabled={
              isLoading || 
              !!titleError || 
              !!descriptionError || 
              !!dueDateError ||
              formData.title.trim().length < 2
            }
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
