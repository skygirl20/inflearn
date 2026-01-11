import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Supabase 인증 콜백 라우트
 * 이메일 확인 등 인증 후 리다이렉트를 처리합니다.
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const type = requestUrl.searchParams.get("type");

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 이메일 확인 성공 시 로그인 페이지로 리다이렉트 (확인 메시지 표시)
      const redirectUrl = new URL("/login", requestUrl.origin);
      redirectUrl.searchParams.set("confirmed", "true");
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 오류가 있거나 code가 없는 경우 로그인 페이지로 리다이렉트
  return NextResponse.redirect(new URL("/login", requestUrl.origin));
}
