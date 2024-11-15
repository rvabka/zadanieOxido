import { readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import OpenAI from "openai";

const API_KEY = new OpenAI({
  apiKey: "", // here paste your OpenAI API key
});

function readArticleFromFile(filePath) {
  try {
    return readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Something went wrong while reading the article ", error);
    throw error;
  }
}

// Function to save HTML content to a file
function saveFileToHTML(htmlFile) {
  try {
    writeFileSync("artykul.html", htmlFile);
    console.log("Successfully saved artykul.html");
  } catch (error) {
    console.error("Something went wrong while saving the article ", error);
    throw error;
  }
}

// Function to process article content with AI and convert it to HTML
async function processArticleWithAI(articleContent) {
  const userPrompt = `
    Przekształć poniższy artykuł na kod HTML zgodnie z poniższymi wytycznymi:
      1. Strukturyzuj artykuł za pomocą odpowiednich, semantycznych tagów HTML, takich jak <h1>...<h6>, <p>, <ul>, <ol>, <blockquote> itp.
      2. Wybierz i oznacz odpowiednie miejsca na grafiki w treści artykułu, używając tagów <img>. Każdy tag <img> powinien zawierać następujące atrybuty:
          - src="image_placeholder.jpg"
          - atrybut alt zawierający szczegółowy opis grafiki do wygenerowania w języku polskim (przykładowo, "Mapa przedstawiająca główne szlaki handlowe średniowiecznej Europy")
      3. Umieść podpisy pod grafikami za pomocą tagów HTML (<figcaption>) odpowiednich dla opisów obrazów.
      4. Nie dodawaj kodu CSS ani JavaScript – generowany kod powinien zawierać wyłącznie treść, którą można umieścić między tagami <body> i </body>.
      5. Nie dodawaj tagów <html>, <head> ani <body>. Wygenerowany kod powinien być przygotowany do zapisania w pliku HTML i zawierać wyłącznie strukturę treści.
      6. Zachowaj logiczny podział treści, umieszczając tytuły sekcji, akapity i listy tam, gdzie są one potrzebne, aby treść była czytelna.

    Treść artykułu:
    ${articleContent}
  `;

  const systemPrompt = `
    You are an HTML converter specialized in:
      - Converting Polish articles to semantic HTML
      - Following strict HTML structure rules
      - Placing appropriate image suggestions becouse its really important for seo
      - Writing all descriptions in Polish
      - Never including html/head/body tags
      - Focusing on content structure only
  `;

  try {
    const completion = await API_KEY.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Something went wrong while processing the article with AI ", error);
    throw error;
  }
}

// Function to create a preview HTML file from the article content
function createPreview(articleContent) {
  const __dirname = resolve();
  const templatePath = join(__dirname, "szablon.html");
  const templateHtml = readFileSync(templatePath, "utf-8");

  try {
    const previewHtml = templateHtml.replace(
      '<div class="article-content">',
      `<div class="article-content">\n${articleContent}`
    );

    writeFileSync("podglad.html", previewHtml);
    console.log("Successfully saved podglad.html");
  } catch (error) {
    console.error("Error creating preview:", error);
  }
}

// Main function to read article, process it with AI, and create a preview
async function main() {
  try {
    const articleContent = readArticleFromFile("tekstArtykulu.txt");
    const htmlContent = await processArticleWithAI(articleContent);
    saveFileToHTML(htmlContent);
    createPreview(htmlContent);
  } catch (error) {
    console.error("Something went wrong while processing the article ", error);
    process.exit(1);
  }
}

main();
