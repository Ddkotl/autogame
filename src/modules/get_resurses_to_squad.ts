import { Page } from "playwright";
import { sleep } from "../utils/sleep";

export async function getResursesToSquad(page: Page) {
  try {
    await page.goto(
      "https://mvoo.ru/clan/castle/?resources",
      {
        waitUntil: "domcontentloaded",
      },
    );
    await page
      .locator(".button_small")
      .waitFor({ state: "visible" });
    await sleep(5000);
    await page.locator(".button_small").click();
    await sleep(3000);
  } catch (error) {
    console.error("Не удалось пожертвовать в отряд", error);
  }
}
