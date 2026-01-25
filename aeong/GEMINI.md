#project: skygirl GEMINI.md

## General Instructions
- TypeScript 코드 작성 시 기존 코딩 스타일을 따를 것
- 모든 함수와 클래스에 JSDoc 주석 작성
- TypeScript 5.0, node.js 20+ 호환성 보장

## Coding Style
- 들여쓰기는 2칸(space) 사용
- 인터페이스는 I로 시작 (예: IUserService)
- 클래스의 private 멤버는 \_로 시작
- 항상 strict equality (===. !==) 사용

## Output Rules
- 불필요한 설명 문단 작성 금지
- 코드 외 설명은 최소한의 bullet point로 작성
- 정보가 부족한 경우 임의 구현하지 말고 질문할 것

## Specific component: src/api/client.ts
- 모든 API 요청을 담당
- 신규 API 함수 추가 시 robust한 에러 처리 및 로깅 필수
- GET 요청은 반드시 fetchWithRetry 유틸리티 사용

## API Request Rules
- fetchWithRetry 사용 시 timeout, retryCount, backoff 옵션 명시
- retry 대상은 네트워크 오류 및 5xx 에러만 포함
- 4xx 에러는 즉시 실패 처리

## Error Handling Policy
- 에러 타입을 명확히 구분 (Network / Client / Server)
- console.error 사용 시 모듈명 prefix 포함
- 사용자 메시지와 내부 메시지 분리

## Dependencies
- 반드시 필요한 경우가 아니면 외부 라이브러리 도입 금지
- 새 의존성 추가 시 사유 명시

## Scope control
- 명시되지 않은 파일은 수정하지 말 것