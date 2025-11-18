import { ByeChests } from "./modules/bue_cheasts";
import { LoadAccaunts } from "./utils/accaunt-manager";
import { sleep } from "./utils/sleep";

async function ByeChest() {
  const { dem_accaunts, ang_accaunts } = LoadAccaunts();
  for (let [index, acc] of dem_accaunts
    .concat(ang_accaunts)
    .entries()) {
    await sleep(500);

    await ByeChests({ session_id: acc.SESSION_ID });
  }
}

(async () => {
  await ByeChest();
})();
