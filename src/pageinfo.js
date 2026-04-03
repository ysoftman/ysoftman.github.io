import { loadBasic } from "@tsparticles/basic";
import { tsParticles } from "@tsparticles/engine";
// 다음 효과들은 배경색이 transparent 이 동작하지 않아 사용하지 않는다.
// import { loadFirePreset } from "@tsparticles/preset-fire";
// import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
// import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import { loadSnowPreset } from "@tsparticles/preset-snow";
import hljs from "highlight.js";
import packageJSON from "../package.json";

export const pageinfoAddEventListener = () => {
  const vite_config = document.getElementById("vite_config");
  if (vite_config) {
    vite_config.textContent = `last version(tag): ${__LAST_VERSION_TAG__}
last commit hash: ${__LAST_COMMIT_HASH__}
last commit date: ${__LAST_COMMIT_DATE__}
last commit message: ${__LAST_COMMIT_MESSAGE__}
build date: ${__BUILD_DATE__}
runtime(Bun🐇/Node.js🐢): ${__RUNTIME__}`;
  }
  hljs.highlightElement(document.getElementById("vite_config"));

  const package_json = document.getElementById("package_json");
  if (package_json) {
    package_json.textContent = JSON.stringify(packageJSON, null, 2);
  }
  hljs.highlightElement(document.getElementById("package_json"));

  // 이전 tsParticles 인스턴스 정리 (SPA 네비게이션으로 재진입 시 stale 컨테이너 방지)
  tsParticles.dom().forEach((c) => {
    c.destroy();
  });

  loadBasic(tsParticles)
    .then(() => {
      return Promise.all([loadSnowPreset(tsParticles)]);
    })
    .then(() => {
      tsParticles
        .load({
          id: "tsparticles",
          options: {
            preset: "snow",
            background: {
              color: {
                value: "transparent",
              },
            },
          },
        })
        .catch((error) => {
          console.error("Error loading tsparticles:", error);
        });
    });
};
