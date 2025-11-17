import { JSDOM } from "jsdom";
import {
  curlDo,
  curlDoWB,
  curlGet,
  curlPostForm,
} from "../../utils/curl_helpers";

export async function UseHardItem({
  session_id,
  item_name,
}: {
  session_id: string;
  item_name: string;
}): Promise<void> {
  try {
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

        const ok = await curlDoWB(useUrl, session_id);
        if (ok.ok) {
          const dom = new JSDOM(ok.body);
          const btn = dom.window.document.querySelector(
            "a[href*='/user/cache/equipment/?wear']",
          );
          await curlDo(
            `https://mvoo.ru${btn.getAttribute("href")}`,
            session_id,
          );
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
