import { execSync } from "node:child_process";
import { copyFileSync, cpSync, rmSync } from "node:fs";
import tailwind from "bun-plugin-tailwind";

function getGitInfo() {
  try {
    // github action 에서 태그정보를 파악할 수 있도록 다음 설정 추가
    // - name: Checkout repository
    //   uses: actions/checkout@v4
    //   with:
    //     # 전체 이력(tags 포함) 가져오기
    //     fetch-depth: 0
    //     # 또는 태그 정보 표시
    //     # tags: true

    // 현재 커밋에 Git 태그가 매칭되면 태그 사용 아니면 "develop"
    // "git describe main --tags --exact-match 2> /dev/null || echo 'develop'",
    // 커밋 해시나 태그 이후의 커밋 수를 포함하지 않고, 가장 가까운 태그 이름만 출력
    // "git describe main --tags --abbrev=0 2> /dev/null || echo 'develop'",
    const lastGitTag = execSync(
      "git describe main --tags --exact-match 2> /dev/null || echo 'develop'",
    )
      .toString()
      .trim();

    const lastGitCommitHash = execSync(
      "git log main -1 --date=iso-strict --pretty=format:'%H'",
    )
      .toString()
      .trim();
    const lastGitCommitDate = execSync(
      "git log main -1 --date=iso-strict --pretty=format:'%cd'",
    )
      .toString()
      .trim();
    const lastGitCommitMessage = execSync(
      "git log main -1 --pretty=format:'%s'",
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

// GitHub Pages 는 서버 rewrite 가 없어 /programs 요청이 404.html(상태 404)로 폴백된다.
// 빌드 시 라우트별 <route>.html 을 복사해 두면 GitHub Pages 가 /programs 를 programs.html 로 200 응답한다.
export const spaRoutes = [
  "/programs",
  "/projects",
  "/watchdust",
  "/github-webhook-action",
  "/pageinfo",
];

if (import.meta.main) {
  const gitInfo = getGitInfo();

  // github action 에서는 UTC라서 KST 로 변경
  let kstOffset = 0;
  if (Date().toString().includes("GMT+0000")) {
    kstOffset = 9 * 60 * 60 * 1000;
  }
  let kstDate = new Date(Date.now() + kstOffset).toString();
  kstDate = kstDate.replace(/GMT.*/, "");

  rmSync("dist", { recursive: true, force: true });

  // css, font(.woff, ttf, ...), image(png, jpg...) 은 자동으로 번들링된다.
  // NOTE: css url() 로 참조하는 128KB 미만 파일은 data: URL 로 css 에 인라인된다(끄는 옵션 없음, hack.css 참고).
  await Bun.build({
    entrypoints: ["src/index.html", "src/404.html"],
    outdir: "dist",
    minify: true,
    splitting: true,
    plugins: [tailwind],
    define: {
      __LAST_VERSION_TAG__: gitInfo.LAST_GIT_TAG,
      __LAST_COMMIT_HASH__: gitInfo.LAST_GIT_COMMIT_HASH,
      __LAST_COMMIT_DATE__: gitInfo.LAST_GIT_COMMIT_DATE,
      __LAST_COMMIT_MESSAGE__: gitInfo.LAST_GIT_COMMIT_MESSAGE,
      __BUILD_DATE__: JSON.stringify(kstDate),
      __RUNTIME__: JSON.stringify("Bun"),
    },
  });

  // vite publicDir 처럼 src/public(partials, images 등 고정 경로 파일)은 그대로 복사
  cpSync("src/public", "dist", { recursive: true });
  for (const route of spaRoutes) {
    copyFileSync("dist/index.html", `dist${route}.html`);
  }
}
