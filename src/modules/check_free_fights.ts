import { Page } from "patchright";
import { sleep } from "../utils/sleep";

export async function checkFreeFights(page: Page) {
  try {
    await sleep(1000);
    const fights = await page
      .locator(".footer_icons  > span ")
      .nth(8)
      .innerText()
      .then((data) => data.trim());
    await sleep(1000);
    console.log(fights)
    return fights;
  } catch (error) {
    console.error(
      "Не удалось узнать количество боев",
      error,
    );
  }
}
