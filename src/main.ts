import { Browser, BrowserContext, Page } from "patchright";
import { initPage } from "./utils/initPage";
import { LoadAccaunts } from "./utils/accaunt-manager";
import { setCookies } from "./modules";
import { Farm } from "./mode/farm";
import { getDayRevard } from "./modules/get_day_revard";
import { sleep } from "./utils/sleep";
import { trainHero } from "./modules/train_hero";

export async function StartGreend(mode: "feed" | "farm") {
  const { dem_accaunts, ang_accaunts } = LoadAccaunts();
  if (mode === "feed") {
    dem_accaunts.splice(0);
  }
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
        await getDayRevard(page);
        await Farm(page, true, 30, 60000, "demon");
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
    ...ang_accaunts.map(async (acc, i) => {
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
          await Farm(page, false, 30, 60000, "angel");
        }
        if (mode === "feed") {
          await page.goto("https://mvoo.ru", {
            waitUntil: "domcontentloaded",
          });
          await sleep(i * 5000);
        //  await trainHero(page,3)
          await getDayRevard(page)
          await page.goto(
            "https://mvoo.ru/arena/cache/attack/55314/?pages-attackInformationPage=true",
            { waitUntil: "domcontentloaded" },
          );
          await sleep(3000)
          await page
            .locator(".button_small")
            .waitFor({ state: "visible" });
          await page.locator(".button_small").click();
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
