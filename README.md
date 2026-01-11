# <https://ysoftman.github.io>

## prerequisite

- (최초 한번만 설정) - 깃헙 페이지 소스는 gh-pages 브랜치로 설정

<https://github.com/ysoftman/ysoftman.github.io/settings/pages>
-> github pages -> source -> gh-pages 브랜치 설정

- mise(nvm 대체) 로 node 설치/구성

```bash
# install latest nodejs
brew install mise
mise use node@latest
```

## local 테스트

```bash
# 필요시 패키지 다시 설치
rm -rf node_modules package-lock.json
bun install

# 필요시 최신 패키지(dependencies)로 업데이트
bun update --latest

# 필요시(vim 에서 파일 저장시 자동 포맷팅되도록 했뒀음)
bun prettier . --write

# tailwindcss 변경 확인시
# 필요한 tailwindcss  가 코드 변화에 따라 필요한 요소들이 tailwind_output.css 로 실시간으로 생성되도록 띄워 둔다.
npx @tailwindcss/cli -i ./src/tailwind_input.css -o ./src/tailwind_output.css --watch

# 실행
bun serve

# 빌드(/dist 번들링) 후 로컬에서 확인
bun run build --base "dist/" && node server.cjs
```

## 빌드 배포

- 주의 gh-pages 브랜치는 배포용이기 때문에 master 에 머지 금지!!!
- master 브랜치로 푸시하면 github action 으로 자동 배포
- 또는

```bash
# 다음과 같이 빌드 후 배포하면 자동으로 ./dist 내용이 gh-pages 브랜치로 푸시된다.
bun run build && bun run deploy
```
