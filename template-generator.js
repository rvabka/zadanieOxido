import { writeFileSync } from "fs";

const templateHtml = `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Podgląd Artykułu</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
 <style>
      :root {
        --max-width: 900px;
        --font-sans: "Poppins", sans-serif;;
      }

      body {
        font-family: var(--font-sans);
        line-height: 1.6;
        color: #1a1a1a;
        margin: 0;
        padding: 20px;
        background: #ffffff;
      }

      article {
        max-width: var(--max-width);
        margin: 40px auto;
      }

      h1 {
        font-size: 4.5rem;
        font-weight: 400;
        line-height: 1.2;
        margin-bottom: 1rem;
        text-align: center;
        background: #696969;
        background: linear-gradient(
          to right,
          #1e3a8a 0%,
          #3b82f6 50%,
          #1e3a8a 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      h2 {
        font-size: 1.75rem;
        font-weight: 600;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
      }

      p {
        margin-bottom: 1.5rem;
        font-size: 1.125rem;
        color: #333;
      }

      figure {
        margin: 2rem 0;
        border-radius: 12px;
        overflow: hidden;
      }

      img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 12px;
      }

      figcaption {
        font-size: 0.875rem;
        color: #666;
        text-align: center;
        margin-top: 0.5rem;
      }

      section {
        margin: 2rem 0;
      }

      blockquote {
        margin: 2rem 0;
        padding: 1rem 1.5rem;
        border-left: 4px solid #e0e0e0;
        background: #f8f8f8;
        font-style: italic;
      }

      blockquote p {
        margin: 0;
        color: #555;
      }

      @media (max-width: 768px) {
        body {
          padding: 16px;
        }

        h1 {
          font-size: 2rem;
        }

        h2 {
          font-size: 1.5rem;
        }

        p {
          font-size: 1rem;
        }
      }
      .controls {
        position: fixed;
        top: 1rem;
        right: 1rem;
        background: white;
        padding: 0.75rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
          0 1px 2px 0 rgba(0, 0, 0, 0.06);
        display: flex;
        gap: 0.5rem;
      }

      footer {
        p {
          font-size: 0.875rem;
          color: #666;
          text-align: center;
          margin-top: 3rem;
        }
      }
    </style>
</head>
<body>
    <div class="article-content"></div>
</body>
</html>`;

function saveTemplate() {
  try {
    writeFileSync("szablon.html", templateHtml);
    console.log("Successfully saved szablon.html");
  } catch (error) {
    console.error("Error saving template:", error);
  }
}

function createPreview(articleContent) {
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

export { saveTemplate, createPreview };