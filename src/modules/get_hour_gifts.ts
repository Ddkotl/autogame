import { php_session_id } from "../const/constants";
import { JSDOM } from "jsdom";

export async function getHourGifts(session_id: string) {
  try {
    const res = await fetch(`https://mvoo.ru`, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
    });
    const html = await res.text();
    const dom = new JSDOM(html);
    const link_item = dom.window.document.querySelector(
      ".center a.button_small",
    );
    const link = `https://mvoo.ru${link_item.getAttribute("href")}`;
    await fetch(link, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
    });
  } catch (erroe) {
    console.log("get hour gifts error", erroe);
  }
}
