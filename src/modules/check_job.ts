import { Page } from "patchright";
import { sleep } from "../utils/sleep";

export async function checkJob(page: Page) {
  try {
    await sleep(1000);
    const text = await page
      .locator("td.notice_content")
      .allInnerTexts();
    const on_job = text
      .join(",")
      .includes("Ты сейчас на службе");
    await sleep(1000);
    return on_job;
  } catch (error) {
    console.error("Не удалось проверить службу", error);
  }
}
