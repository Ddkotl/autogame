import {  Page } from "patchright";
import { LoadAccaunts } from "./utils/accaunt-manager";
import { setCookies } from "./modules";
import { Farm } from "./mode/farm";
import { getDayRevard } from "./modules/get_day_revard";
import { sleep } from "./utils/sleep";
import { startFeed } from "./mode/start_feed";

export async function StartGreend(mode: "feed" | "farm") {
  const { dem_accaunts, ang_accaunts } = LoadAccaunts();
  if (mode === "feed") {
    dem_accaunts.splice(0);
  }
  await Promise.all([
    ...dem_accaunts.map(async (acc,i) => {
      try {
        await sleep(i * 5000);
        await getDayRevard(acc.SESSION_ID);
        await Farm(
          acc.SESSION_ID,
          30,
          61000,
          "demon",
        );
      } catch (error) {
        console.error(error);
      } 
    }),
    ...ang_accaunts.map(async (acc, i) => {
      if (mode === "feed") {
        await sleep(i * 5000);
        await startFeed(acc.SESSION_ID);
      } else {
        try {
          if (mode === "farm") {
            await sleep(i * 5000);
             await getDayRevard(acc.SESSION_ID);
            await Farm(
              acc.SESSION_ID,
              30,
              61000,
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
