import { Page } from "patchright";

export async function checkFreeFights(page: Page) {
  try {
    return await page
      .locator('a[href="/arena/main/?sorting=zombie"]')
      .innerHTML();
  } catch (error) {
    console.error("Не удалось узнать количество боев");
  }
}
