// scripts/i18next.js
"use strict";
const fs = require("fs");
const yargs = require("yargs");
const OpenAI = require("openai");
const readline = require('readline');
const config = require("./config.js");
const { hideBin } = require("yargs/helpers");

const openai = new OpenAI({ apiKey: config.API_KEY });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

const getMenuArgs = () => {
  return yargs(hideBin(process.argv))
    .option("all", {
      alias: "a",
      type: "boolean",
      description: "Translate all files",
    })
    .option("file", {
      alias: "f",
      type: "string",
      description: "Translate a specific file",
    }).argv;
};

function showMenu() {
  console.log('Menu:');
  console.log('1. Option 1');
  console.log('2. Option 2');
  console.log('3. Option 3');
  console.log('4. Exit');

  rl.question('Please select an option: ', (answer) => {
      switch(answer) {
          case '1':
              console.log('Option 1 selected');
              // Add your logic for Option 1
              break;
          case '2':
              console.log('Option 2 selected');
              // Add your logic for Option 2
              break;
          case '3':
              console.log('Option 3 selected');
              // Add your logic for Option 3
              break;
          case '4':
              console.log('Exiting...');
              rl.close();
              return;
          default:
              console.log('Invalid option, please try again.');
      }
      showMenu(); // Show the menu again
  });
}

async function main() {
//  const argv = getMenuArgs();
//   await showMenu();

  // 1. Test OpenAI connection
  const connected = await testOpenAIConnection();
  if (!connected) {
    console.log("OpenAI connection failed");
    for (let i = 0; i < 3; i++) {
      console.log("Retrying...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const connected = await testOpenAIConnection();
      if (connected) break;
    }
  }
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

  // 4. Get all files in en-US folder, iterate over them and translate them
  const enFiles = fs.readdirSync("./public/locales/en-US");

  for (const file of enFiles) {
    // if (argv.all || file === argv.file) {
      console.time(`TranslationTime-${file}`);
      const jsonFile = fs.readFileSync(
        `./public/locales/en-US/${file}`,
        "utf8"
      );
      const json = JSON.parse(jsonFile);
      for (const language of languages) {
        const translatedJson = await translateJSON(jsonFile, language);
        fs.mkdirSync(`./public/locales/${language}`, { recursive: true });
        fs.writeFileSync(
          `./public/locales/${language}/${file}`,
          JSON.stringify(translatedJson, null, 2)
        );
        console.log(`Translated ${file} into ${language}`);
      }
      console.timeEnd(`TranslationTime-${file}`);
    }
  // }
}

(async () => {
  await main();
})();
