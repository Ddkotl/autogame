import { php_session_id } from "../const/constants";
import {JSDOM} from "jsdom"
export async function checkLevel(
  session_id: string,
): Promise<number> {
  try {
    const pageUrl = "https://mvoo.ru";
    const res = await fetch(pageUrl, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
    });

    const html = await res.text();
    const dom = new JSDOM(html)
    const user_name =dom.window.document.querySelector('a[href*="/user/cache/profile"]').textContent
    const match = user_name.match(/\[(\d+)\]/);
    if (match[1]) {
      return Number(match[1]);
    }
  } catch (error) {
    console.error("Не удалось узнать уровень", error);
    return 25;
  }
}
