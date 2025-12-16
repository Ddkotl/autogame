import { boss_id, php_session_id } from "./const/constants";
import { LoadAccaunts } from "./utils/accaunt-manager";
import { JSDOM } from "jsdom";

const tower_owner_login = "viking15";
const boss_profile_id = 55314;
const tower_owner_id = 56165;
export async function CreateTower() {
  try {
    const { dem_accaunts } = LoadAccaunts();
    const dem_acc_to_boss = dem_accaunts.slice(0, 3);
    const dem_acc_to_vic = dem_accaunts.slice(3);
    for (let i = 0; i < dem_acc_to_vic.length; i++) {
      if (dem_acc_to_vic[i].login !== tower_owner_login) {
        await fetch(
          `https://mvoo.ru/user/cache/profile/${tower_owner_id}/?tower=battle&send=bid&confirm=go`,
          {
            headers: {
              Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${dem_acc_to_vic[i].SESSION_ID}`,
            },
          },
        );
      }
    }
    for (let i = 0; i < dem_acc_to_boss.length; i++) {
      await fetch(
        `https://mvoo.ru/user/cache/profile/${boss_profile_id}/?tower=battle&send=bid&confirm=go`,
        {
          headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${dem_acc_to_boss[i].SESSION_ID}`,
          },
        },
      );
    }
    await fetch(
      `https://mvoo.ru/user/cache/profile/${tower_owner_id}/?tower=battle&send=bid&confirm=go`,
      {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${boss_id}`,
        },
      },
    );

    for (let i = 0; i < dem_accaunts.length; i++) {
      if (dem_accaunts[i].login === tower_owner_login) {
        console.log(JSON.stringify(dem_accaunts[i]))
        const res = await fetch(
          `https://mvoo.ru/user/cache/profile/${tower_owner_id}/?tower=battle`,
          {
            headers: {
              Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${dem_accaunts[i].SESSION_ID}`,
            },
          },
        );
        const html = await res.text();
        const dom = new JSDOM(html);
        console.log(html)
        const links =
          dom.window.document.querySelectorAll("a");
        for (const e of links) {
          if (e.textContent === "[Принять]") {
            await fetch(
              `https://mvoo.ru${e.getAttribute("href")}`,
              {
                headers: {
                  Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${dem_accaunts[i].SESSION_ID}`,
                },
              },
            );
          }
        }
        const at_res = await fetch(
          `https://mvoo.ru/user/cache/profile/${tower_owner_id}/?tower=battle&attack=go`,
          {
            headers: {
              Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${dem_accaunts[i].SESSION_ID}`,
            },
          },
        );
        const at_html = await at_res.text();
        const at_dom = new JSDOM(at_html);
        const at_link = at_dom.window.document
          .querySelector(".button_small")
          .getAttribute("href");
        await fetch(`https://mvoo.ru${at_link}`, {
          headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${dem_accaunts[i].SESSION_ID}`,
          },
        });
      }
    }
  } catch (error) {
    console.log("go tower error", error);
  }
}

//(async () => {
 // await CreateTower();
//})();
