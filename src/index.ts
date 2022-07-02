import { writeFileSync } from "fs";
import { genPDF } from "./genpdf.js";
import { PageSize } from "./size.js";

export interface KerdocLoopCtx {
  apply(html: string): void;
  finish(): void;
}

export function kerdoc(
  PDFPath: string,
  size: PageSize,
  loop: (ctx: KerdocLoopCtx, index: number) => void
) {
  let result = "";
  function x(index: number) {
    loop(
      {
        apply: (html: string) => {
          result += html;
          x(index + 1);
        },
        finish: () => {
          (async () => {
            writeFileSync(PDFPath, await genPDF(result, size));
          })();
        },
      },
      index
    );
  }
  x(0);
}

export { genPDF };
export * from "./size.js";
