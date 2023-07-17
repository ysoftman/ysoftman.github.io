# <https://ysoftman.github.io>

## local 테스트

```bash
# 실행
npm install http-server -g
http-server
# 또는
node server.js
# 또는
yarn run start
```

## 빌드 배포

```bash
# (최초 한번만 설정) - 패키지 설치
nvm install 14.7.0
nvm ls
nvm use v14.7.0
yarn init
yarn add marked showdown axios connect gh-pages
yarn install
yarn global add webpack webpack-cli
# package.json 빌드, 배포 명령이 다음과 같이 설정되어 있음
"scripts": {
  "build": "webpack",
  "deploy": "cp -v *.html *.css *.md ./dist; gh-pages -d dist"
}

# (최초 한번만 설정) - 깃헙 페이지 소스는 gh-pages 브랜치로 설정
https://github.com/ysoftman/ysoftman.github.io/settings/pages
-> github pages -> source -> gh-pages 브랜치 설정

# 다음과 같이 빌드 후 배포하면 자동으로 ./dist 내용이 gh-pages 브랜치로 푸시된다.
yarn run build && yarn run deploy

# 주의 gh-pages 브랜치는 배포용이기 때문에 마스터에 머지 금지!!!
```
