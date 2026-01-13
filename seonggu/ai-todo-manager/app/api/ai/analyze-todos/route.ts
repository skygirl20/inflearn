import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * 할 일 목록을 분석하여 요약과 인사이트를 제공하는 API
 * Gemini API를 사용하여 할 일 데이터를 분석합니다.
 */

// 응답 스키마 정의
const analysisSchema = z.object({
  summary: z.string().describe("할 일 목록의 요약 (완료율 포함)"),
  completionRate: z.number().describe("완료율 (0-100)"),
  totalTasks: z.number().describe("전체 할 일 개수"),
  completedTasks: z.number().describe("완료된 할 일 개수"),
  remainingTasks: z.array(z.object({
    title: z.string(),
    priority: z.enum(["high", "medium", "low"]),
    dueDate: z.string().optional(),
  })).describe("남은 할 일 목록 (우선순위 높은 순, 최대 5개)"),
  urgentTasks: z.array(z.string()).describe("긴급한 할 일 제목 목록"),
  focusArea: z.string().describe("오늘/이번 주 집중해야 할 핵심 작업 영역"),
  insights: z.array(z.object({
    type: z.enum(["idea", "warning", "goal", "info"]).describe("인사이트 타입"),
    message: z.string(),
  })).describe("인사이트 목록 (시간대별 집중도, 우선순위 분포 등)"),
  recommendations: z.array(z.string()).describe("실행 가능한 추천 사항 목록"),
  weeklyTrend: z.object({
    description: z.string().describe("주간 트렌드 설명"),
    productivity: z.enum(["increasing", "stable", "decreasing"]).describe("생산성 추세"),
  }).optional().describe("주간 분석인 경우에만 제공"),
  dailyCompletion: z.array(z.object({
    day: z.string().describe("요일 (월, 화, 수, 목, 금, 토, 일)"),
    completionRate: z.number().describe("해당 요일의 완료율 (0-100)"),
    totalTasks: z.number().describe("해당 요일의 전체 할 일 개수"),
    completedTasks: z.number().describe("해당 요일의 완료된 할 일 개수"),
  })).optional().describe("주간 분석인 경우 요일별 완료율 데이터"),
});

export async function POST(request: NextRequest) {
  try {
    // 환경 변수 확인
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { 
          error: "AI 서비스가 설정되지 않았습니다. 관리자에게 문의해주세요.",
          code: "CONFIG_ERROR"
        },
        { status: 500 }
      );
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
      return NextResponse.json(
        { 
          error: "데이터베이스 설정이 올바르지 않습니다.",
          code: "CONFIG_ERROR"
        },
        { status: 500 }
      );
    }

    // 요청 본문 파싱
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { 
          error: "잘못된 요청 형식입니다.",
          code: "INVALID_JSON"
        },
        { status: 400 }
      );
    }

    const { userId, period, todos: providedTodos } = body;

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { 
          error: "사용자 ID가 필요합니다.",
          code: "VALIDATION_ERROR"
        },
        { status: 400 }
      );
    }

    if (!period || !["today", "week"].includes(period)) {
      return NextResponse.json(
        { 
          error: "분석 기간이 올바르지 않습니다. 'today' 또는 'week'를 입력해주세요.",
          code: "VALIDATION_ERROR"
        },
        { status: 400 }
      );
    }

    // 현재 날짜 정보 생성 (로컬 시간 기준)
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const currentDate = today.toISOString().split("T")[0]; // YYYY-MM-DD

    // 기간에 따른 날짜 범위 계산
    let startDate: string;
    let endDate: string = currentDate;

    if (period === "today") {
      startDate = currentDate;
    } else {
      // 이번 주의 시작일 (월요일)
      const dayOfWeek = now.getDay(); // 0: 일요일, 1: 월요일, ...
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 월요일로 조정
      const monday = new Date(today);
      monday.setDate(today.getDate() + mondayOffset);
      startDate = monday.toISOString().split("T")[0];
    }

    // 클라이언트에서 필터링된 할 일 목록 사용 (없으면 서버에서 조회)
    let todos: any[] = [];
    
    if (providedTodos && Array.isArray(providedTodos) && providedTodos.length > 0) {
      // 클라이언트에서 필터링된 할 일 목록 사용
      todos = providedTodos;
    } else {
      // Supabase 클라이언트 생성
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
      );

      if (period === "today") {
        // 오늘 생성된 할 일
        const { data: todayCreated, error: createdError } = await supabase
          .from("todos")
          .select("*")
          .eq("user_id", userId)
          .gte("created_date", `${startDate}T00:00:00`)
          .lt("created_date", `${endDate}T23:59:59`)
          .order("created_date", { ascending: false });

        // 오늘이 마감일인 할 일 (due_date가 null이 아닌 것만)
        const { data: todayDue, error: dueError } = await supabase
          .from("todos")
          .select("*")
          .eq("user_id", userId)
          .not("due_date", "is", null)
          .gte("due_date", startDate)
          .lt("due_date", `${endDate}T23:59:59`)
          .order("created_date", { ascending: false });

        if (createdError || dueError) {
          console.error("할 일 조회 오류:", createdError || dueError);
          return NextResponse.json(
            { 
              error: "할 일 목록을 불러오는 중 오류가 발생했습니다.",
              code: "FETCH_ERROR"
            },
            { status: 500 }
          );
        }

        // 중복 제거 (id 기준)
        const todoMap = new Map();
        [...(todayCreated || []), ...(todayDue || [])].forEach((todo) => {
          todoMap.set(todo.id, todo);
        });
        todos = Array.from(todoMap.values());
      } else {
        // 이번 주의 할 일: 이번 주에 생성되었거나 이번 주에 마감일이 있는 할 일
        const { data: weekCreated, error: createdError } = await supabase
          .from("todos")
          .select("*")
          .eq("user_id", userId)
          .gte("created_date", startDate)
          .order("created_date", { ascending: false });

        const { data: weekDue, error: dueError } = await supabase
          .from("todos")
          .select("*")
          .eq("user_id", userId)
          .not("due_date", "is", null)
          .gte("due_date", startDate)
          .lte("due_date", endDate)
          .order("created_date", { ascending: false });

        if (createdError || dueError) {
          console.error("할 일 조회 오류:", createdError || dueError);
          return NextResponse.json(
            { 
              error: "할 일 목록을 불러오는 중 오류가 발생했습니다.",
              code: "FETCH_ERROR"
            },
            { status: 500 }
          );
        }

        // 중복 제거 (id 기준)
        const todoMap = new Map();
        [...(weekCreated || []), ...(weekDue || [])].forEach((todo) => {
          todoMap.set(todo.id, todo);
        });
        todos = Array.from(todoMap.values());
      }
    }

    if (!todos || todos.length === 0) {
      return NextResponse.json({
        data: {
          summary: period === "today" 
            ? "오늘 등록된 할 일이 없습니다." 
            : "이번 주 등록된 할 일이 없습니다.",
          completionRate: 0,
          totalTasks: 0,
          completedTasks: 0,
          remainingTasks: [],
          urgentTasks: [],
          focusArea: "새로운 할 일을 추가하여 시작하세요!",
          insights: [
            {
              type: "info",
              message: period === "today"
                ? "오늘은 등록된 할 일이 없습니다. 새로운 할 일을 추가해보세요!"
                : "이번 주는 등록된 할 일이 없습니다. 새로운 할 일을 추가해보세요!"
            }
          ],
          recommendations: [
            "새로운 할 일을 추가하여 생산성을 높여보세요.",
            "중요한 일정을 미리 등록하여 계획적으로 관리하세요."
          ],
          ...(period === "week" && {
            weeklyTrend: {
              description: "이번 주는 아직 할 일이 없습니다.",
              productivity: "stable"
            }
          })
        },
        success: true,
      });
    }

    // 통계 계산
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // 우선순위 분포
    const priorityCount = {
      high: todos.filter((t) => t.priority === "high").length,
      medium: todos.filter((t) => t.priority === "medium").length,
      low: todos.filter((t) => t.priority === "low").length,
    };

    // 카테고리 분포
    const categoryMap = new Map<string, number>();
    todos.forEach((todo) => {
      if (todo.category && Array.isArray(todo.category)) {
        todo.category.forEach((cat: string) => {
          categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
        });
      }
    });

    // 긴급한 할 일 (미완료 + 높은 우선순위 + 마감일 임박)
    const urgentTasks = todos
      .filter((todo) => {
        if (todo.completed) return false;
        if (todo.priority !== "high") return false;
        if (!todo.due_date) return false;
        const dueDate = new Date(todo.due_date);
        const today = new Date(currentDate);
        const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntilDue <= 2; // 2일 이내
      })
      .map((todo) => todo.title)
      .slice(0, 5); // 최대 5개

    // 남은 할 일 (미완료, 우선순위 높은 순)
    const remainingTasks = todos
      .filter((todo) => !todo.completed)
      .sort((a: any, b: any) => {
        const priorityOrder: Record<"high" | "medium" | "low", number> = { high: 3, medium: 2, low: 1 };
        const aPriority = a.priority as "high" | "medium" | "low";
        const bPriority = b.priority as "high" | "medium" | "low";
        return priorityOrder[bPriority] - priorityOrder[aPriority];
      })
      .slice(0, 5)
      .map((todo) => ({
        title: todo.title,
        priority: todo.priority as "high" | "medium" | "low",
        dueDate: todo.due_date || undefined,
      }));

    // 시간대별 집중도 분석
    const timeSlots = {
      morning: 0, // 00:00-12:00
      afternoon: 0, // 12:00-18:00
      evening: 0, // 18:00-24:00
    };

    todos.forEach((todo) => {
      if (todo.due_date) {
        try {
          const dueDateTime = new Date(todo.due_date);
          const hour = dueDateTime.getHours();
          if (hour < 12) timeSlots.morning++;
          else if (hour < 18) timeSlots.afternoon++;
          else timeSlots.evening++;
        } catch (e) {
          // 날짜 파싱 실패 시 무시
        }
      }
    });

    // 요일별 완료율 계산 (주간 분석인 경우)
    let dailyCompletion: Array<{
      day: string;
      completionRate: number;
      totalTasks: number;
      completedTasks: number;
    }> = [];

    if (period === "week") {
      const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
      const weekStartDate = new Date(startDate);
      
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(weekStartDate);
        currentDay.setDate(weekStartDate.getDate() + i);
        const dayStr = currentDay.toISOString().split("T")[0];
        
        // 해당 날짜에 생성되거나 마감일인 할 일 필터링
        const dayTodos = todos.filter((todo) => {
          const createdDate = new Date(todo.created_date).toISOString().split("T")[0];
          if (createdDate === dayStr) return true;
          
          if (todo.due_date) {
            const dueDate = new Date(todo.due_date).toISOString().split("T")[0];
            if (dueDate === dayStr) return true;
          }
          
          return false;
        });
        
        const dayTotal = dayTodos.length;
        const dayCompleted = dayTodos.filter((t) => t.completed).length;
        const dayCompletionRate = dayTotal > 0 ? Math.round((dayCompleted / dayTotal) * 100) : 0;
        
        dailyCompletion.push({
          day: daysOfWeek[i],
          completionRate: dayCompletionRate,
          totalTasks: dayTotal,
          completedTasks: dayCompleted,
        });
      }
    }

    // Gemini API를 사용하여 분석
    const { object } = await generateObject({
      model: google("gemini-2.5-flash-lite"),
      schema: analysisSchema,
      prompt: `다음 할 일 목록 데이터를 분석하여 요약과 인사이트를 제공해주세요.

=== 분석 기간 ===
${period === "today" ? "오늘" : "이번 주"} (${startDate} ~ ${endDate})

=== 할 일 목록 ===
총 ${total}개의 할 일 중 ${completed}개 완료 (완료율: ${completionRate}%)

우선순위 분포:
- 높음: ${priorityCount.high}개
- 보통: ${priorityCount.medium}개
- 낮음: ${priorityCount.low}개

카테고리 분포:
${Array.from(categoryMap.entries())
  .map(([cat, count]) => `- ${cat}: ${count}개`)
  .join("\n") || "- 카테고리 없음"}

시간대별 할 일 집중도:
- 오전 (00:00-12:00): ${timeSlots.morning}개
- 오후 (12:00-18:00): ${timeSlots.afternoon}개
- 저녁 (18:00-24:00): ${timeSlots.evening}개

긴급한 할 일 (미완료 + 높은 우선순위 + 마감일 임박):
${urgentTasks.length > 0 ? urgentTasks.map((t, i) => `${i + 1}. ${t}`).join("\n") : "없음"}

=== 할 일 상세 정보 ===
${todos
  .map(
    (todo, idx) => `
${idx + 1}. ${todo.title}
   - 상태: ${todo.completed ? "완료" : "미완료"}
   - 우선순위: ${todo.priority === "high" ? "높음" : todo.priority === "medium" ? "보통" : "낮음"}
   - 마감일: ${todo.due_date || "없음"}
   - 카테고리: ${todo.category && todo.category.length > 0 ? todo.category.join(", ") : "없음"}
   ${todo.description ? `- 설명: ${todo.description}` : ""}`
  )
  .join("\n")}

=== 요구사항 ===

1. summary: 
   - 완료율을 포함한 간결한 요약 (예: "총 8개의 할 일 중 5개 완료(62.5%)")
   - 한국어로 자연스럽고 친근한 문체로 작성

2. completionRate: 완료율 숫자 (0-100)

3. totalTasks: 전체 할 일 개수 (${total})

4. completedTasks: 완료된 할 일 개수 (${completed})

5. remainingTasks:
   - 미완료 할 일 중 우선순위가 높은 순으로 최대 5개
   - 각 항목은 {title, priority, dueDate} 형식
   - 제공된 데이터: ${JSON.stringify(remainingTasks)}

6. urgentTasks:
   - 긴급한 할 일 제목만 배열로 반환 (최대 5개)
   - 없으면 빈 배열

7. focusArea:
   - ${period === "today" ? "오늘" : "이번 주"} 집중해야 할 핵심 작업 영역을 한 문장으로
   - 예: "높은 우선순위 작업 3개를 먼저 처리하세요"

8. insights:
   - 각 인사이트는 {type, message} 형식
   - type: "idea" (아이디어), "warning" (경고), "goal" (목표), "info" (정보)
   - 시간대별 업무 집중도 분석
   - 우선순위 분포 분석
   - 마감일 분석
   - 완료율에 대한 인사이트
   - 한국어로 자연스럽고 친근한 문체로 작성 (최대 5개)

9. recommendations:
   - 실행 가능한 구체적인 추천 사항
   - 우선순위, 시간대, 완료율 등을 고려한 실용적인 조언
   - 한국어로 자연스럽고 친근한 문체로 작성 (최대 5개)

${period === "week" ? `
10. weeklyTrend (이번 주 분석인 경우에만):
   - description: 주간 트렌드를 설명하는 텍스트
   - productivity: "increasing" (증가), "stable" (안정), "decreasing" (감소) 중 하나

11. dailyCompletion (이번 주 분석인 경우에만):
   - 요일별 완료율 데이터 배열
   - 각 항목: {day: "월", completionRate: 75, totalTasks: 8, completedTasks: 6}
   - 제공된 데이터: ${JSON.stringify(dailyCompletion)}
` : ""}

=== 출력 형식 ===
반드시 JSON 형식으로 응답해야 하며, 다음 구조를 정확히 따르세요:
{
  "summary": "요약 텍스트",
  "completionRate": ${completionRate},
  "totalTasks": ${total},
  "completedTasks": ${completed},
  "remainingTasks": ${JSON.stringify(remainingTasks)},
  "urgentTasks": ["할 일 제목1", "할 일 제목2"],
  "focusArea": "핵심 작업 영역",
  "insights": [
    {"type": "idea", "message": "인사이트1"},
    {"type": "warning", "message": "인사이트2"}
  ],
  "recommendations": ["추천1", "추천2"]${period === "week" ? `,
  "weeklyTrend": {
    "description": "주간 트렌드 설명",
    "productivity": "increasing"
  },
  "dailyCompletion": [
    {"day": "월", "completionRate": 75, "totalTasks": 8, "completedTasks": 6},
    {"day": "화", "completionRate": 80, "totalTasks": 10, "completedTasks": 8}
  ]` : ""}
}

할 일 목록을 분석하여 위 형식에 맞춰 응답해주세요.`,
    });

    // 주간 분석인 경우 dailyCompletion 데이터 추가
    const responseData = period === "week" && dailyCompletion.length > 0
      ? { ...object, dailyCompletion }
      : object;

    return NextResponse.json({
      data: responseData,
      success: true,
    });
  } catch (error) {
    console.error("AI 분석 오류:", error);

    // 에러 타입에 따른 처리
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      console.error("AI 분석 상세 오류:", error.message);

      // API 키 오류
      if (
        errorMessage.includes("api key") ||
        errorMessage.includes("authentication") ||
        errorMessage.includes("google_generative_ai_api_key") ||
        errorMessage.includes("invalid api key") ||
        errorMessage.includes("unauthorized")
      ) {
        return NextResponse.json(
          {
            error: "AI 서비스 인증에 실패했습니다. 잠시 후 다시 시도해주세요.",
            code: "AUTH_ERROR",
          },
          { status: 401 }
        );
      }

      // 모델 오류
      if (
        errorMessage.includes("model") ||
        errorMessage.includes("not found") ||
        errorMessage.includes("not available") ||
        errorMessage.includes("404") ||
        errorMessage.includes("invalid model")
      ) {
        return NextResponse.json(
          {
            error: "AI 서비스를 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.",
            code: "MODEL_ERROR",
          },
          { status: 503 }
        );
      }

      // 할당량 초과 또는 비율 제한 (429)
      if (
        errorMessage.includes("quota") ||
        errorMessage.includes("rate limit") ||
        errorMessage.includes("429") ||
        errorMessage.includes("too many requests")
      ) {
        return NextResponse.json(
          {
            error: "AI 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.",
            code: "RATE_LIMIT",
          },
          { status: 429 }
        );
      }

      // 타임아웃 오류
      if (errorMessage.includes("timeout") || errorMessage.includes("timed out")) {
        return NextResponse.json(
          {
            error: "AI 응답 시간이 초과되었습니다. 다시 시도해주세요.",
            code: "TIMEOUT",
          },
          { status: 504 }
        );
      }
    }

    // 기타 알 수 없는 오류 (500)
    return NextResponse.json(
      {
        error: "할 일 분석 중 오류가 발생했습니다. 다시 시도해주세요.",
        code: "UNKNOWN_ERROR",
      },
      { status: 500 }
    );
  }
}
