import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";

export default defineConfig({
  // inex.html 위치,  아래 모든 설정의 경로의 시작
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
