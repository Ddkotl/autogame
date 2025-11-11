import { JSDOM } from "jsdom";
import {
  curlDo,
  curlGet,
  curlPostForm,
} from "./curl_helpers";

export async function ByeAndUse({
  buyUrl,
  session_id,
  item_name,
}: {
  session_id: string;
  buyUrl: string;
  item_name: string;
}): Promise<void> {
  try {
    const buyResp = await curlPostForm(buyUrl, session_id, {
      quantity: "1",
    });
    if (buyResp === null) {
      console.warn(
        "Покупка  не удалась (curl вернул null)",
      );
    } else {
      console.log(
        "Покупка  выполнена (ответ length):",
        buyResp.length,
      );
    }

    const equipUrl = "https://mvoo.ru/user/cache/equipment";
    const html = await curlGet(equipUrl, session_id);
    if (!html) {
      console.warn("Не удалось получить инвентарь");
      return;
    }

    const dom = new JSDOM(html);
    const inv_items = Array.from(
      dom.window.document.querySelectorAll(
        "a[href*='/user/cache/equipment']",
      ),
    );

    for (const el of inv_items) {
      const img = el.querySelector("img");
      if (!img) continue;
      const img_title = img.getAttribute("title");
      if (img_title === item_name) {
        const href = el.getAttribute("href");
        if (!href) continue;
        const useUrl = href.startsWith("http")
          ? href
          : `https://mvoo.ru${href}`;
        console.log(`Использую ${item_name} `);

        const ok = await curlDo(useUrl, session_id);
        if (ok) {
          console.log(`${item_name} успешно использован`);
        } else {
          console.warn(
            `Не удалось использовать ${item_name} по ссылке:`,
            useUrl,
          );
        }
      }
    }
  } catch (error) {
    console.error("bye error", error);
  }
}
