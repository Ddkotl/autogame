import { Browser, BrowserContext, Page } from "playwright";
import { LoadAccaunts } from "./utils/accaunt-manager";
import { initPage } from "./utils/initPage";
import { setCookies } from "./modules";
import { Logist } from "./mode/logist";
import { CreateTower } from "./create_tower";
import { getPristsMana } from "./modules/get_prists_mana";

export async function Logistic() {
  const { dem_accaunts, ang_accaunts } = LoadAccaunts();
  for (const acc of dem_accaunts.concat(ang_accaunts)) {
    let browser: Browser | null = null;
    let context: BrowserContext | null = null;
    let page: Page | null = null;
    try {
      const data = await initPage(false);
      browser = data.browser;
      context = data.context;
      page = data.page;
      await setCookies(page, acc.SESSION_ID);
      await getPristsMana(acc.SESSION_ID);
      await Logist(page, true, true);
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
  }
  for (const acc of ang_accaunts) {
    let browser: Browser | null = null;
    let context: BrowserContext | null = null;
    let page: Page | null = null;
    try {
      const data = await initPage(false);
      browser = data.browser;
      context = data.context;
      page = data.page;
      await setCookies(page, acc.SESSION_ID);
      await Logist(page, false, false);
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
  }
}

(async () => {
  await Logistic();
  await CreateTower();
})();
