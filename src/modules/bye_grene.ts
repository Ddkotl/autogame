import { JSDOM } from "jsdom";
import { php_session_id } from "../const/constants";

export async function ByeGrene(session_id: string) {
  try {
    await fetch("https://mvoo.ru/shop/buyMany/1004", {
      method: "POST",
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
      body: new URLSearchParams({
        quantity: "1",
      }),
    });
    const res = await fetch(
      "https://mvoo.ru/user/cache/equipment",
      {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
        },
      },
    );
    const html = await res.text();
    const dom = new JSDOM(html);
    const inv_items = dom.window.document.querySelectorAll(
      "a[href*='/user/cache/equipment']",
    );
    for (const el of inv_items) {
      const img = el.querySelector("img");
      if (!img) continue;
      const img_title = img.getAttribute("title");
      if (img_title === "Дымовая граната") {
        await fetch(
          `https://mvoo.ru${el.getAttribute("href")}`,
          {
            headers: {
              Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
            },
          },
        );
      }
    }
  } catch (error) {
    console.error("bye grene error", error);
  }
}
