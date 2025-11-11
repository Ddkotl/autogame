import { LoadAccaunts } from "../utils/accaunt-manager";
import { sleep } from "../utils/sleep";
import { UseAg } from "./modules/use_ag";
import { UseLab } from "./modules/use_lab";

async function Grene() {
  const { dem_accaunts } = LoadAccaunts();
  for (let [index, acc] of dem_accaunts.entries()) {
    await sleep(500);

    await UseAg({
      session_id: acc.SESSION_ID,
    });
  }
}

(async () => {
  await Grene();
})();
