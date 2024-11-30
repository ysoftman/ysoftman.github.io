# <https://ysoftman.github.io>

## prerequisite

- (최초 한번만 설정) - 깃헙 페이지 소스는 gh-pages 브랜치로 설정
  https://github.com/ysoftman/ysoftman.github.io/settings/pages
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
bun add serve-static marked showdown axios connect ajv \
    @fortawesome/fontawesome-free @mdi/font bootstrap
bun add --dev gh-pages clean-webpack-plugin \
    sass sass-loader css-loader style-loader \
    eslint prettier @babel/core babel-loader \
    html-webpack-plugin clean-webpack-plugin \
    webpack webpack-cli webpack-dev-server
```

## local 테스트

```bash
# 필요시(vim 에서 파일 저장시 자동 포맷팅되도록 했뒀음)
bun prettier . --write

# 실행
bun serve
```

## 빌드 배포

```bash
# 다음과 같이 빌드 후 배포하면 자동으로 ./dist 내용이 gh-pages 브랜치로 푸시된다.
bun run build && burn run deploy

# 주의 gh-pages 브랜치는 배포용이기 때문에 마스터에 머지 금지!!!
```
