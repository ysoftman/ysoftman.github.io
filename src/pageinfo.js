import { codeToHtml } from "./highlighter.js";
import packageJSON from "../package.json";

export const loadPageInfo = async () => {
  const vite_config = document.getElementById("vite_config");
  if (vite_config) {
    const text = `last version(tag): ${__LAST_VERSION_TAG__}
last commit hash: ${__LAST_COMMIT_HASH__}
last commit date: ${__LAST_COMMIT_DATE__}
last commit message: ${__LAST_COMMIT_MESSAGE__}
build date: ${__BUILD_DATE__}
runtime(Bun🐇/Node.js🐢): ${__RUNTIME__}`;
    vite_config.innerHTML = await codeToHtml(text, "yaml");
  }

  const package_json = document.getElementById("package_json");
  if (package_json) {
    const text = JSON.stringify(packageJSON, null, 2);
    package_json.innerHTML = await codeToHtml(text, "json");
  }
};
