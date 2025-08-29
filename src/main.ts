import { Browser, BrowserContext, Page } from "patchright";
import { initPage } from "./utils/initPage";
import { sleep } from "./utils/sleep";
import { LoadAccaunts } from "./utils/accaunt-manager";
import {
  atackZombie,
  checkFreeFights,
  checkJob,
  goToJob,
  goToMeditation,
  mineGold,
  setCookies,
  swithGoldToDiamond,
  trainAgent,
} from "./modules";
import { getResursesToSquad } from "./modules/get_resurses_to_squad";
import { checkWerwolfs } from "./modules/check_werwolfs";
import { atackWerwolfs } from "./modules/atack_werwolfs";
import { checkMeditation } from "./modules/check_meditation";
import { Farm } from "./mode/farm";

export async function StartGreend(mode: "feed" | "farm") {
  const { dem_accaunts, ang_accaunts } = LoadAccaunts();

  await Promise.all([
    ...dem_accaunts.map(async (acc) => {
      let browser: Browser | null = null;
      let context: BrowserContext | null = null;
      let page: Page | null = null;
      try {
        const data = await initPage(false);
        browser = data.browser;
        context = data.context;
        page = data.page;
        await setCookies(page, acc.SESSION_ID);
        if (mode === "farm") {
          await Farm(page,true,30,60000,"demon")
        }
        if (mode === "feed") {
          console.log("start feed");
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (page) {
          await page.close();
          await context.clearCookies();
          await context.close();
          await browser.close();
        }
      }
    }),
  ]);
}

//  https://pixplay.org/?ref=61217
