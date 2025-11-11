import { LoadAccaunts } from "../utils/accaunt-manager";
import { sleep } from "../utils/sleep";
import { UseLab } from "./modules/use_lab";

async function Grene() {
  const { dem_accaunts } = LoadAccaunts();
  for (let [index, acc] of dem_accaunts.entries()) {
    await sleep(500);

    await UseLab({
      session_id: acc.SESSION_ID,
      useUrl:
        "https://mvoo.ru/game/city/laboratory/?view=7&conduct=7&confirm=true",
    });
    await UseLab({
      session_id: acc.SESSION_ID,
      useUrl:
        "https://mvoo.ru/game/city/laboratory/?view=12&conduct=12&confirm=true",
    });
    await UseLab({
      session_id: acc.SESSION_ID,
      useUrl:
        "https://mvoo.ru/game/city/laboratory/?view=5&conduct=5&confirm=true",
    });

    await UseLab({
      session_id: acc.SESSION_ID,
      useUrl: `https://mvoo.ru/clan/war/?positions=all&take=${index < 3 ? "1" : index < 6 ? "2" : "3"}`,
    });
  }
}

(async () => {
  await Grene();
})();
