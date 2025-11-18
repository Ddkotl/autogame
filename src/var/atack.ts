import { LoadAccaunts } from "../utils/accaunt-manager";
import { sleep } from "../utils/sleep";
import { Atack } from "./modules/atack";
import { UseAg } from "./modules/use_ag";
import { UseLab } from "./modules/use_lab";
import { UseRel } from "./modules/use_rel";

async function Grene() {
  const { dem_accaunts } = LoadAccaunts();
  for (let [index, acc] of dem_accaunts.entries()) {
    await sleep(500);

    await Atack(
   "https://mvoo.ru/clan/war/?list=428&sorting=health",
    acc.SESSION_ID,
   );
   // await Atack(
      // "https://mvoo.ru/clan/war/?shield=all",
      // acc.SESSION_ID,
    // );
  //  await Atack(
      //"https://mvoo.ru/clan/war/?offensive=true",
     // acc.SESSION_ID,
   // );
  }
}

(async () => {
  await Grene();
})();
