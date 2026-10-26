# <https://ysoftman.github.io>

## Prerequisites

- (최초 한 번만 설정) - GitHub Pages 소스는 GitHub Actions 로 설정

<https://github.com/ysoftman/ysoftman.github.io/settings/pages>
-> GitHub Pages -> Build and deployment -> Source -> GitHub Actions 선택

- mise(nvm 대체) 로 Node.js 설치/구성

```bash
# install latest Node.js
brew install mise
mise use node@latest
```

## Local 테스트

```bash
# 필요시 패키지 다시 설치
rm -rf node_modules bun.lock
bun install

# 필요시 최신 패키지(dependencies)로 업데이트
bun update --latest

# 필요시(vim 에서 파일 저장 시 자동 포맷팅되도록 해뒀음)
bunx biome check --write .

# Find unused dependencies, exports and files in your JavaScript and TypeScript projects
bun i -g knip
knip

# tailwind v3 css 변경 확인 시(bun-plugin-tailwind 가 자동 빌드한다.)
# 필요한 tailwindcss 가 코드 변화에 따라 필요한 요소들이 tailwind_output.css 로 실시간으로 생성되도록 띄워 둔다.
# bunx @tailwindcss/cli -i ./src/tailwind.css -o ./src/tailwind_output.css --watch
# tailwind v4 물리적인 파일 생성 없이 메모리 상에서 즉시 처리, 원본(tailwind.css)을 import

# dev 실행(HMR, http://127.0.0.1:8080)
bun run dev

# 빌드(/dist 번들링) 후 확인
bun run build
bun run preview
```

## 빌드 배포

- main 브랜치로 푸시하면 GitHub Actions 로 자동 빌드 및 배포
