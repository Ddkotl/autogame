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

export async function StartGreend(mode: "feed" | "farm") {
  const accaunts = LoadAccaunts();

  await Promise.all(
    accaunts.map(async (acc) => {
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
          await getResursesToSquad(page)
          const on_job = await checkJob(page);
          const is_wervolfs = await checkWerwolfs(page);
          for (let i = 0; i < 25; i++) {
            if (on_job) {
              break;
            }
            if (is_wervolfs) {
              await atackWerwolfs(page);
            } else {
              await atackZombie(page);
            }
            await mineGold(page);
            const check_free_fights = await checkFreeFights(page);
            if (check_free_fights === "0/24") {
              break;
            }
            await sleep(60000);
          }
          if (!on_job) {
            await goToJob(page);
            await goToMeditation(page);
          }
          await trainAgent(page);
          await swithGoldToDiamond(page);
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
  );
}

//  https://pixplay.org/?ref=61217
