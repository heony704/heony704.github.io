# heony704.github.io

Next.js App Router 기반 정적 블로그입니다.

## Development

```bash
npm install
npm run start
```

## Build

```bash
npm run build
```

빌드 결과는 `out/` 디렉터리에 생성됩니다.

## Deploy

GitHub Pages Source를 `GitHub Actions`로 설정하면 기본 브랜치 push 시 `.github/workflows/deploy-pages.yml` workflow가 `out/`을 배포합니다.
