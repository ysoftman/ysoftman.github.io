import { loadBasic } from "@tsparticles/basic";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import { loadFirePreset } from "@tsparticles/preset-fire";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { loadLinksPreset } from "@tsparticles/preset-links";
import { tsParticles } from "@tsparticles/engine";
import hljs from "highlight.js";
import packageJSON from "../package.json";

export const pageinfoAddEventListener = () => {
  const vite_config = document.getElementById("vite_config");
  if (vite_config) {
    vite_config.textContent = `last version(tag): ${__LAST_VERSION_TAG__}
last commit hash: ${__LAST_COMMIT_HASH__}
last commit date: ${__LAST_COMMIT_DATE__}
last commit message: ${__LAST_COMMIT_MESSAGE__}
build date: ${__BUILD_DATE__}`;
  }

  const package_json = document.getElementById("package_json");
  if (package_json) {
    package_json.textContent = JSON.stringify(packageJSON, null, 2);
  }
  hljs.highlightElement(document.getElementById("package_json"));

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
