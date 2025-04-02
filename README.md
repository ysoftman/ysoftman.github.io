# <https://ysoftman.github.io>

## prerequisite

- (최초 한번만 설정) - 깃헙 페이지 소스는 gh-pages 브랜치로 설정

<https://github.com/ysoftman/ysoftman.github.io/settings/pages>
-> github pages -> source -> gh-pages 브랜치 설정

```bash
# install latest nodejs
https://github.com/nodesource/distributions

# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# (최초 한번만 설정) - 패키지 설치
nvm install --lts
nvm use --lts
nvm ls
# sass deprecation warning 문제가 있어 아래 버전을 사용해야 한다.
bun add --dev gh-pages serve-static marked showdown axios connect ajv dotenv \
    @fortawesome/fontawesome-free @mdi/font bootstrap \
    sass@1.77.6 sass-loader css-loader style-loader \
    eslint prettier @babel/core babel-loader @babel/preset-env \
    webpack webpack-cli webpack-dev-server html-webpack-plugin clean-webpack-plugin \
    vite vite-plugin-html \
    tailwindcss \
    three threejs-toys
```

- .env 파일에 myenv readonly 토큰 명시(.gitignore 로 커밋에서 제외)

## local 테스트

```bash
# 필요시(vim 에서 파일 저장시 자동 포맷팅되도록 했뒀음)
bun prettier . --write

# tailwindcss 변경 확인시
# 필요한 tailwindcss  가 코드 변화에 따라 필요한 요소들이 tailwind_output.css 로 실시간으로 생성되도록 띄워 둔다.
npx tailwindcss -i ./src/tailwind_input.css -o ./src/tailwind_output.css --watch

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
