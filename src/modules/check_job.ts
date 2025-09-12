import { JSDOM } from "jsdom";
import { php_session_id } from "../const/constants";
export async function checkJob(
  session_id: string,
): Promise<boolean> {
  try {
    const res = await fetch("https://mvoo.ru/", {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
    });
    const html = await res.text();
    const dom = new JSDOM(html);
    const on_job = dom.window.document
      .querySelector("div.notifications_block")
      .textContent.includes("Ты сейчас на службе");

    return on_job;
  } catch (error) {
    console.error("Не удалось проверить службу", error);
  }
}
