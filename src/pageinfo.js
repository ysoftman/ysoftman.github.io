import { loadBasic } from "@tsparticles/basic";
import { tsParticles } from "@tsparticles/engine";
import packageJSON from "../package.json";

export const pageinfoAddEventListener = () => {
  let html = "[env from vite.config.js]";
  html += "<br>";
  html += `last version(tag): ${__LAST_VERSION_TAG__}`;
  html += "<br>";
  html += `last commit hash: ${__LAST_COMMIT_HASH__}`;
  html += "<br>";
  html += `last commit date: ${__LAST_COMMIT_DATE__}`;
  html += "<br>";
  html += `last commit message: ${__LAST_COMMIT_MESSAGE__}`;
  html += "<br>";
  html += `build date: ${__BUILD_DATE__}`;
  html += "<br>";
  html += "<br>";
  html += "[package.json]";
  html += "<br>";
  html += JSON.stringify(packageJSON, null, 2);
  const page_info_body = document.getElementById("page_info_body");
  if (page_info_body) {
    page_info_body.innerHTML = html;
  }

  loadBasic(tsParticles).then(() => {
    tsParticles
      .load({
        id: "tsparticles",
        options: {
          particles: {
            number: {
              value: 80,
            },
            size: {
              value: 3,
            },
            move: {
              enable: true,
              speed: 2,
            },
            links: {
              enable: true,
              distance: 150,
            },
            color: {
              value: "#ffffff",
            },
          },
        },
      })
      .then((container) => {
        console.log("tsparticles loaded successfully:", container);
      })
      .catch((error) => {
        console.error("Error loading tsparticles:", error);
      });
  });
};
