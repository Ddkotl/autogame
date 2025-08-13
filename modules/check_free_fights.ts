import { Page } from "patchright";
import { sleep } from "../utils/sleep";

export async function checkFreeFights(page: Page) {
  try {
    await sleep(1000);
    const fights = await page
      .locator('.footer_icons > span > a[href="/arena/main/?sorting=zombie"]')
      .innerText();
    await sleep(1000);
    return fights;
  } catch (error) {
    console.error("Не удалось узнать количество боев", error);
  }
}
