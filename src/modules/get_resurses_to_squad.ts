import { php_session_id } from "../const/constants";
import { JSDOM } from "jsdom";

export async function getResursesToSquad(
  session_id: string,
) {
  try {
    const res = await fetch(
      "https://mvoo.ru/clan/castle/?resources",
      {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
        },
      },
    );
    const text = await res.text();
    const dom = new JSDOM(text);
    const formData = new URLSearchParams();

    try {
      const scrf = dom.window.document
        .querySelector("input[name='csrf']")
        .getAttribute("value");
      formData.append("csrf", scrf);
    } catch (e) {
      console.log("no csrf");
    }

    try {
      const silver = dom.window.document
        .querySelector("input[name='silver']")
        .getAttribute("value");
      formData.append("silver", silver);
    } catch (e) {
      console.log("no mana");
    }
    try {
      const gold = dom.window.document
        .querySelector("input[name='gold']")
        .getAttribute("value");
      formData.append("gold", gold);
    } catch (e) {
      console.log("no gold");
    }

    await fetch(
      "https://mvoo.ru/clan/castle/resources/invest",
      {
        method: "POST",
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      },
    );
  } catch (error) {
    console.error("Не удалось пожертвовать в отряд", error);
  }
}
