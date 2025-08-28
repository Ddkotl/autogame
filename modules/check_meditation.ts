import { Page } from "patchright";
import { sleep } from "../utils/sleep";

export async function checkMeditation(page: Page) {
  try {
    await sleep(1000);
    const text = await page.locator("td.notice_content").allInnerTexts();
    const on_med = text.join(",").includes("Ты медитируешь");
    await sleep(1000);
    return on_med;
  } catch (error) {
    console.error("Не удалось проверить медитацию", error);
  }
}
