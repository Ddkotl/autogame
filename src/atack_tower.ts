import { boss_id, php_session_id } from "./const/constants";
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
})();
