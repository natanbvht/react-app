// scripts/config.js
"use strict";
const path = require("path");
const CYPRESS = "../cypress/downloads/sitemap.json";
const ignorePaths = [
  "/cb", // Apple CB
  "/404",
  "/download",
  "/checkout",
  "/subscribe/cb", // Apple CB
  "/subscribe-v1",
  "/subscribe/completed",
  "/subscribe-v1/:stepId",
];
const logos = [
  "https://metaintro.net/assets/logos/logo512.png",
  "https://metaintro.net/assets/logos/wide-md.png",
  "https://metaintro.net/assets/logos/dark-mode-wide-md.png",
];

module.exports.logos = logos;
module.exports.ignorePaths = ignorePaths;
module.exports.PROD_CANONICAL_URL = "https://metaintro.net";
module.exports.JSON_SITEMAP_PATH = path.join(__dirname, `${CYPRESS}`);
module.exports.XML_SITEMAP_PATH = path.join(__dirname, "../public/sitemap.xml");
module.exports.ENGLIGH_LOCALE_PATH = path.join(
  __dirname,
  "../public/locales/en-US/common.json"
);
module.exports.API_KEY = "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";
