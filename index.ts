import { Browser, BrowserContext, Page } from "patchright";
import { initPage } from "./utils/initPage";
import { sleep } from "./utils/sleep";
import { LoadAccaunts } from "./utils/accaunt-manager";
import {
  atackZombie,
  checkFreeFights,
  goToJob,
  mineGold,
  setCookies,
  swithGoldToDiamond,
  trainAgent,
} from "./modules";

export async function StartGreend() {
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
        // for (let i = 0; i < 30; i++) {
        //   await atackZombie(page);
        //   await mineGold(page);
        //   const check_free_fights = await checkFreeFights(page);
        //   if (check_free_fights === "0/24") {
        //     break;
        //   }
        //   await sleep(16000);
        // }
        await goToJob(page);
        // await swithGoldToDiamond(page);
        // await trainAgent(page);
      } catch (error) {
        console.error(error);
      } finally {
        if (page) {
          page.close();
          context.close();
          browser.close();
        }
      }
    }),
  );
}

StartGreend();
//  https://pixplay.org/?ref=61217
