import { boss_id } from "./const/constants";
import { sleep } from "./utils/sleep";
import { atackWerwolfs } from "./modules/atack_werwolfs";

(async () => {
  for (let i = 0; i < 150; i++) {
    try {
      await atackWerwolfs(boss_id);
    } catch (e) {
      console.error(`error to ${i} try: `, e);
    }
    await sleep(16000);
  }
  console.log("boss farm sucsessfuly ended");
})();
