import { php_session_id } from "../const/constants";
import { JSDOM } from "jsdom";
export async function checkWerwolfs(
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
    const is_wervolfs = dom.window.document
      .querySelector("div.notifications_block")
      .textContent.includes("Оборотни прорвались в страны");

    return is_wervolfs;
  } catch (error) {
    console.error("Не удалось проверить оборотней", error);
  }
}
