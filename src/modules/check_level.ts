import { Page } from "patchright";
import { sleep } from "../utils/sleep";

export async function checkLevel(page: Page) {
  try {
    await page.goto("https://mvoo.ru",{waitUntil:"domcontentloaded"})
    await sleep(3000);
    const level = await page
      .locator(".user_link")
      .innerText();
    await sleep(1000);
    return +level.replace(/^.*\[(\d+)\]$/, "$1");
  } catch (error) {
    console.error("Не удалось узнать уровень", error);
  }
}
