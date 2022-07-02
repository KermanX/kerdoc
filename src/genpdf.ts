import { chromium } from "playwright";
import { PageSize } from "./size.js";

export async function genPDF(html: string, size?: PageSize): Promise<Buffer> {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.emulateMedia({ media: "screen" });
  const pdf = await page.pdf({
    width: size?.width,
    height: size?.height
  });
  browser.close();
  return pdf;
}
