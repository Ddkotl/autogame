import { Farm } from "./mode/farm";
import { getDayRevard } from "./modules/get_day_revard";
import { LoadAccaunts } from "./utils/accaunt-manager";
import { sleep } from "./utils/sleep";
const sleep_time = 61000;
(async () => {
  const { dem_accaunts, ang_accaunts } = LoadAccaunts();
  await Promise.all([
    ...dem_accaunts.map(async (acc, i) => {
      await sleep(i * 5000);
      await getDayRevard(acc.SESSION_ID);
      await Farm(acc.SESSION_ID, 50, sleep_time, "demon");
    }),
    ...ang_accaunts.map(async (acc, i) => {
      await sleep(i * 5000);
      await getDayRevard(acc.SESSION_ID);
      await Farm(acc.SESSION_ID, 50, sleep_time, "angel");
    }),
  ]);
})();
