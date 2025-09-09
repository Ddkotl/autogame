import { JSDOM } from "jsdom";
import { php_session_id } from "../const/constants";
export async function checkFreeFights(session_id: string) {
  try {
    const pageUrl = "https://mvoo.ru";
    const res = await fetch(pageUrl, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
    });
    const html = await res.text();
    const dom = new JSDOM(html);
    const els = dom.window.document.querySelectorAll(
      'a[href*="/arena"]',
    );
    let battles = "24/24";
    els.forEach((e) => {
      if (/\d+\/\d+/.test(e.textContent)) {
        battles = e.textContent;
      }
    });
    return battles;
  } catch (error) {
    console.error("Не удалось узнать количество боев");
    return "24/24";
  }
}
