# <https://ysoftman.github.io>

## prerequisite

```bash
# install latest nodejs
https://github.com/nodesource/distributions

# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# (최초 한번만 설정) - 패키지 설치
nvm install --lts
nvm use --lts
nvm ls
yarn init
yarn add serve-static marked showdown axios connect gh-pages clean-webpack-plugin style-loader sass-loader css-loader -D
yarn add eslint prettier
yarn global add webpack webpack-cli

# (최초 한번만 설정) - 깃헙 페이지 소스는 gh-pages 브랜치로 설정
https://github.com/ysoftman/ysoftman.github.io/settings/pages
-> github pages -> source -> gh-pages 브랜치 설정
```

## local 테스트

```bash
# 필요시(vim 에서 파일 저장시 자동 포맷팅되도록 했뒀음)
yarn prettier . --write

# (server.js 실행)
yarn build && yarn start
```

## 빌드 배포

```bash
# 다음과 같이 빌드 후 배포하면 자동으로 ./dist 내용이 gh-pages 브랜치로 푸시된다.
yarn build && yarn deploy

# 주의 gh-pages 브랜치는 배포용이기 때문에 마스터에 머지 금지!!!
```
