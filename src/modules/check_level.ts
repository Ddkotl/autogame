import { Page } from "patchright";
import { sleep } from "../utils/sleep";

export async function checkLevel(page: Page) {
  try {
    await sleep(1000);
    const level = await page
      .locator(".footer_icons  > span ")
      .nth(0)
      .innerText();
    await sleep(1000);
    return +level.replace(/^.*\[(\d+)\]$/, "$1");
  } catch (error) {
    console.error("Не удалось узнать уровень", error);
  }
}
