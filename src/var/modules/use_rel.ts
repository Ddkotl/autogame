import { JSDOM } from "jsdom";
import {
  curlDo,
  curlGet,
  curlPostForm,
} from "../../utils/curl_helpers";

export async function UseRel({
  startUrl,
  findUrl,
  session_id,
}: {
  startUrl: string;
  findUrl: string;
  session_id: string;
}): Promise<void> {
  try {
    const equipUrl = startUrl;
    const html = await curlGet(equipUrl, session_id);
    if (!html) {
      console.warn("Не удалось получить pet");
      return;
    }

    const dom = new JSDOM(html);
    const inv_items = Array.from(
      dom.window.document.querySelectorAll(
        `a[href*='${findUrl}']`,
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
