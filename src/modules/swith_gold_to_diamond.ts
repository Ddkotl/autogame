import { JSDOM } from "jsdom";
import { php_session_id } from "../const/constants";

export async function swithGoldToDiamond(
  session_id: string,
) {
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
      "li > span.value > span",
    ).innerHTML;
    console.log(gold_to_swith);
    const formData = new URLSearchParams();
    formData.append("cost", gold_to_swith);
    await fetch("https://mvoo.ru/exchanger/add/gold", {
      method: "POST",
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });
  } catch (error) {
    console.error("Не удалось обменять золото", error);
  }
}
