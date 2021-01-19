# ysoftman github pages :smile: ^^

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
yarn init
yarn add gh-pages marked showdown axios connect webpack-node-externals
yarn install

# 웹펙 전역 설치
yarn global add webpack webpack-cli

# package.json 추가

"scripts": {
  "build": "webpack",
  "deploy": "gh-pages -d dist"
}

# 실행
# node server.js
yarn run start

# webpack 으로 빌드 해서 ./dist 생성
# dist 디렉토리의 내용을 gh-pages 브랜치로 푸시(배포)
yarn run build && yarn run deploy
```
