import { boss_id } from "./const/constants";
import { goToJob, mineGold } from "./modules";
import { sleep } from "./utils/sleep";

(async () => {
  for (let i = 0; i < 150; i++) {
    try {
      
      await mineGold(boss_id);
      await goToJob(boss_id, 10);
    } catch (e) {
      console.error(`error to ${i} try: `, e);
    }
    await sleep(16000);
  }
  console.log("boss farm sucsessfuly ended");
})();
