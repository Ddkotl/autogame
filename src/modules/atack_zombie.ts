import { php_session_id } from "../const/constants";
import { JSDOM } from "jsdom";
export async function atackZombie(session_id: string) {
  try {
    const pageUrl =
      "https://mvoo.ru/arena/main/?sorting=zombie";
    const res = await fetch(pageUrl, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
    });

    const html = await res.text();
    const dom = new JSDOM(html);
    const btn_el = dom.window.document.querySelector(
      "a.button_small",
    );

    const attackUrl =
      "https://mvoo.ru" + btn_el.getAttribute("href");

    await fetch(attackUrl, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
    });
  } catch (error) {
    console.error("Не удалось атаковать зомби", error);
  }
}
