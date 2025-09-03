import { Page } from "patchright";
import { sleep } from "../utils/sleep";

export async function checkWerwolfs(page: Page) {
  try {
    await sleep(1000);
    await page.goto("https://mvoo.ru", {
      waitUntil: "domcontentloaded",
    });
    const text = await page
      .locator("td.notice_content")
      .allInnerTexts();
    const is_wervolfs = text
      .join(",")
      .includes("Оборотни прорвались в страны");
    await sleep(1000);
    return is_wervolfs;
  } catch (error) {
    console.error("Не удалось проверить оборотней", error);
  }
}
