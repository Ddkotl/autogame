import { startFeed } from "./mode/start_feed";
import { getDayRevard } from "./modules/get_day_revard";
import { LoadAccaunts } from "./utils/accaunt-manager";
import { sleep } from "./utils/sleep";

(async () => {
  const { dem_accaunts, ang_accaunts } = LoadAccaunts();
  dem_accaunts.splice(0);
  await Promise.all([
    ...dem_accaunts.map(async (acc, i) => {
      await sleep(i * 2000);
      await getDayRevard(acc.SESSION_ID);
      await startFeed(acc.SESSION_ID, 22434);
    }),
    ...ang_accaunts.map(async (acc, i) => {
      await sleep(i * 2000);
      await getDayRevard(acc.SESSION_ID);
      await startFeed(acc.SESSION_ID, 55314);
    }),
  ]);
})();
