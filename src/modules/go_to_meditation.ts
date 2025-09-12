import { Page } from "patchright";
import { sleep } from "../utils/sleep";

export async function goToMeditation(page: Page) {
  try {
    await page.goto(
      "https://mvoo.ru/game/staff/meditation",
      {
        waitUntil: "domcontentloaded",
      },
    );
    await sleep(3000);
    await page.selectOption("select#meditation-time", "3");
    await page.locator(".button_big").click();
  } catch (error) {
    console.error("Не удалось сходить на медитацию", error);
  }
}
// https://mvoo.ru/game/staff/?lair=true&buy=partner
