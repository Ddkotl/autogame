import { Page } from "patchright";
export async function setCookies(
  page: Page,
  value: string,
  name: string = "SESSION_ID",
  url: string = "https://mvoo.ru",
) {
  try {
    await page.goto("https://mvoo.ru", {
      waitUntil: "domcontentloaded",
    });
    await page.context().addCookies([
      {
        name: name,
        value: value,
        url: url,
      },
    ]);
    await page.reload();
  } catch (error) {
    console.error("Не удалось установить куки");
  }
}
