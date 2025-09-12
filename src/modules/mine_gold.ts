import { php_session_id } from "../const/constants";
import { JSDOM } from "jsdom";
export async function mineGold(session_id: string) {
  try {
    const pageUrl =
      "https://mvoo.ru/surroundings/?sorting=stash";
    const res = await fetch(pageUrl, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
    });

    const html = await res.text();
    const dom = new JSDOM(html);

    const btn_els = dom.window.document.querySelectorAll(
      "a.button_small",
    );
    for (const el of btn_els) {
      if (el.textContent?.includes("Пропустить") || el.textContent?.includes("Взломaть")) {
        const href = el.getAttribute("href");
        const url = "https://mvoo.ru" + href;
        await fetch(url, {
          headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
          },
        });
        break
      }
    }
  } catch (error) {
    console.error("Не удалось копать золото", error);
  }
}
