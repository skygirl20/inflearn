"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

/**
 * 로그인 페이지 컴포넌트
 * 이메일/비밀번호 기반 로그인 기능을 제공합니다.
 */
const LoginPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  // 로그인된 사용자 확인 및 리다이렉트
  React.useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // 이미 로그인된 경우 메인 페이지로 리다이렉트
        router.push("/");
        return;
      }
    };

    checkAuth();
  }, [router]);

  // 이메일 확인 성공 메시지 및 오류 메시지 확인
  React.useEffect(() => {
    const confirmed = searchParams.get("confirmed");
    const error = searchParams.get("error");
    
    if (confirmed === "true") {
      setSuccessMessage("이메일이 확인되었습니다. 로그인해주세요.");
      // URL에서 쿼리 파라미터 제거
      router.replace("/login");
    } else if (error) {
      setError(error);
      // URL에서 쿼리 파라미터 제거
      router.replace("/login");
    }
  }, [searchParams, router]);

  // 이메일 형식 검증
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // 이메일 형식 검증
    if (!validateEmail(email.trim())) {
      setError("올바른 이메일 형식을 입력해주세요.");
      setIsLoading(false);
      return;
    }

    // 비밀번호 공백 확인
    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      // Supabase Auth 로그인
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (signInError) {
        // Supabase 오류 메시지를 사용자 친화적으로 변환
        let errorMessage = "로그인 중 오류가 발생했습니다. 다시 시도해주세요.";
        const errorMsg = signInError.message.toLowerCase();

        if (
          errorMsg.includes("invalid login credentials") ||
          errorMsg.includes("invalid credentials") ||
          errorMsg.includes("email") ||
          errorMsg.includes("password")
        ) {
          errorMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
        } else if (errorMsg.includes("email not confirmed")) {
          errorMessage = "이메일을 확인해주세요. 이메일 확인 링크를 다시 보내드릴까요?";
        } else {
          errorMessage = signInError.message;
        }

        setError(errorMessage);
        return;
      }

      // 로그인 성공 시 메인 페이지로 이동
      if (data.session) {
        router.push("/");
        router.refresh(); // 세션 정보 갱신
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "로그인 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* 서비스 로고 및 소개 */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex items-center justify-center size-16 rounded-full bg-primary/10">
              <Sparkles className="size-8 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">AI Todo Manager</h1>
            <p className="text-muted-foreground">
              자연어로 할 일을 생성하고, 스마트하게 관리하세요
            </p>
          </div>
        </div>

        {/* 로그인 폼 카드 */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">로그인</CardTitle>
            <CardDescription>
              이메일과 비밀번호를 입력하여 로그인하세요
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* 성공 메시지 표시 */}
              {successMessage && (
                <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    {successMessage}
                  </AlertDescription>
                </Alert>
              )}

              {/* 오류 메시지 표시 */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* 이메일 입력 */}
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>

              {/* 비밀번호 입력 */}
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>

              {/* 비밀번호 재설정 링크 */}
              <div className="flex justify-end">
                <Link
                  href="/reset-password"
                  className="text-sm text-primary hover:underline"
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              {/* 로그인 버튼 */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>

              {/* 회원가입 링크 */}
              <div className="text-center text-sm text-muted-foreground">
                계정이 없으신가요?{" "}
                <Link
                  href="/signup"
                  className="text-primary font-medium hover:underline"
                >
                  회원가입
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

// Suspense로 감싼 로그인 페이지
const LoginPage = () => {
  return (
    <React.Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">로딩 중...</div>
      </div>
    }>
      <LoginPageContent />
    </React.Suspense>
  );
};

export default LoginPage;
