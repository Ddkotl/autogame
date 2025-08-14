import { Page } from "patchright";

export async function trainAgent(page: Page) {
  try {
    // await page.goto("https://mvoo.ru/user/cache/pets/?buy=2", {
    //   waitUntil: "domcontentloaded",
    // });
    // await page.locator(".button_small").click();
    await page.goto("https://mvoo.ru/user/cache/training/?sorting=pets", {
      waitUntil: "domcontentloaded",
    });
    for (let i = 0; i < 10; i++) {
      await page.locator(".button_small").nth(0).waitFor({ state: "visible" });
      await page.locator(".button_small").nth(0).click();
      await page.locator(".button_small").nth(3).click();
      await page.locator(".button_small").nth(1).click();
      await page.locator(".button_small").nth(2).click();
    }
  } catch (error) {
    console.error("Тренировка не удалась", error);
  }
}
