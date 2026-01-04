import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

// Node.js Runtime 사용 (환경 변수 접근을 위해)
export const runtime = "nodejs";

const MAX_TEXT_LENGTH = 5000;

const sentimentSchema = z.object({
  sentiment: z.enum(["긍정", "부정", "중립"]),
  confidence: z.number().min(0).max(1),
  explanation: z.string(),
});

export async function POST(request: Request) {
  try {
    // API 키 확인 및 trim 처리 (앞뒤 공백 제거)
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();
    
    if (!apiKey) {
      return Response.json(
        { error: "API 키가 설정되지 않았습니다. 환경 변수에 GOOGLE_GENERATIVE_AI_API_KEY를 설정하고 개발 서버를 재시작해주세요." },
        { status: 500 }
      );
    }

    const { text } = await request.json();

    // 입력 검증
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return Response.json(
        { error: "텍스트를 입력해주세요." },
        { status: 400 }
      );
    }

    // 입력 길이 제한 확인
    if (text.length > MAX_TEXT_LENGTH) {
      return Response.json(
        { error: `입력 텍스트가 너무 깁니다. 최대 ${MAX_TEXT_LENGTH}자까지 입력 가능합니다. (현재: ${text.length}자)` },
        { status: 400 }
      );
    }

    // Google AI SDK 사용
    // 환경 변수 설정 (SDK가 자동으로 읽도록)
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = apiKey;
    
    const result = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: sentimentSchema,
      prompt: `다음 텍스트의 감성을 분석하여 긍정, 부정, 중립 중 하나로 분류해주세요.

텍스트: "${text}"

분석 시 다음을 고려해주세요:
- 긍정: 기쁨, 만족, 희망, 긍정적인 감정이 주를 이룸
- 부정: 슬픔, 불만, 불안, 부정적인 감정이 주를 이룸
- 중립: 특정 감정이 명확하지 않거나 균형잡힌 상태

감성을 분류하고, 신뢰도(0-1 사이의 값)와 간단한 설명을 제공해주세요.`,
    });
    
    if (!result || !result.object) {
      throw new Error("API 응답이 올바르지 않습니다.");
    }
    
    return Response.json(result.object);
  } catch (error: unknown) {
    // 에러 로깅 (프로덕션에서도 필요한 최소한의 로그)
    if (error instanceof Error) {
      console.error("감성 분석 오류:", error.message);
      
      const errorMessage = error.message.toLowerCase();
      
      // 네트워크 오류 처리
      if (errorMessage.includes("network") || errorMessage.includes("fetch") || errorMessage.includes("econnrefused")) {
        return Response.json(
          { error: "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요." },
          { status: 503 }
        );
      }
      
      // API 키 인증 오류 처리
      if (errorMessage.includes("api key") || errorMessage.includes("authentication") || errorMessage.includes("unauthorized") || errorMessage.includes("403") || errorMessage.includes("401")) {
        return Response.json(
          { error: "API 키 인증에 실패했습니다. API 키가 유효한지 확인해주세요." },
          { status: 401 }
        );
      }
      
      // 모델 오류 처리
      if (errorMessage.includes("model") || errorMessage.includes("not found") || errorMessage.includes("404")) {
        return Response.json(
          { error: "모델을 찾을 수 없습니다. 모델 이름을 확인해주세요." },
          { status: 400 }
        );
      }
    }

    return Response.json(
      { error: "감성 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
