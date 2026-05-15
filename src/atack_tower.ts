import { boss_id, php_session_id } from "./const/constants";
import { getHourGifts } from "./modules/get_hour_gifts";
import { LoadAccaunts } from "./utils/accaunt-manager";
import { JSDOM } from "jsdom";
async function getAtackLink(
  tower_owner_id: string,
  player_id: string,
) {
  try {
    const res = await fetch(
      `https://mvoo.ru/user/cache/profile/${tower_owner_id}/?tower=battle`,
      {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${player_id}`,
        },
      },
    );
    const html = await res.text();
    const dom = new JSDOM(html);
    const btn_el = dom.window.document.querySelector(
      "a.button_small",
    );
    const href = btn_el?.getAttribute("href");
    if (href === null || href === undefined) return "";
    return href;
  } catch (e) {
    console.log(e);
    return "";
  }
}
async function AtackTower() {
  try {
    const { dem_accaunts } = LoadAccaunts();
    for (let i = 0; i < dem_accaunts.length; i++) {
      const href = await getAtackLink(
        "56165",
        dem_accaunts[i].SESSION_ID,
      );
      await fetch(`https://mvoo.ru${href}`, {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${dem_accaunts[i].SESSION_ID}`,
        },
      });
    }
    const href_boss1 = await getAtackLink("56165", boss_id);
    await fetch(`https://mvoo.ru${href_boss1}`, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${boss_id}`,
      },
    });
    const href_boss2 = await getAtackLink("55314", boss_id);
    await fetch(`https://mvoo.ru${href_boss2}`, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${boss_id}`,
      },
    });

    for (let i = 0; i < dem_accaunts.length; i++) {
      const href = await getAtackLink(
        "55314",
        dem_accaunts[i].SESSION_ID,
      );
      await fetch(`https://mvoo.ru${href}`, {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${dem_accaunts[i].SESSION_ID}`,
        },
      });
    }
  } catch (error) {
    console.log("atack tower error", error);
  }
}

(async () => {
  await AtackTower();
  const { dem_accaunts, ang_accaunts } = LoadAccaunts();
  const all_accaunts_ids = [
    ...dem_accaunts.map((a) => a.SESSION_ID),
    ...ang_accaunts.map((a) => a.SESSION_ID),
    boss_id,
  ];
  console.log(all_accaunts_ids);
  for (let i = 0; i < all_accaunts_ids.length; i++) {
    await getHourGifts(all_accaunts_ids[i]);
  }
})();
