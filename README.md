# Galaxy S26 Self Switch Mate

갤럭시 S26 자급제 사용자용 셀프 이전 체크리스트 웹 앱입니다.  
사용자 제공 영상 내용을 기준으로 실수 방지 포인트를 반영했습니다.

## 실행

1. `index.html`을 브라우저에서 직접 열기
2. 로컬 서버가 필요하면 `3000` 이외 포트 사용
   - 예: `py -m http.server 8081`

## 주요 기능

- 단계형 체크리스트 (준비 > 부팅 > 전송 > 유심/eSIM > 검증 > 마무리)
- 필수 항목 미완료 위험 알림
- 단계별 따라하기 멘트
- 진행률 표시 및 자동 저장 (`localStorage`)
- 상태 JSON 내보내기/불러오기
- 개인 메모 저장

## SEO/공유 최적화

- `meta description`, `canonical`, `robots`, Open Graph, Twitter Card 반영
- 구조화 데이터(JSON-LD `WebApplication`) 반영
- `robots.txt`, `sitemap.xml`, `site.webmanifest` 포함
- `favicon.ico`, `favicon.svg`, `apple-touch-icon`, `og-image-v2.png` 포함
- 웹 폰트 `Pretendard` 적용

## OG 이미지 재생성

- 스크립트: `scripts/generate_og_image.py`
- 산출물: `assets/og-image-v2.png`
- 실행: `python scripts/generate_og_image.py`

## GitHub Pages

- 워크플로우: `.github/workflows/deploy-pages.yml`
- 기본 배포 URL: `https://notoow.github.io/samsung-smart-switch/`
- 최초 1회 GitHub 저장소 설정:
  - `Settings > Pages > Source`에서 `GitHub Actions` 선택

## 주의

- 본 앱은 비공식 가이드입니다.
- 통신사/OS 버전에 따라 메뉴 이름, 경로, 제공 기능이 달라질 수 있습니다.
