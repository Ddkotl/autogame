import { LoadAccaunts } from "./utils/accaunt-manager";
import { sleep } from "./utils/sleep";
import { UseLab } from "./var/modules/use_lab";

async function Raid() {
  const { dem_accaunts } = LoadAccaunts();
  for (let [index, acc] of dem_accaunts.entries()) {
    await sleep(500);

    await UseLab({
      session_id: acc.SESSION_ID,
      useUrl: `https://mvoo.ru/game/raid/?join=20484`,
    });
  }
}

(async () => {
  await Raid();
})();
