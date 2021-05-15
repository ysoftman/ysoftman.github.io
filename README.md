# <https://ysoftman.github.io> :smile: ^^

```text
                     ______
   __  ___________  / __/ /_____ ___  ____ _____
  / / / / ___/ __ \/ /_/ __/ __ `__ \/ __ `/ __ \
 / /_/ (__  ) /_/ / __/ /_/ / / / / / /_/ / / / /
 \__, /____/\____/_/  \__/_/ /_/ /_/\__,_/_/ /_/
/____/
```

## local 테스트

```bash
# 실행
# http-server 툴 이용시 실행
npm install http-server -g
http-server
```

## 빌드 배포

```bash
# 최초 설정
nvm install 10.19.0
nvm ls
yarn init
yarn add marked showdown axios connect gh-pages
yarn install

# 웹펙 전역 설치
yarn global add webpack webpack-cli

# package.json 설정
"scripts": {
  "build": "webpack",
  "deploy": "cp -v *.html *.css *.md ./dist; gh-pages -d dist"
}

# 실행
# node server.js
yarn run start

# 배포
# 깃헙 페이지 소스는 gh-pages 브랜치로 설정(최초설정)
https://github.com/ysoftman/ysoftman.github.io/settings/pages
-> github pages -> source -> gh-pages 브랜치 설정

# 다음과 같이 빌드 후 배포하면 자동으로 ./dist 내용이 gh-pages 브랜치로 푸시된다.
yarn run build && yarn run deploy
```
