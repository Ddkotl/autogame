import { LoadAccaunts } from "../utils/accaunt-manager";
import { sleep } from "../utils/sleep";
import { UseLab } from "./modules/use_lab";

async function Grene() {
  const { dem_accaunts } = LoadAccaunts();
  for (let [index, acc] of dem_accaunts.entries()) {
    await sleep(500);

    // await UseLab({
    //   session_id: acc.SESSION_ID,
    //   useUrl: `https://mvoo.ru/clan/war/?positions=all&take=${index < 3 ? "1" : index < 6 ? "2" : "3"}`,
    // });
     await UseLab({
      session_id: acc.SESSION_ID,
      useUrl: `https://mvoo.ru/game/raid/?join=20400`,
    });
  }
}

(async () => {
  await Grene();
})();
