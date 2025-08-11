import { Page } from "playwright";
import { initPage } from "./fn/initPage";
import { sleep } from "./utils/sleep";
export async function StartGame() {
  const page: Page = await initPage(true);

  await sleep(1000);
  await page.goto("https://google.com");
  await page.locator("button", { hasText: "Принять все" }).click();
  await sleep(1000);
  await page.goto("https://pixplay.org/?ref=61217");
  await sleep(5000);
  for (let frame of page.frames()) {
    if (frame.url().startsWith("https://challenges.cloudflare.com")) {
      const frame_element = await frame.frameElement();
      const box = await frame_element.boundingBox();
      // console.log(box);
      // { x: 272, y: 256, width: 300, height: 65 }
      const check_x = box.x + box.width / 9;
      const check_y = box.y + box.height / 2;

      await page.mouse.click(check_x, check_y, { button: "left" });
    }
  }
}

StartGame();
