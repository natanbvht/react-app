// scripts/sitemap.js
"use strict";
const fs = require("fs");
const config = require("./config.js");

function generateSitemap(entries, filePath) {
  // Start the sitemap XML content
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;

  for (const entry of entries) {
    sitemapContent += `   <url>\n`;
    sitemapContent += `      <loc>${entry.rootEntry.url}</loc>\n`;

    if (entry.rootEntry.changefreq) {
      sitemapContent += `      <changefreq>${entry.rootEntry.changefreq}</changefreq>\n`;
    }

    if (entry.rootEntry.priority) {
      sitemapContent += `      <priority>${entry.rootEntry.priority}</priority>\n`;
    }

    if (entry.rootEntry.lastmod) {
      sitemapContent += `      <lastmod>${entry.rootEntry.lastmod}</lastmod>\n`;
    }

    if (entry.alternatives) {
      for (const alternative of entry.alternatives) {
        sitemapContent += `      <xhtml:link rel="alternate" hreflang="${alternative.hrefLang}" href="${alternative.href}" />\n`;
      }
    }

    if (entry.rootEntry.images) {
      for (const image of entry.rootEntry.images) {
        sitemapContent += `      <image:image>\n`;
        sitemapContent += `         <image:loc>${image}</image:loc>\n`;
        sitemapContent += `      </image:image>\n`;
      }
    }

    sitemapContent += `   </url>\n`;
  }

  // Close the sitemap content
  sitemapContent += `</urlset>`;

  // Write the sitemap content to the file
  fs.writeFile(filePath, sitemapContent, (err) => {
    if (err) {
      console.log("Error writing sitemap file:", err);
    } else {
      console.log("Sitemap file has been successfully written.");
    }
  });
}
function getLastmod() {
  const lastmod = new Date();
  const year = lastmod.getFullYear();
  const month = (lastmod.getMonth() + 1).toString().padStart(2, "0");
  const day = lastmod.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

/**
 * example: sitemap.json
 * [
 *  {
 *   "path": "/subscribe",
 *   "isLangPath": false,
 *   "config": Obj,
 *   "seo": Obj,
 *   "langurl": Obj,
 *  },
 * ]
 */
function main() {
  // Check if sitemap.json exists
  if (!fs.existsSync(config.JSON_SITEMAP_PATH)) {
    console.log("sitemap.json not found");
    process.exit(1);
  }

  // Read sitemap.json
  const sitemap = JSON.parse(fs.readFileSync(config.JSON_SITEMAP_PATH, "utf8"));

  const freq = "weekly";
  const sitemapEntries = [];
  const lastmod = getLastmod();
  const sitemapEntriesByRootPath = {};

  const languages = sitemap.map((link) => link?.language?.label);
  const uniqueLanguages = [...new Set(languages)];

  sitemap.forEach((link) => {
    const rootPath = link.isLangPath
      ? link.path.replace(link.language.path, "")
      : link.path;

    if (!config.ignorePaths.includes(rootPath)) {
      const url = `${config.PROD_CANONICAL_URL}${link.path}`;

      if (!sitemapEntriesByRootPath[rootPath]) {
        sitemapEntriesByRootPath[rootPath] = {
          rootEntry: {
            url,
            lastmod,
            changefreq: freq,
            priority: link.isLangPath ? "0.8" : "1.0",
            images: link.images ? link.images : config.logos,
          },
          alternatives: [],
        };
      }

      if (link.isLangPath) {
        sitemapEntriesByRootPath[rootPath].alternatives.push({
          href: url,
          hrefLang: link?.language?.shortCode?.toLocaleLowerCase(),
        });
      }
    }
  });

  generateSitemap(
    Object.values(sitemapEntriesByRootPath),
    config.XML_SITEMAP_PATH
  );

  const pages = Object.keys(sitemapEntriesByRootPath).length;

  // Output summary of sitemap generation
  console.log(`Sitemap generation completed:
  - Total pages: ${pages * uniqueLanguages.length}
  - Total root pages: ${pages}
  - Languages included: 
    • English ${uniqueLanguages.join("\n    • ")}`);
}

main();
