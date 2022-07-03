import { writeFileSync } from "fs";
import { KerdocStyle } from "./docstyle.js";
import { genPDF } from "./genpdf.js";
import { PageSize } from "./pagesize.js";

export interface KerdocPage {
  html: string;
  additionalStyles?: string;
}

export interface KerdocDoc {
  pages: KerdocPage[];
  size: PageSize;
  style: Partial<KerdocStyle>;
  additionalStyles?: string;
}

export function page(html: string, additionalStyles?: string): KerdocPage {
  return { html, additionalStyles };
}

export function doc(
  size: PageSize,
  pages: KerdocPage[],
  style: Partial<KerdocStyle> = {},
  additionalStyles?: string
): KerdocDoc {
  return { size, pages, style, additionalStyles };
}

export async function kerdoc(doc: KerdocDoc): Promise<Buffer>;
export async function kerdoc(doc: KerdocDoc, outfile: string): Promise<void>;
export async function kerdoc(
  doc: KerdocDoc,
  outfile?: string
): Promise<void | Buffer> {
  const pageStyle = `
  page-break-after: always;
  width: ${doc.size.width};
  height: ${doc.size.height};
  ${(() => {
    if (doc.style.border) {
      if (typeof doc.style.border === "string") {
        return `border: ${doc.style.border};`;
      } else {
        return `border: 1px black solid;`;
      }
    }
  })()}
  ${(() => {
    if (doc.style.padding) {
      if (typeof doc.style.padding === "string") {
        return `padding: ${doc.style.padding};`;
      } else if (Array.isArray(doc.style.padding)) {
        return `padding: ${doc.style.padding.join(" ")};`;
      } else if (typeof doc.style.padding === "object") {
        return `padding: ${doc.style.padding.top ?? ""} ${
          doc.style.padding.right ?? ""
        } ${doc.style.padding.bottom ?? ""} ${doc.style.padding.left ?? ""};`;
      }
    }
  })()}
  `;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          .page {
            ${pageStyle}
          }
          ${doc.additionalStyles ?? ""}
        </style>
      </head>
      <body>
        ${doc.pages
          .map(
            (page) => `<div class="page"${
              page.additionalStyles ? ` style="${page.additionalStyles}"` : ""
            }>
          ${page.html}
        </div>`
          )
          .join(`\n        <!-- pagebreak -->\n        `)}
      </body>
    </html>
  `;
  console.log(html);
  writeFileSync("./out/t.html", html);
  const buf = await genPDF(html, doc.size);
  if (outfile) {
    writeFileSync(outfile, buf);
  } else {
    return buf;
  }
}

export { genPDF };
export * from "./pagesize.js";
