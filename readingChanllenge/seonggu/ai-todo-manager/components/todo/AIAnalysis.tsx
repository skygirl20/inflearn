"use client";

import * as React from "react";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle2,
  Clock,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";
import { Todo, Priority } from "@/types/todo.types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface RemainingTask {
  title: string;
  priority: Priority;
  dueDate?: string;
}

interface Insight {
  type: "idea" | "warning" | "goal" | "info";
  message: string;
}

interface WeeklyTrend {
  description: string;
  productivity: "increasing" | "stable" | "decreasing";
}

interface DailyCompletion {
  day: string;
  completionRate: number;
  totalTasks: number;
  completedTasks: number;
}

interface AnalysisResult {
  summary: string;
  completionRate: number;
  totalTasks: number;
  completedTasks: number;
  remainingTasks: RemainingTask[];
  urgentTasks: string[];
  focusArea: string;
  insights: Insight[];
  recommendations: string[];
  weeklyTrend?: WeeklyTrend;
  dailyCompletion?: DailyCompletion[];
}

interface AIAnalysisProps {
  todos: Todo[];
  userId: string;
  period: "today" | "week";
  className?: string;
}

// 날짜만 비교하는 헬퍼 함수 (시간 제외)
const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// 이번 주의 시작일(월요일) 계산
const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 월요일로 조정
  return new Date(d.setDate(diff));
};

// 우선순위 배지 색상
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

// 우선순위 한글
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

// 인사이트 아이콘
const getInsightIcon = (type: Insight["type"]) => {
  switch (type) {
    case "idea":
      return <Lightbulb className="size-4 text-yellow-500" />;
    case "warning":
      return <AlertTriangle className="size-4 text-orange-500" />;
    case "goal":
      return <Target className="size-4 text-blue-500" />;
    case "info":
      return <Info className="size-4 text-gray-500" />;
  }
};

const AIAnalysis = ({ todos, userId, period, className }: AIAnalysisProps) => {
  const [analysis, setAnalysis] = React.useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // 클라이언트에서 기간에 맞는 할 일 필터링
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      let filteredTodos: Todo[] = [];
      
      if (period === "today") {
        // 오늘 생성된 할 일 또는 오늘이 마감일인 할 일
        filteredTodos = todos.filter((todo) => {
          const createdDate = new Date(todo.created_date);
          const createdDateOnly = new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate());
          
          if (isSameDate(createdDateOnly, today)) {
            return true;
          }
          
          if (todo.due_date) {
            const dueDate = new Date(todo.due_date);
            const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
            if (isSameDate(dueDateOnly, today)) {
              return true;
            }
          }
          
          return false;
        });
      } else {
        // 이번 주의 할 일
        const weekStart = getWeekStart(now);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        
        filteredTodos = todos.filter((todo) => {
          const createdDate = new Date(todo.created_date);
          const createdDateOnly = new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate());
          
          if (createdDateOnly >= weekStart && createdDateOnly <= weekEnd) {
            return true;
          }
          
          if (todo.due_date) {
            const dueDate = new Date(todo.due_date);
            const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
            if (dueDateOnly >= weekStart && dueDateOnly <= weekEnd) {
              return true;
            }
          }
          
          return false;
        });
      }

      const response = await fetch("/api/ai/analyze-todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          period,
          todos: filteredTodos,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("JSON이 아닌 응답:", text);
        throw new Error(`서버 응답 오류: ${text || response.statusText}`);
      }

      const data = await response.json();

      if (!response.ok) {
        console.error("API 오류:", data);
        throw new Error(data.error || `분석 중 오류가 발생했습니다. (${response.status})`);
      }

      if (!data.data) {
        console.error("data.data가 없음:", data);
        throw new Error("분석 결과를 받을 수 없습니다.");
      }

      setAnalysis(data.data);
    } catch (err) {
      console.error("AI 분석 오류:", err);
      setError(
        err instanceof Error
          ? err.message
          : "할 일 분석 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const periodLabel = period === "today" ? "오늘의 요약" : "이번 주 요약";

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            AI 요약 및 분석
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAnalyze}
            disabled={isLoading || todos.length === 0}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                분석 중...
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                AI 요약 보기
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {periodLabel} - 할 일 목록을 AI가 분석하여 인사이트를 제공합니다.
        </p>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 space-y-4">
        {/* 오류 상태 */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertDescription className="flex items-center justify-between gap-2">
              <span>{error}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAnalyze}
                className="flex-shrink-0"
              >
                재시도
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* 초기 상태 */}
        {!analysis && !isLoading && !error && (
          <div className="text-center py-8 sm:py-12">
            <Sparkles className="size-12 sm:size-16 mx-auto mb-4 text-primary/50" />
            <p className="text-muted-foreground text-sm sm:text-base">
              AI 요약 보기 버튼을 클릭하여 할 일 목록을 분석해보세요.
            </p>
          </div>
        )}

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="text-center py-8 sm:py-12">
            <Loader2 className="size-12 sm:size-16 mx-auto mb-4 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm sm:text-base">
              AI가 할 일 목록을 분석하고 있습니다...
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              잠시만 기다려주세요
            </p>
          </div>
        )}

        {/* 분석 결과 */}
        {analysis && (
          <div className="space-y-6">
            {/* 완료율 섹션 */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">완료율</p>
                  <p className="text-4xl sm:text-5xl font-bold text-primary">
                    {Math.round(analysis.completionRate)}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {analysis.completedTasks} / {analysis.totalTasks}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {analysis.completedTasks > 0 ? "완료됨" : "진행 중"}
                  </p>
                </div>
              </div>
              <Progress value={analysis.completionRate} className="h-3" />
              <p className="text-sm text-muted-foreground mt-3">{analysis.summary}</p>
            </div>

            {/* 집중 영역 */}
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Target className="size-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-1 text-blue-900 dark:text-blue-100">
                    {period === "today" ? "오늘" : "이번 주"} 집중 영역
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {analysis.focusArea}
                  </p>
                </div>
              </div>
            </div>

            {/* 남은 할 일 */}
            {analysis.remainingTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  남은 할 일 ({analysis.remainingTasks.length}개)
                </h3>
                <div className="space-y-2">
                  {analysis.remainingTasks.map((task, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{task.title}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge variant={getPriorityVariant(task.priority)} className="text-xs">
                            {getPriorityLabel(task.priority)}
                          </Badge>
                          {task.dueDate && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="size-3" />
                              {format(new Date(task.dueDate), "MM/dd", { locale: ko })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 긴급한 할 일 */}
            {analysis.urgentTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="size-4 text-destructive" />
                  긴급한 할 일
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.urgentTasks.map((task, idx) => (
                    <Badge key={idx} variant="destructive" className="text-xs">
                      {task}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* 주간 트렌드 (주간 분석인 경우에만) */}
            {period === "week" && analysis.weeklyTrend && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <div className="flex items-start gap-3 mb-4">
                  {analysis.weeklyTrend.productivity === "increasing" && (
                    <TrendingUp className="size-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  )}
                  {analysis.weeklyTrend.productivity === "decreasing" && (
                    <TrendingDown className="size-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  )}
                  {analysis.weeklyTrend.productivity === "stable" && (
                    <Minus className="size-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1 text-purple-900 dark:text-purple-100">
                      주간 트렌드
                    </h3>
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      {analysis.weeklyTrend.description}
                    </p>
                    <Badge
                      variant={
                        analysis.weeklyTrend.productivity === "increasing"
                          ? "default"
                          : analysis.weeklyTrend.productivity === "decreasing"
                          ? "destructive"
                          : "secondary"
                      }
                      className="mt-2"
                    >
                      {analysis.weeklyTrend.productivity === "increasing" && "생산성 증가"}
                      {analysis.weeklyTrend.productivity === "stable" && "안정적"}
                      {analysis.weeklyTrend.productivity === "decreasing" && "생산성 감소"}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* 요일별 완료율 그래프 (주간 분석인 경우에만) */}
            {period === "week" && analysis.dailyCompletion && analysis.dailyCompletion.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="size-4 text-primary" />
                  요일별 생산성 패턴
                </h3>
                <Card className="p-4">
                  <ChartContainer
                    config={{
                      completionRate: {
                        label: "완료율",
                        color: "hsl(var(--primary))",
                      },
                    }}
                    className="h-[250px] w-full"
                  >
                    <BarChart data={analysis.dailyCompletion}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="day"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        className="text-xs"
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        className="text-xs"
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (!active || !payload || payload.length === 0) return null;
                          const data = payload[0].payload as DailyCompletion;
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="space-y-1">
                                <p className="font-medium">{data.day}요일</p>
                                <p className="text-xs text-muted-foreground">
                                  완료율: {data.completionRate}%
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  완료: {data.completedTasks} / {data.totalTasks}개
                                </p>
                              </div>
                            </div>
                          );
                        }}
                      />
                      <Bar
                        dataKey="completionRate"
                        fill="var(--color-completionRate)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {analysis.dailyCompletion.map((day, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <div
                          className="size-2 rounded-full"
                          style={{
                            backgroundColor:
                              day.completionRate >= 80
                                ? "hsl(var(--primary))"
                                : day.completionRate >= 50
                                ? "hsl(var(--primary) / 0.7)"
                                : "hsl(var(--muted-foreground))",
                          }}
                        />
                        <span>
                          {day.day}: {day.completionRate}%
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* 인사이트 */}
            {analysis.insights.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="size-4 text-yellow-500" />
                  인사이트
                </h3>
                <div className="space-y-2">
                  {analysis.insights.map((insight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      {getInsightIcon(insight.type)}
                      <p className="text-sm text-foreground flex-1">{insight.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 추천 사항 */}
            {analysis.recommendations.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  추천 사항
                </h3>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800"
                    >
                      <span className="text-green-600 dark:text-green-400 font-bold flex-shrink-0">
                        {idx + 1}.
                      </span>
                      <span className="text-sm text-green-900 dark:text-green-100 flex-1">
                        {rec}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAnalysis;
