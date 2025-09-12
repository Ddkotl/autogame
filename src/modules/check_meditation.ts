import { php_session_id } from "../const/constants";
import { JSDOM } from "jsdom";
export async function checkMeditation(
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
    const on_med = dom.window.document
      .querySelector("div.notifications_block")
      .textContent.includes("Ты медитируешь");

    return on_med;
  } catch (error) {
    console.error("Не удалось проверить медитацию", error);
  }
}
