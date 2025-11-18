import {
  curlGet,
  curlPostForm,
} from "../utils/curl_helpers";
import { JSDOM } from "jsdom";

export async function ByeChests({
  session_id,
}: {
  session_id: string;
}): Promise<void> {
  try {
    const pageUrl = "https://mvoo.ru/game/city/chests";
    const html_get = await curlGet(pageUrl, session_id);

    if (!html_get) {
      console.warn("Не удалось получить страницу тайников");
      return;
    }

    const dom_get = new JSDOM(html_get);
    const anchors = Array.from(
      dom_get.window.document.querySelectorAll(
        "a.button_small",
      ),
    );
    const big_xheast_href = anchors[2].getAttribute("href");
    const csrf = big_xheast_href.split("csrf=")[1];
    const buyResp = await curlPostForm(
      "https://mvoo.ru/game/city/chests/buySoul/3",
      session_id,
      {
        quantity: "1",
        csrf: csrf,
      },
    );
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
  } catch (error) {
    console.error("bye error", error);
  }
}
