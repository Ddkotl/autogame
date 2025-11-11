import { JSDOM } from "jsdom";
import {
  curlDo,
  curlGet,
  curlPostForm,
} from "./curl_helpers";

export async function UseAg({
  session_id,
}: {
  session_id: string;
}): Promise<void> {
  try {
    const equipUrl = "https://mvoo.ru/user/cache/pets";
    const html = await curlGet(equipUrl, session_id);
    if (!html) {
      console.warn("Не удалось получить pet");
      return;
    }

    const dom = new JSDOM(html);
    const inv_items = Array.from(
      dom.window.document.querySelectorAll(
        "a[href*='/user/cache/pets/?activation']",
      ),
    );
    for (const el of inv_items) {
      const href = el.getAttribute("href");
      if (!href) continue;
      const useUrl = href.startsWith("http")
        ? href
        : `https://mvoo.ru${href}`;
      console.log(`Использую ${href} `);

      const ok = await curlDo(useUrl, session_id);
      if (ok) {
        console.log(`${useUrl} успешно использован`);
      } else {
        console.warn(`Не удалось использовать ${useUrl}`);
      }
    }
  } catch (error) {
    console.error("ag error", error);
  }
}
