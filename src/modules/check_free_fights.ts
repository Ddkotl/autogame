import { Page } from "patchright";
import { sleep } from "../utils/sleep";

export async function checkFreeFights(page: Page) {
  try {
    await sleep(1000);
    const fights = await page
      .locator(
        '.footer_icons  a[href="/arena/main/?sorting=zombie"] ',
      )
      .innerText()
      .then((data) => data.trim());
    await sleep(1000);
    return fights;
  } catch (error) {
    console.error(
      "Не удалось узнать количество боев",
      error,
    );
  }
}
