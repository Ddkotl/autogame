import { Page } from "patchright";
import { sleep } from "../utils/sleep";

export async function goToJob(page: Page) {
  try {
    await page.goto("https://mvoo.ru/game/staff/?lair", {
      waitUntil: "domcontentloaded",
    });
    await sleep(1000);
    const isActive = await page.getByText("Активен:").innerText();
    if (isActive !== "Активен:") {
      await page.goto(
        "https://mvoo.ru/game/staff/?lair=true&buy=partner&confirm=oll",
        { waitUntil: "domcontentloaded" },
      );
    }
    await page.goto("https://mvoo.ru/game/staff/service", {
      waitUntil: "domcontentloaded",
    });
    await page.selectOption("select#meditation-time", "480");
    await page.locator(".button_big").click();
  } catch (error) {
    console.error("Не удалось сходить на службу");
  }
}
// https://mvoo.ru/game/staff/?lair=true&buy=partner
