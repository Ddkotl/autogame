import { Page } from "patchright";

export async function mineGold(page: Page) {
  try {
    await page.goto(
      "https://mvoo.ru/surroundings/?sorting=stash",
      {
        waitUntil: "domcontentloaded",
      },
    );
    await page
      .locator("a.button_small")
      .nth(0)
      .waitFor({ state: "visible" });
    await page.locator("a.button_small").nth(0).click();
  } catch (error) {
    console.error("Не удалось копать золото", error);
  }
}
