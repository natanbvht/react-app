// scripts/locale.js
"use strict";
const fs = require("fs");
const OpenAI = require("openai");
const config = require("./config.js");

const openai = new OpenAI({ apiKey: config.API_KEY });

async function testOpenAIConnection() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "ping" }],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content
      .toLocaleLowerCase()
      .includes("pong");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

async function translateJSON(jsonFile, language) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You will be provided with a Locale JSON file in English, and your task is to translate it into ${language}. Leave the keys in English, only translate the values.`,
        },
        {
          role: "user",
          content: `${jsonFile}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    const json = JSON.parse(completion.choices[0].message.content);
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function translateAllFiles(files, languages) {
  const translationPromises = files.flatMap(({ name, content }) =>
    languages.map((language) =>
      translateJSON(content, language).then((translatedJson) => {
        const outputPath = `./public/locales/${language}/${name}`;
        fs.mkdirSync(`./public/locales/${language}`, { recursive: true }); // Ensure the directory exists
        fs.writeFileSync(outputPath, JSON.stringify(translatedJson, null, 2));
        console.log(`Translated ${name} into ${language}`);
      })
    )
  );

  await Promise.all(translationPromises);
}

async function main() {
  try {
    // 1. Test OpenAI connection
    const connected = await testOpenAIConnection();
    if (!connected) throw new Error("OpenAI connection failed");
    console.log("OpenAI connection successful");

    // 2. Load sitemap.json
    if (!fs.existsSync(config.JSON_SITEMAP_PATH)) {
      console.log("Sitemap.json not found");
      process.exit(1);
    }
    const siteMapJsonFile = fs.readFileSync(config.JSON_SITEMAP_PATH, "utf8");
    const sitemap = JSON.parse(siteMapJsonFile);
    console.log("Sitemap.json loaded");

    let languages = sitemap.map((page) => page?.language?.value);
    languages = [...new Set(languages)].filter((lang) => lang);

    // 3. Check English Locale file exists
    if (!fs.existsSync(config.ENGLIGH_LOCALE_PATH)) {
      console.log("Locale.json not found");
      process.exit(1);
    }
    console.log("en-US/common.json loaded");

    // 4. Load all English locale files
    const enFiles = fs.readdirSync("./public/locales/en-US").map((fileName) => ({
      name: fileName,
      content: fs.readFileSync(`./public/locales/en-US/${fileName}`, "utf8"),
    }));

    await translateAllFiles(enFiles, languages);

    console.log("All translations completed successfully.");
    process.exit(0); // Successful exit
  } catch (error) {
    console.error("An error occurred during the translation process:", error);
    process.exit(1); // Exit with error
  }
}

(async () => {
  await main();
})();
