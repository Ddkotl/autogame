import { Page } from "patchright";
import { sleep } from "../utils/sleep";

export async function getResursesToSquad(page: Page) {
  try {
    await page.goto("https://mvoo.ru/clan/castle/?resources", {
      waitUntil: "domcontentloaded",
    });
    await sleep(3000);
    await page.locator(".button_small").click();
    await sleep(3000);
    await page.fill('input[name="gold"]', "10");
    await page.locator(".button_small").click();
  } catch (error) {
    console.error("Не удалось пожертвовать в отряд", error);
  }
}
