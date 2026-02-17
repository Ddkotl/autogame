import { boss_id } from "./const/constants";
import { goToJob, mineGold } from "./modules";
import { sleep } from "./utils/sleep";
import { atackPlayer } from "./modules/atack_player";
import fs from "fs";

const sacrifice_list = JSON.parse(
  fs.readFileSync("./sacrifice_list.json", "utf-8"),
).reverse();
//sacrifice_list.splice(0,101)
(async () => {
  for (let i = 0; i < 122; i++) {
    try {
      await atackPlayer(boss_id, sacrifice_list[i]);
      await mineGold(boss_id);
      await goToJob(boss_id, 10);
    } catch (e) {
      console.error(`error to ${i} try: `, e);
    }
    await sleep(16000);
  }
  console.log("boss farm sucsessfuly ended");
})();
