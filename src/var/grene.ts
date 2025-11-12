import { LoadAccaunts } from "../utils/accaunt-manager";
import { sleep } from "../utils/sleep";
import { ByeAndUse } from "./modules/bye_and_use";

async function Grene() {
  const { dem_accaunts } = LoadAccaunts();
  for (let acc of dem_accaunts) {
    await sleep(500);
    await ByeAndUse({
      session_id: acc.SESSION_ID,
      buyUrl: "https://mvoo.ru/shop/buyMany/692",
      item_name: "Cветошумовая граната",
    });
  }
}

(async () => {
  await Grene();
})();
