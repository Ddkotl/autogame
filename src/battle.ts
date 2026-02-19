import { boss_id, php_session_id } from "./const/constants";
import { curlDo, curlGet } from "./utils/curl_helpers";
import { sleep } from "./utils/sleep";
import { JSDOM } from "jsdom";

(async () => {
  await fetch(
    "https://mvoo.ru/game/battle/?register=true",
    {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${boss_id}`,
      },
    },
  );
   await sleep(90000);
  for (let i = 0; i < 15; i++) {
    try {
      const html = await curlGet("https://mvoo.ru/game/battle", boss_id);
      const dom = new JSDOM(html);
      const btn_el = dom.window.document.querySelector(
        ".button_big",
      );
      const href = btn_el.getAttribute("href");
      if (!href) {
        console.warn("Ссылка атаки не найдена у кнопки");
        return;
      }
      const attackUrl = href.startsWith("http")
        ? href
        : `https://mvoo.ru${href}`;
      console.log("Атакую по ссылке:", attackUrl);

      const ok = await curlDo(attackUrl, boss_id);
      if (ok) {
        console.log("Атака  успешно выполнена");
      } else {
        console.warn("Не удалось выполнить атаку ");
      }
    } catch (error) {
      console.error("attack error");
    }
    await sleep(6000);
  }

  console.log("battle sucsessfuly ended");
})();
