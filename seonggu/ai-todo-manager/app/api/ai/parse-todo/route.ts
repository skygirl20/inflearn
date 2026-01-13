import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

/**
 * 자연어로 입력된 할 일을 구조화된 데이터로 변환하는 API
 * Gemini API를 사용하여 자연어를 파싱합니다.
 */

// 응답 스키마 정의
const todoParseSchema = z.object({
  title: z.string().describe("할 일의 제목"),
  description: z.string().optional().describe("할 일에 대한 상세 설명"),
  due_date: z.string().nullable().describe("마감일 (YYYY-MM-DD 형식, 없으면 null)"),
  due_time: z.string().nullable().describe("마감 시간 (HH:mm 형식, 없으면 null)"),
  priority: z.enum(["high", "medium", "low"]).describe("우선순위 (high/medium/low)"),
  category: z.array(z.string()).describe("카테고리 목록"),
});

/**
 * 입력 검증 함수
 */
function validateInput(input: string): { valid: boolean; error?: string; cleaned?: string } {
  // 빈 문자열 체크
  if (!input || typeof input !== "string") {
    return { valid: false, error: "입력 내용이 필요합니다." };
  }

  // 앞뒤 공백 제거
  let cleaned = input.trim();

  // 빈 문자열 체크 (trim 후)
  if (cleaned.length === 0) {
    return { valid: false, error: "입력 내용이 비어있습니다." };
  }

  // 최소 길이 제한 (2자)
  if (cleaned.length < 2) {
    return { valid: false, error: "입력 내용이 너무 짧습니다. 최소 2자 이상 입력해주세요." };
  }

  // 최대 길이 제한 (500자)
  if (cleaned.length > 500) {
    return { valid: false, error: "입력 내용이 너무 깁니다. 최대 500자까지 입력 가능합니다." };
  }

  // 공백만 있는 경우 체크
  if (/^\s+$/.test(input)) {
    return { valid: false, error: "의미 있는 내용을 입력해주세요." };
  }

  // 같은 문자만 반복되는 경우 체크 (3자 이상)
  if (cleaned.length >= 3) {
    const firstChar = cleaned[0];
    const isAllSame = cleaned.split('').every(char => char === firstChar || char === ' ');
    if (isAllSame) {
      return { valid: false, error: "의미 있는 내용을 입력해주세요." };
    }
  }

  // 의미 없는 입력 체크: 한글/영문이 없고 짧은 경우
  const hasKoreanOrEnglish = /[가-힣a-zA-Z]/.test(cleaned);
  if (!hasKoreanOrEnglish && cleaned.length < 10) {
    // 10자 미만이고 한글/영문이 없으면 의미 없는 입력으로 간주
    return { valid: false, error: "의미 있는 내용을 입력해주세요." };
  }

  // 연속된 공백을 하나로 통합
  cleaned = cleaned.replace(/\s+/g, " ");

  // 대소문자 정규화: 문장의 첫 글자는 대문자, 나머지는 소문자로 변환
  // 단, 이미 적절한 대소문자로 작성된 경우를 고려하여 보수적으로 처리
  if (cleaned.length > 0) {
    // 첫 글자가 영문 소문자면 대문자로 변환
    const firstChar = cleaned[0];
    if (/[a-z]/.test(firstChar)) {
      cleaned = firstChar.toUpperCase() + cleaned.slice(1);
    }
    
    // 나머지 부분에서 불필요한 대문자를 소문자로 변환 (단, 약어나 고유명사는 유지)
    // 문장 중간의 대문자를 소문자로 변환 (단, 공백 뒤의 첫 글자는 유지)
    cleaned = cleaned.replace(/([.!?]\s+)([a-z])/g, (match, p1, p2) => {
      return p1 + p2.toUpperCase();
    });
  }

  // 특수 문자나 이모지는 허용 (한글, 영문, 숫자, 공백, 일반 특수문자, 이모지 모두 허용)
  // 단, 제어 문자는 제거
  cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, "");

  return { valid: true, cleaned };
}

/**
 * 후처리 함수
 */
function postProcessResult(result: any, currentDate: string): any {
  const processed = { ...result };

  // 제목 길이 조정 (10-50자)
  if (processed.title) {
    // 제목이 너무 짧으면 (5자 미만) 원본 사용
    if (processed.title.length < 5 && result.title) {
      processed.title = result.title;
    }

    // 제목이 너무 길면 (80자 초과) 잘라내기
    if (processed.title.length > 80) {
      processed.title = processed.title.substring(0, 77) + "...";
    }
  } else {
    // 제목이 없으면 기본값 설정
    processed.title = "새 할 일";
  }

  // 생성된 날짜가 과거인지 확인
  let hasPastDate = false;
  if (processed.due_date) {
    try {
      const dueDate = new Date(processed.due_date);
      const today = new Date(currentDate);
      
      // 날짜만 비교 (시간 제외)
      dueDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (dueDate < today) {
        // 과거 날짜는 null로 설정
        hasPastDate = true;
        processed.due_date = null;
        processed.due_time = null;
      }
    } catch (e) {
      // 잘못된 날짜 형식이면 null로 설정
      processed.due_date = null;
      processed.due_time = null;
    }
  }

  // 과거 날짜 플래그 추가
  processed._hasPastDate = hasPastDate;

  // 우선순위 기본값 설정
  if (!processed.priority || !["high", "medium", "low"].includes(processed.priority)) {
    processed.priority = "medium";
  }

  // 카테고리 기본값 설정
  if (!processed.category || !Array.isArray(processed.category)) {
    processed.category = [];
  }

  // 설명 기본값 설정
  if (!processed.description) {
    processed.description = "";
  }

  return processed;
}

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

    const { naturalLanguage } = body;

    // 입력 검증
    const validation = validateInput(naturalLanguage);
    if (!validation.valid) {
      return NextResponse.json(
        { 
          error: validation.error,
          code: "VALIDATION_ERROR"
        },
        { status: 400 }
      );
    }

    // 전처리된 입력 사용
    const cleanedInput = validation.cleaned!;

    // 현재 날짜 정보 생성 (한국 시간 기준, UTC+9)
    const now = new Date();
    
    // UTC 시간을 한국 시간대(KST, UTC+9)로 변환
    const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로
    const koreaTime = new Date(now.getTime() + kstOffset);
    
    // ISO 문자열을 사용하여 정확한 날짜 추출
    const isoString = koreaTime.toISOString();
    const currentDate = isoString.split("T")[0]; // YYYY-MM-DD
    const currentYear = koreaTime.getUTCFullYear();
    const currentMonth = koreaTime.getUTCMonth() + 1;
    const currentDay = koreaTime.getUTCDate();
    const currentDayOfWeek = koreaTime.getUTCDay(); // 0: 일요일, 6: 토요일

    // 요일 이름 매핑
    const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    // Gemini API를 사용하여 자연어 파싱
    // gemini-2.5-flash 모델 사용
    const { object } = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: todoParseSchema,
      prompt: `다음 자연어 입력을 할 일 데이터로 변환해주세요.

입력: "${cleanedInput}"

현재 날짜 정보:
- 현재 날짜: ${currentDate} (${dayNames[currentDayOfWeek]})
- 현재 연도: ${currentYear}년
- 현재 월: ${currentMonth}월
- 현재 일: ${currentDay}일

=== 필수 변환 규칙 ===

1. 제목(title): 할 일의 핵심 내용을 간결하게 추출 (10-50자)

2. 설명(description): 입력 내용을 기반으로 상세 설명 생성 (선택사항, 없으면 빈 문자열)

3. 마감일(due_date) - 반드시 다음 규칙을 따르세요:
   - "오늘" → ${currentDate}
   - "내일" → ${currentDate}의 다음 날 (현재 날짜 + 1일)
   - "모레" → ${currentDate}의 2일 후 (현재 날짜 + 2일)
   - "이번 주 금요일" → 가장 가까운 금요일 날짜
   - "다음 주 월요일" → 다음 주의 월요일 날짜
   - "다음주 화요일", "다음주 수요일" 등도 동일하게 처리
   - 명확한 날짜가 없으면 null
   - 반드시 YYYY-MM-DD 형식으로 반환

4. 마감 시간(due_time) - 반드시 다음 규칙을 따르세요:
   - "아침" → "09:00"
   - "점심" → "12:00"
   - "오후" → "14:00"
   - "저녁" → "18:00"
   - "밤" → "21:00"
   - "오후 3시", "15:00", "3시" 등의 시간 표현을 HH:mm 형식으로 변환
   - "오전"은 00:00-11:59, "오후"는 12:00-23:59로 변환
   - "3시"만 있으면 오후 3시(15:00)로 해석
   - 시간이 명시되지 않았으면 null

5. 우선순위(priority) - 반드시 다음 키워드를 기준으로 판단:
   - "high": "급하게", "중요한", "빨리", "꼭", "반드시" 등의 키워드가 있으면 "high"
   - "medium": "보통", "적당히" 등의 키워드가 있거나 키워드가 없으면 "medium"
   - "low": "여유롭게", "천천히", "언젠가" 등의 키워드가 있으면 "low"
   - 반드시 "high", "medium", "low" 중 하나로 반환

6. 카테고리(category) - 반드시 다음 키워드를 기준으로 분류:
   - 업무: "회의", "보고서", "프로젝트", "업무" 등의 키워드가 있으면 ["업무"] 추가
   - 개인: "쇼핑", "친구", "가족", "개인" 등의 키워드가 있으면 ["개인"] 추가
   - 건강: "운동", "병원", "건강", "요가" 등의 키워드가 있으면 ["건강"] 추가
   - 학습: "공부", "책", "강의", "학습" 등의 키워드가 있으면 ["학습"] 추가
   - 여러 카테고리가 매칭되면 모두 포함 (예: ["업무", "회의"])
   - 관련 키워드가 없으면 빈 배열 []

=== 출력 형식 ===
반드시 JSON 형식으로 응답해야 하며, 다음 구조를 정확히 따르세요:
{
  "title": "할 일 제목",
  "description": "설명 (없으면 빈 문자열)",
  "due_date": "YYYY-MM-DD 또는 null",
  "due_time": "HH:mm 또는 null",
  "priority": "high" | "medium" | "low",
  "category": ["카테고리1", "카테고리2"] 또는 []
}

=== 예시 ===
입력: "내일 오후 3시까지 중요한 팀 회의 준비하기"
출력: {
  "title": "팀 회의 준비",
  "description": "내일 오후 3시까지 중요한 팀 회의를 위한 준비",
  "due_date": "2026-01-10" (현재 날짜 + 1일),
  "due_time": "15:00",
  "priority": "high",
  "category": ["업무"]
}

입력: "다음주 월요일 아침에 프로젝트 보고서 작성"
출력: {
  "title": "프로젝트 보고서 작성",
  "description": "다음주 월요일 아침에 프로젝트 보고서 작성",
  "due_date": "2026-01-13" (다음주 월요일),
  "due_time": "09:00",
  "priority": "medium",
  "category": ["업무"]
}

입력: "여유롭게 책 읽기"
출력: {
  "title": "책 읽기",
  "description": "여유롭게 책 읽기",
  "due_date": null,
  "due_time": null,
  "priority": "low",
  "category": ["학습"]
}

자연어 입력을 위 규칙에 따라 정확하게 파싱하여 JSON 형식으로 반환해주세요.`,
    });

    // 후처리: 결과 검증 및 조정
    const processedResult = postProcessResult(
      {
        title: object.title,
        description: object.description || "",
        due_date: object.due_date,
        due_time: object.due_time,
        priority: object.priority,
        category: object.category || [],
      },
      currentDate
    );

    // _hasPastDate는 내부 플래그이므로 응답에서 제거
    const { _hasPastDate, ...responseData } = processedResult;
    const hasPastDate = _hasPastDate || false;

    return NextResponse.json({ 
      data: responseData,
      hasPastDate: hasPastDate,
      success: true 
    });
  } catch (error) {
    console.error("AI 파싱 오류:", error);
    
    // 에러 타입에 따른 처리
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      console.error("AI 파싱 상세 오류:", error.message);
      
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
            error: "AI API 인증에 실패했습니다. 잠시 후 다시 시도해주세요.",
            code: "AUTH_ERROR"
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
            code: "MODEL_ERROR"
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
            code: "RATE_LIMIT"
          },
          { status: 429 }
        );
      }

      // 타임아웃 오류
      if (
        errorMessage.includes("timeout") ||
        errorMessage.includes("timed out")
      ) {
        return NextResponse.json(
          { 
            error: "AI 응답 시간이 초과되었습니다. 다시 시도해주세요.",
            code: "TIMEOUT"
          },
          { status: 504 }
        );
      }
    }

    // 기타 알 수 없는 오류 (500)
    return NextResponse.json(
      { 
        error: "할 일 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
        code: "UNKNOWN_ERROR"
      },
      { status: 500 }
    );
  }
}
