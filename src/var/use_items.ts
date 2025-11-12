import { LoadAccaunts } from "../utils/accaunt-manager";
import { sleep } from "../utils/sleep";
import { UseItem } from "./modules/use_item";

async function Grene() {
  const { dem_accaunts } = LoadAccaunts();
  for (let acc of dem_accaunts) {
    await sleep(500);

    await UseItem({
      session_id: acc.SESSION_ID,
      item_name: "Релисса",
    });
  }
}

(async () => {
  await Grene();
})();
