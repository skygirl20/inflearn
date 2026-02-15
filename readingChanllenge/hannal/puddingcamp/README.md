# Pudding Camp

FastAPI 기반의 미팅 예약 서비스입니다.

## 설치 및 실행

### 요구사항
- Python 3.11 이상
- Poetry

### 설치
```bash
poetry install
```

### 데이터베이스 설정
```bash
# 마이그레이션 생성 (필요시)
alembic revision --autogenerate -m "Initial migration"

# 마이그레이션 적용
alembic upgrade head
```

### 실행
```bash
# 개발 서버 실행
uvicorn appserver.app:app --reload
```

## 프로젝트 구조
- `appserver/`: 애플리케이션 코드
  - `app.py`: FastAPI 앱
  - `db.py`: 데이터베이스 설정
  - `apps/`: 앱 모듈
    - `account/`: 계정 관련
    - `calendar/`: 캘린더 관련
- `alembic/`: 데이터베이스 마이그레이션