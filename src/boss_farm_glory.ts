import { boss_id } from "./const/constants";
import { goToJob, mineGold } from "./modules";
import { sleep } from "./utils/sleep";
import { atackPlayer } from "./modules/atack_player";

const sacrifice_list = [9640, 18467, 22586, 9631, 49137, 15746, 29022, 17343, 51973, 9662, 9640, 14735];

(async () => {
  for (let i = 0; i < sacrifice_list.length; i++) {
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
