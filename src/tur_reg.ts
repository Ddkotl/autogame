import { php_session_id } from "./const/constants";
import { LoadAccaunts } from "./utils/accaunt-manager";
import { curlDo } from "./utils/curl_helpers";
import { JSDOM } from "jsdom";

async function turReg() {
  const { dem_accaunts, ang_accaunts } = LoadAccaunts();
  const accs = dem_accaunts.concat(ang_accaunts);
  accs.splice(1);
  
  for (let acc of accs) {
    const res = await fetch(
      "https://mvoo.ru/game/tournament/?tournament=all",
      {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${acc.SESSION_ID}`,
        },
      },
    );
    const text = await res.text()
    const dom = new JSDOM(text);
    const btn_el = dom.window.document.querySelector(
      "a.button_small",
    );
    const href = btn_el?.getAttribute("href");
    if (!href) {
      console.warn("Ссылка атаки не найдена у кнопки");
      return;
    }
    const attackUrl = href.startsWith("http")
      ? href
      : `https://mvoo.ru${href}`;
    console.log("Атакую по ссылке:", attackUrl);

    const ok = await curlDo(attackUrl, acc.SESSION_ID);
  }
}

(async function () {
  await turReg();
})();
