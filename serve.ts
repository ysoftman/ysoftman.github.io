import { spaRoutes } from "./build.ts";
import index from "./src/index.html";

// bun serve.ts         : 개발 서버(HMR), 번들 설정(plugins, define)은 bunfig.toml [serve.static]
// bun serve.ts preview : 빌드 결과(dist) 확인, GitHub Pages 처럼 /programs -> programs.html
const preview = Bun.argv[2] === "preview";
const dir = preview ? "dist" : "src/public";

const server = Bun.serve({
  hostname: "127.0.0.1",
  port: 8080,
  routes: preview
    ? {}
    : Object.fromEntries(["/", ...spaRoutes].map((r) => [r, index])),
  async fetch(req) {
    const { pathname } = new URL(req.url);
    for (const path of [
      pathname,
      `${pathname}.html`,
      `${pathname}index.html`,
    ]) {
      const file = Bun.file(dir + path);
      if (await file.exists()) return new Response(file);
    }
    const notFound = Bun.file(`${dir}/404.html`);
    return new Response((await notFound.exists()) ? notFound : "Not Found", {
      status: 404,
    });
  },
});
console.log(server.url.href);
