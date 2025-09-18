import { LoadAccaunts } from "./utils/accaunt-manager";
import { Farm } from "./mode/farm";
import { getDayRevard } from "./modules/get_day_revard";
import { sleep } from "./utils/sleep";
import { startFeed } from "./mode/start_feed";

export async function StartGreend(
  mode: "feed" | "farm" | "test",
  sleep_time: number,
) {
  const { dem_accaunts, ang_accaunts } = LoadAccaunts();
  if (mode === "feed" || mode === "test") {
    dem_accaunts.splice(0);
  }
  await Promise.all([
    ...dem_accaunts.map(async (acc, i) => {
      try {
        await sleep(i * 5000);
        await getDayRevard(acc.SESSION_ID);
        await Farm(acc.SESSION_ID, 30, sleep_time, "demon");
      } catch (error) {
        console.error(error);
      }
    }),
    ...ang_accaunts.reverse().map(async (acc, i) => {
      if (mode === "feed") {
        await sleep(i * 5000);
        await startFeed(acc.SESSION_ID);
      } else {
        try {
          if (mode === "farm" || mode === "test") {
            await sleep(i * 5000);
            await getDayRevard(acc.SESSION_ID);
            await Farm(
              acc.SESSION_ID,
              30,
              sleep_time,
              "angel",
            );
          }
        } catch (error) {
          console.error(error);
        }
      }
    }),
  ]);
}
