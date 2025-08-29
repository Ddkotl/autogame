import { Page } from "patchright";
import { sleep } from "../utils/sleep";

export async function goToMutation(page: Page) {
  try {
    await page.goto(
      "https://mvoo.ru/game/city/laboratory/?view=4",
      { waitUntil: "domcontentloaded" },
    );
    await sleep(3000);
    try {
      await page.locator(".button_small").click();
      sleep(1000);
      await page.locator(".button_small").nth(0).click();
    } catch (error) {
      console.log("нет кнопки провести мутацию");
    }
    await page.goto(
      "https://mvoo.ru/game/city/laboratory/?view=4",
      { waitUntil: "domcontentloaded" },
    );
    await sleep(3000);
    const text = await page.locator("ul").innerText();
    return text.includes("Технология активна");
  } catch (error) {
    console.log("не удалось пойти на мутацию");
    return;
  }
}
