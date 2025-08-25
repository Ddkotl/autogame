import { Page } from "patchright";

export async function atackZombie(page: Page) {
  try {
    await page.goto("https://mvoo.ru/arena/main/?sorting=zombie", {
      waitUntil: "domcontentloaded",
    });
    await page.locator("a.button_small").waitFor({ state: "visible" });
    await page.locator("a.button_small").click();
  } catch (error) {
    console.error("Не удалось атаковать зомби", error);
  }
}
