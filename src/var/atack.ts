import { LoadAccaunts } from "../utils/accaunt-manager";
import { sleep } from "../utils/sleep";
import { Atack } from "./modules/atack";
import { UseHardItem } from "./modules/use_hard_item";
import { UseItem } from "./modules/use_item";

async function Grene() {
  const { dem_accaunts } = LoadAccaunts();
  for (let [index, acc] of dem_accaunts.entries()) {
    await sleep(500);

    await UseItem({
      session_id: acc.SESSION_ID,
      item_name: "Cветошумовая граната",
    });
    await Atack(
      "https://mvoo.ru/clan/war/?list=428&sorting=health",
      acc.SESSION_ID,
    );
    await UseHardItem({
      session_id: acc.SESSION_ID,
      item_name: "Релисса",
    });
  }
}

(async () => {
  await Grene();
})();
