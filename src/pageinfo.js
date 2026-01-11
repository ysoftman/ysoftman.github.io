import { loadBasic } from "@tsparticles/basic";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import { loadFirePreset } from "@tsparticles/preset-fire";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { loadLinksPreset } from "@tsparticles/preset-links";
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

  loadBasic(tsParticles)
    .then(() => {
      return Promise.all([
        loadSnowPreset(tsParticles),
        loadFirePreset(tsParticles),
        loadBubblesPreset(tsParticles),
        loadFireworksPreset(tsParticles),
        loadLinksPreset(tsParticles),
        loadSeaAnemonePreset(tsParticles),
      ]);
    })
    .then(() => {
      const presets = [
        "snow",
        "fire",
        "bubbles",
        "fireworks",
        "seaAnemone",
        "links",
      ];
      const randomPreset = presets[Math.floor(Math.random() * presets.length)];
      tsParticles
        .load({
          id: "tsparticles",
          options: {
            preset: randomPreset,
            background: {
              color: {
                value: "#000000",
              },
            },
          },
        })
        .then((container) => {
          console.log(
            `tsparticles loaded with preset: ${randomPreset}`,
            container,
          );
        })
        .catch((error) => {
          console.error("Error loading tsparticles:", error);
        });
    });
};
