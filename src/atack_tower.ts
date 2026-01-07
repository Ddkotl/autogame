import { boss_id, php_session_id } from "./const/constants";
import { getHourGifts } from "./modules/get_hour_gifts";
import { LoadAccaunts } from "./utils/accaunt-manager";
async function AtackTower() {
  try {
    const { dem_accaunts } = LoadAccaunts();
    for (let i = 0; i < dem_accaunts.length; i++) {
      await fetch(
        "https://mvoo.ru/user/cache/profile/56165/?tower=battle&target=go",
        {
          headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${dem_accaunts[i].SESSION_ID}`,
          },
        },
      );
    }
    await fetch(
      "https://mvoo.ru/user/cache/profile/56165/?tower=battle&target=go",
      {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${boss_id}`,
        },
      },
    );
    for (let i = 0; i < dem_accaunts.length; i++) {
      await fetch(
        "https://mvoo.ru/user/cache/profile/55314/?tower=battle&target=go",
        {
          headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${dem_accaunts[i].SESSION_ID}`,
          },
        },
      );
    }
    await fetch(
      "https://mvoo.ru/user/cache/profile/55314/?tower=battle&target=go",
      {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${boss_id}`,
        },
      },
    );
  } catch (error) {
    console.log("atack tower error", error);
  }
}

(async () => {
  await AtackTower();
  const { dem_accaunts, ang_accaunts } = LoadAccaunts();
  const all_accaunts_ids = [...dem_accaunts.map(a => a.SESSION_ID), ...ang_accaunts.map(a => a.SESSION_ID), boss_id];
  console.log(all_accaunts_ids)
  for (let i = 0; i < all_accaunts_ids.length; i++) {
    await getHourGifts(all_accaunts_ids[i]);
  }
})();
