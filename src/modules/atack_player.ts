import { JSDOM } from "jsdom";
import { curlDo, curlGet } from "../utils/curl_helpers";

export async function atackPlayer(
  session_id: string,
  player_id: number,
): Promise<void> {
  try {
    const pageUrl = `https://mvoo.ru/arena/cache/attack/${player_id}`;
    const html = await curlGet(pageUrl, session_id);

    if (!html) {
      console.warn("Не удалось получить страницу зомби");
      return;
    }

    const dom = new JSDOM(html);
    const btn_el = dom.window.document.querySelector(
      "a.button_small",
    );

    if (!btn_el) {
      console.warn(
        "Кнопка атаки не найдена на странице зомби",
      );
      return;
    }

    const href = btn_el.getAttribute("href");
    if (!href) {
      console.warn("Ссылка атаки не найдена у кнопки");
      return;
    }

    const attackUrl = href.startsWith("http")
      ? href
      : `https://mvoo.ru${href}`;
    console.log("Атакую  по ссылке:", attackUrl);

    const ok = await curlDo(attackUrl, session_id);
    if (ok) console.log("Атака  успешно выполнена");
    else console.warn("Не удалось выполнить атаку ");
  } catch (err) {
    console.error("Не удалось атаковать ", err);
  }
}
