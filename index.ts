import { Page } from "patchright";
import { initPage } from "./utils/initPage";
import { sleep } from "./utils/sleep";
import { LoadAccaunts } from "./utils/accaunt-manager";
export async function StartGame() {
  const accaunts = LoadAccaunts();
  const page: Page = await initPage(true);

  await page.goto("https://mvoo.ru/");
  for (let cook of accaunts) {
    await page.context().addCookies([
      {
        name: "SESSION_ID",
        value: cook["SESSION_ID"],
        url: "https://mvoo.ru",
      },
    ]);
    await page.reload();
  }
}

StartGame();
