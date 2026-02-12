import { execSync } from "node:child_process";
import path from "node:path";

import dotenv from "dotenv";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import tailwindcss from "@tailwindcss/vite";

dotenv.config({ path: path.resolve(__dirname, ".env") });

function getGitInfo() {
  try {
    // github action 에서 태그정보를 파악할 수 있도록 다음 설정 추가
    // - name: Checkout repository
    //   uses: actions/checkout@v4
    //   with:
    //     # 전체 이력(tags 포함) 가져오기
    //     fetch-depth: 0
    //     # 또는 태그 정보  표시
    //     # tags: true

    // 현재 커밋에 Git 태그가 매칭되면 태그 사용 아니면 "develop"
    // "git describe master --tags --exact-match 2> /dev/null || echo 'develop'",
    // 커밋 해시나 태그 이후의 커밋 수를 포함하지 않고, 가장 가까운 태그 이름만 출력
    // "git describe master --tags --abbrev=0 2> /dev/null || echo 'develop'",
    const lastGitTag = execSync(
      "git describe master --tags --exact-match 2> /dev/null || echo 'develop'",
    )
      .toString()
      .trim();

    const lastGitCommitHash = execSync(
      "git log master -1 --date=iso-strict --pretty=format:'%H'",
    )
      .toString()
      .trim();
    const lastGitCommitDate = execSync(
      "git log master -1 --date=iso-strict --pretty=format:'%cd'",
    )
      .toString()
      .trim();
    const lastGitCommitMessage = execSync(
      "git log master -1 --pretty=format:'%s'",
    )
      .toString()
      .trim();
    return {
      LAST_GIT_TAG: JSON.stringify(lastGitTag),
      LAST_GIT_COMMIT_HASH: JSON.stringify(lastGitCommitHash),
      LAST_GIT_COMMIT_DATE: JSON.stringify(lastGitCommitDate),
      LAST_GIT_COMMIT_MESSAGE: JSON.stringify(lastGitCommitMessage),
    };
  } catch {
    console.warn("Git command failed, returning default values.");
    return {
      LAST_GIT_TAG: JSON.stringify("unknown"),
      LAST_GIT_COMMIT_HASH: JSON.stringify("unknown"),
      LAST_GIT_COMMIT_DATE: JSON.stringify("unknown"),
      LAST_GIT_COMMIT_MESSAGE: JSON.stringify("unknown"),
    };
  }
}
const gitInfo = getGitInfo();

// github action 에서는 UTC라서 KST 로 변경
let kstOffset = 0;
if (Date().toString().includes("GMT+0000")) {
  kstOffset = 9 * 60 * 60 * 1000;
}
let kstDate = new Date(Date.now() + kstOffset).toString();
kstDate = kstDate.replace(/GMT.*/, "");

export default defineConfig({
  // index.html 위치,  아래 모든 설정의 경로의 시작
  root: `${process.cwd()}/src`,
  entry: "./src/index.js",
  mode: "development",
  base: "/",
  server: {
    host: "127.0.0.1",
    port: 8080,
    open: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 8080,
    open: true,
  },

  define: {
    __LAST_VERSION_TAG__: gitInfo.LAST_GIT_TAG,
    __LAST_COMMIT_HASH__: gitInfo.LAST_GIT_COMMIT_HASH,
    __LAST_COMMIT_DATE__: gitInfo.LAST_GIT_COMMIT_DATE,
    __LAST_COMMIT_MESSAGE__: gitInfo.LAST_GIT_COMMIT_MESSAGE,
    __BUILD_DATE__: `'${kstDate}'`,
    // NOTE: myenv file 조회등의 api 사용을 위해 사용하려고했었는데 token 은 푸시가 안된다. github action secret 로 등록해도 배포하면 보안을 위해 토큰을 만료 시켜버려 사용하지 않기로 함.
    // https://docs.github.com/ko/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation#token-revoked-when-pushed-to-a-public-repository-or-public-gist
    // __MYENV_READONLY_TOKEN__: "'" + process.env.myenv_readonly_token + "'",
    // 현재 실행 환경이 Bun인지 체크하여 프론트엔드 코드에 전달 가능
    __RUNTIME__: JSON.stringify(process.versions.bun ? "Bun" : "Node.js"),
  },

  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.names[0].split(".").at(1);
          //console.log("---------", assetInfo.names);
          // image 파일등 번들 위치 수정
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `images/[name][extname]`;
          }
          return `[name][extname]`;
        },
        chunkFileNames: "[name]-[hash].js",
        entryFileNames: "[name]-[hash].js",
      },
    },
    emptyOutDir: true,
    outDir: "../dist",
  },

  // css, font(.woff, ttf, ...), image(png, jpg...) 은 자동 으로 번들링된다.
  // md 파일 번들에 포함
  assetsInclude: ["**/*.md"],

  plugins: [
    tailwindcss(),
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: "index.js",
          filename: "index.html",
          template: "index.html",
        },
        {
          entry: "index.js",
          filename: "404.html",
          template: "404.html",
        },
        {
          filename: "navbar.html",
          template: "navbar.html",
        },
        {
          entry: "programs.js",
          filename: "programs.html",
          template: "programs.html",
        },
        {
          entry: "restaurant.js",
          filename: "restaurant.html",
          template: "restaurant.html",
        },
        {
          filename: "pageinfo.html",
          template: "pageinfo.html",
        },
      ],
    }),
  ],
  resolve: {
    //alias: [
    //  { find: "@", replacement: path.resolve(__dirname, "src") },
    //  { find: "@assets", replacement: path.resolve(__dirname, "src/images") },
    //],
  },
});
