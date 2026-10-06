import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import bash from "shiki/langs/bash.mjs";
import json from "shiki/langs/json.mjs";
import vim from "shiki/langs/vim.mjs";
import yaml from "shiki/langs/yaml.mjs";
import nightOwl from "shiki/themes/night-owl.mjs";

let highlighterPromise = null;

export function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [nightOwl],
      langs: [bash, json, vim, yaml],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return highlighterPromise;
}

export async function codeToHtml(code, lang = "text") {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    theme: "night-owl",
  });
}
