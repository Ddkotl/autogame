import { Page } from "patchright";

export async function atackWerwolfs(page: Page) {
  try {
    await page.goto(
      "https://mvoo.ru/clan/castle/?werewolves=true",
      {
        waitUntil: "domcontentloaded",
      },
    );
    await page
      .locator("a.button_small")
      .waitFor({ state: "visible" });
    await page.locator("a.button_small").click();
  } catch (error) {
    console.error("Не удалось атаковать оборотня", error);
  }
}
