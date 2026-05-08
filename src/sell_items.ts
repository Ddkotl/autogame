import { php_session_id } from "./const/constants";
import { LoadAccaunts } from "./utils/accaunt-manager";
import { sleep } from "./utils/sleep";
import { JSDOM } from "jsdom";
async function sellItems() {
  const { ang_accaunts, dem_accaunts } = LoadAccaunts();
  for (let acc of dem_accaunts.concat(ang_accaunts)) {
    await sleep(500);
    const inv = await fetch(
      "https://mvoo.ru/user/cache/equipment/?detailed=cache::view",
      {
        headers: {
          cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${acc.SESSION_ID}`,
        },
      },
    );
    const html = await inv.text();
    const dom = new JSDOM(html);
    const items =
      dom.window.document.querySelectorAll(".items li ");
    const itemsName = [
      "Золотой сертификат оснастки",
      "Серебряный сертификат оснастки",
      "Платиновый сертификат оснастки",
      "Лицензия обмена",
      "Среднее Храброе сердце","Релисса","Малое Храброе сердце","Ментальное очищение","Нави"  , "Яшмин"

    ];
    for (let item of items) {
      await sleep(200);
      if (
        itemsName.some((name) =>
          item.textContent?.includes(name),
        )
      ) {
        continue;
      }
      const href = item
        .querySelector("a")
        ?.getAttribute("href");
      if (!href) continue;
      const params = new URLSearchParams(
        href.split("?")[1],
      );

      // 2. Достаем значение именно по ключу 'wear'
      const wearId = params.get("wear");
      const res = await fetch(`https://mvoo.ru/shop/trade/${wearId}`, {
        method: "POST",
        headers: {
          cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${acc.SESSION_ID}`,
        },
        body: new URLSearchParams({ quantity: "1" }),
      });
    }
  }
}

(async () => {
  for (let i = 0; i < 100; i++) {
    await sellItems();
  }
})();
