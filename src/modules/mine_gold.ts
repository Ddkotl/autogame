import { spawn } from "child_process";
import { JSDOM } from "jsdom";
import { php_session_id } from "../const/constants";
import { curlDo, curlGet } from "../utils/curl_helpers";

export async function mineGold(
  session_id: string,
): Promise<void> {
  try {
    const pageUrl =
      "https://mvoo.ru/surroundings/?sorting=stash";
    const html = await curlGet(pageUrl, session_id);

    if (!html) {
      console.warn("Не удалось получить страницу тайников");
      return;
    }

    const dom = new JSDOM(html);
    const anchors = Array.from(
      dom.window.document.querySelectorAll("a"),
    );

    for (const el of anchors) {
      const text = (el.textContent || "").trim();
      if (text === "Пропустить" || text === "Взломaть") {
        const href = el.getAttribute("href");
        if (!href) continue;
        const url = href.startsWith("http")
          ? href
          : `https://mvoo.ru${href}`;
        console.log("Выполняю:", url);

        const ok = await curlDo(url, session_id);
        if (ok) {
          console.log("Успешно:", text, url);
        } else {
          console.warn("Не удалось выполнить:", text, url);
        }

        // небольшая пауза, чтобы не перегружать сервер
        await new Promise((r) => setTimeout(r, 300));
      }
    }
  } catch (error) {
    console.error("Не удалось копать золото", error);
  }
}
