import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { execSync } from "child_process";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
// 현재 커밋에 Git 태그가 매칭되면 태그 사용 아니면 "develop"
const gitTag = execSync(
  "git describe --tags --exact-match 2> /dev/null || echo 'develop'",
)
  .toString()
  .trim();
const gitCommit = execSync(
  "git log master -1 --date=iso-strict --pretty=format:'%H'",
)
  .toString()
  .trim();
const gitCommitDate = execSync(
  "git log master -1 --date=iso-strict --pretty=format:'%cd'",
)
  .toString()
  .trim();

// github action 에서는 UTC라서 KST 로 변경
let kstOffset = 0;
if (Date().toString().includes("GMT+0000")) {
  kstOffset = 9 * 60 * 60 * 1000;
}
let kstDate = new Date(new Date().getTime() + kstOffset).toString();
kstDate = kstDate.replace(/GMT.*/, "");

export default defineConfig({
  // index.html 위치,  아래 모든 설정의 경로의 시작
  root: process.cwd() + "/src",
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
    __VERSION_TAG__: JSON.stringify(gitTag),
    __COMMIT_HASH__: JSON.stringify(gitCommit),
    __COMMIT_DATE__: JSON.stringify(gitCommitDate),
    __BUILD_DATE__: "'" + kstDate + "'",
    // token 은 푸시가 안된다. gitub action secret  로 등록해도 배포하면 보안을 위해 토큰을 만료 시켜버려 사용하지 않기로 함.
    // https://docs.github.com/ko/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation#token-revoked-when-pushed-to-a-public-repository-or-public-gist
    // __MYENV_READONLY_TOKEN__: "'" + process.env.myenv_readonly_token + "'",
  },

  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.names[0].split(".").at(1);
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
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: "index.js",
          filename: "index.html",
          template: "index.html",
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
