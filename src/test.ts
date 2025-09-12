import { JSDOM } from "jsdom";
import { php_session_id } from "./const/constants";

async function main(session_id: string) {
  try {
    const res = await fetch(
      "https://mvoo.ru/exchanger/?sorting=gold",
      {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
        },
      },
    );
    const html = await res.text();
    const dom = new JSDOM(html);
    const gold_to_swith = dom.window.document.querySelector(
      "span.value > span",
    ).textContent;
    console.log(gold_to_swith);
  } catch (error) {
    console.error("не удалось обменятб на алмазы", error);
  }
}

main(
  "18fe3b892de1ebd19236564b60ed53d4076017b72eb1ae52a48d5b35db2ad35a",
);
