import { boss_id } from "./const/constants";
import { sleep } from "./utils/sleep";
import { atackRaid } from "./modules/atack_raid";

(async () => {
  for (let i = 0; i < 150; i++) {
    try {
      await atackRaid(boss_id);
    } catch (e) {
      console.error(`error to ${i} try: `, e);
    }
    await sleep(15400);
  }
  console.log("boss farm sucsessfuly ended");
})();
