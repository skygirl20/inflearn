"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckSquare2, User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

/**
 * 회원가입 페이지 컴포넌트
 * 이메일/비밀번호 기반 회원가입 기능을 제공합니다.
 */
const SignupPage = () => {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [showLoginLink, setShowLoginLink] = React.useState(false);

  // 비밀번호 일치 여부 확인
  const passwordsMatch = password === confirmPassword;
  const showPasswordMismatch =
    confirmPassword.length > 0 && !passwordsMatch;

  // 이메일 형식 검증
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // 이름 확인
    if (!name.trim()) {
      setError("이름을 입력해주세요.");
      return;
    }

    // 이메일 형식 확인
    if (!validateEmail(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    // 비밀번호 일치 확인
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 최소 길이 확인
    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();

      // Supabase Auth 회원가입
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            name: name.trim(),
          },
        },
      });

      if (signUpError) {
        // Supabase 오류 메시지를 사용자 친화적으로 변환
        let errorMessage = "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.";
        const errorMsg = signUpError.message.toLowerCase();
        let shouldShowLoginLink = false;
        
        if (
          errorMsg.includes("already registered") ||
          errorMsg.includes("user already registered") ||
          errorMsg.includes("email already registered") ||
          errorMsg.includes("already exists")
        ) {
          errorMessage = "이미 등록된 이메일입니다.";
          shouldShowLoginLink = true;
        } else if (errorMsg.includes("invalid email") || errorMsg.includes("email")) {
          errorMessage = "올바른 이메일 형식을 입력해주세요.";
        } else if (errorMsg.includes("password")) {
          errorMessage = "비밀번호가 너무 짧거나 약합니다.";
        } else {
          errorMessage = signUpError.message;
        }

        setError(errorMessage);
        setShowLoginLink(shouldShowLoginLink);
        return;
      }

      // 회원가입 성공 처리
      if (data.user) {
        // 이메일 확인이 필요한 경우
        if (data.session === null) {
          setSuccessMessage(
            "회원가입이 완료되었습니다. 이메일을 확인하여 계정을 활성화해주세요."
          );
          // 3초 후 로그인 페이지로 이동
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          // 이메일 확인이 필요 없는 경우 (즉시 로그인)
          router.push("/");
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "회원가입 중 오류가 발생했습니다. 다시 시도해주세요."
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
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center size-10 rounded bg-foreground text-background">
              <CheckSquare2 className="size-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">AI Todo Manager</h1>
          </div>
          <p className="text-muted-foreground text-sm">스마트한 할 일 관리</p>
        </div>

        {/* 페이지 제목 및 소개 */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">회원가입</h2>
          <p className="text-muted-foreground">
            AI가 도와주는 스마트한 할 일 관리 시스템에 함께하세요
          </p>
        </div>

        {/* 회원가입 폼 카드 */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">새 계정 만들기</CardTitle>
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
                  <AlertDescription className="flex flex-col gap-2">
                    <span>{error}</span>
                    {showLoginLink && (
                      <Link href="/login">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto"
                          onClick={() => setShowLoginLink(false)}
                        >
                          로그인 페이지로 이동
                        </Button>
                      </Link>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {/* 이름 입력 */}
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="이름을 입력하세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                    autoComplete="name"
                    className="pl-9"
                  />
                </div>
              </div>

              {/* 이메일 입력 */}
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    className="pl-9"
                  />
                </div>
              </div>

              {/* 비밀번호 입력 */}
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    autoComplete="new-password"
                    minLength={6}
                    className="pl-9 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* 비밀번호 확인 입력 */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="비밀번호를 다시 입력하세요"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    autoComplete="new-password"
                    className={cn(
                      "pl-9 pr-9",
                      showPasswordMismatch && "border-destructive focus-visible:ring-destructive/20"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {showPasswordMismatch && (
                  <p className="text-xs text-destructive">
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-6">
              {/* 회원가입 버튼 */}
              <Button
                type="submit"
                className="w-full"
                disabled={
                  isLoading ||
                  !name ||
                  !email ||
                  !password ||
                  !confirmPassword ||
                  !passwordsMatch
                }
              >
                {isLoading ? "회원가입 중..." : "회원가입"}
                <ArrowRight className="size-4" />
              </Button>

              {/* 구분선 */}
              <Separator />

              {/* 로그인 링크 */}
              <div className="text-center space-y-1">
                <p className="text-sm text-muted-foreground">
                  이미 계정이 있으신가요?
                </p>
                <Link
                  href="/login"
                  className="text-sm text-primary font-medium hover:underline"
                >
                  로그인
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
