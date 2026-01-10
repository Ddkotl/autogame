import { boss_id } from "./const/constants";
import { goToJob, mineGold } from "./modules";
import { sleep } from "./utils/sleep";
import { atackZombie } from "./modules/atack_zombie";

(async () => {
  for (let i = 0; i < 150; i++) {
    try {
      await atackZombie(boss_id);
    } catch (e) {
      console.error(`error to ${i} try: `, e);
    }
    await sleep(16000);
  }
  console.log("boss farm sucsessfuly ended");
})();
