"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";

type Sentiment = "긍정" | "부정" | "중립";

interface AnalysisResult {
  sentiment: Sentiment;
  confidence: number;
  explanation: string;
}

const MAX_TEXT_LENGTH = 5000;

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeSentiment = async () => {
    // 입력 검증
    if (!text.trim()) {
      setError("텍스트를 입력해주세요.");
      return;
    }

    // 입력 길이 제한 확인
    if (text.length > MAX_TEXT_LENGTH) {
      setError(`입력 텍스트가 너무 깁니다. 최대 ${MAX_TEXT_LENGTH}자까지 입력 가능합니다. (현재: ${text.length}자)`);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: "응답을 받을 수 없습니다.",
        }));
        throw new Error(errorData.error || "분석에 실패했습니다.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      // 네트워크 오류 처리
      if (err instanceof TypeError && err.message.includes("fetch")) {
        setError("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
      } else {
        setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_TEXT_LENGTH) {
      setText(newText);
      // 길이 초과 오류가 있었다면 초기화
      if (error && error.includes("너무 깁니다")) {
        setError(null);
      }
    } else {
      // 길이 초과 시 입력 제한
      setText(newText.slice(0, MAX_TEXT_LENGTH));
      setError(`최대 ${MAX_TEXT_LENGTH}자까지 입력 가능합니다.`);
    }
  };

  const getSentimentColor = (sentiment: Sentiment) => {
    switch (sentiment) {
      case "긍정":
        return "bg-green-500";
      case "부정":
        return "bg-red-500";
      case "중립":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSentimentLabel = (sentiment: Sentiment) => {
    switch (sentiment) {
      case "긍정":
        return "긍정";
      case "부정":
        return "부정";
      case "중립":
        return "중립";
      default:
        return sentiment;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
        <div className="flex flex-col items-center gap-6 mb-8 text-center">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
              AI 감성 분석기
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            텍스트를 입력하면 AI가 감성을 분석해 드립니다.
          </p>
        </div>

        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle>텍스트 입력</CardTitle>
            <CardDescription>분석할 텍스트를 입력해주세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                value={text}
                onChange={handleTextChange}
                placeholder="예: 오늘 날씨가 정말 좋아서 기분이 좋습니다!"
                className="min-h-32 resize-none"
                disabled={loading}
              />
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span className="text-xs">
                  {text.length > MAX_TEXT_LENGTH * 0.9 && (
                    <span className={text.length === MAX_TEXT_LENGTH ? "text-red-500 font-medium" : "text-orange-500"}>
                      {MAX_TEXT_LENGTH - text.length}자 남음
                    </span>
                  )}
                </span>
                <span className={text.length > MAX_TEXT_LENGTH * 0.9 ? "text-orange-500" : ""}>
                  {text.length} / {MAX_TEXT_LENGTH}자
                </span>
              </div>
            </div>
            <Button
              onClick={analyzeSentiment}
              disabled={loading || !text.trim() || text.length > MAX_TEXT_LENGTH}
              className="w-full md:w-auto"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  분석 중...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  분석하기
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20 shadow-lg transition-all duration-300 animate-fadeIn">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-600 dark:text-red-400 flex-1">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="shadow-lg transition-all duration-500 animate-fadeInUp">
            <CardHeader>
              <CardTitle>분석 결과</CardTitle>
              <CardDescription>AI가 분석한 감성 분석 결과입니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div
                    className={`${getSentimentColor(
                      result.sentiment
                    )} w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all duration-300 animate-scaleIn`}
                  >
                    {getSentimentLabel(result.sentiment)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    신뢰도: {(result.confidence * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 transition-all duration-500 delay-200 animate-fadeIn">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {result.explanation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
