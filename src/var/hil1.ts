import { LoadAccaunts } from "../utils/accaunt-manager";
import { sleep } from "../utils/sleep";
import { ByeAndUse } from "./modules/bye_and_use";

async function Grene() {
  const { dem_accaunts } = LoadAccaunts();
  for (let acc of dem_accaunts) {
    await sleep(5000);
    await ByeAndUse({
      session_id: acc.SESSION_ID,
      buyUrl: "https://mvoo.ru/shop/buyMany/802",
      item_name: "Бериз",
    });
  }
}

(async () => {
  await Grene();
})();
