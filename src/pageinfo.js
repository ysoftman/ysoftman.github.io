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
};
