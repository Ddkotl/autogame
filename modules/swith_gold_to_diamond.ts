import { Page } from "patchright";
import { sleep } from "../utils/sleep";

export async function swithGoldToDiamond(page: Page) {
  try {
    await page.goto("https://mvoo.ru/exchanger/?sorting=gold", {
      waitUntil: "domcontentloaded",
    });
    await sleep(1000);
    await page
      .locator("li > span.value > span")
      .nth(0)
      .waitFor({ state: "visible" });
    const gold_to_swith = await page
      .locator("li > span.value > span")
      .nth(0)
      .innerHTML();
    const text = await page.locator("form").innerText();
    if (gold_to_swith && text) {
      await page.fill('input[id="ValueDiamond"]', gold_to_swith);
      await sleep(1000);
      await page.locator(".button_small").waitFor({ state: "visible" });
      await page.locator(".button_small").click();
    }
  } catch (error) {
    console.error("Не удалось обменять золото", error);
  }
}
