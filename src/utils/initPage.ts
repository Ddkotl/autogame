import { chromium } from "patchright";

export async function initPage(videoRecord: boolean) {
  try {
    const browser = await chromium.launch({
      channel: "chromium",
      headless: true,
      args: [
        "--disable-blink-features=AutomationControlled",
      ],
    });
    const context = await browser.newContext({
      ...(videoRecord
        ? {
            recordVideo: {
              dir: `./test/v2-${new Date().toISOString()}`,
              size: { width: 1280, height: 720 },
            },
          }
        : {}),
      bypassCSP: true,
      javaScriptEnabled: true,
      viewport: {
        width: 1280 + Math.floor(Math.random() * 200),
        height: 720 + Math.floor(Math.random() * 200),
      },
      // userAgent:
      //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      locale: "ru-RU",
      colorScheme: "dark",
      httpCredentials: undefined,
    });
    const page = await context.newPage();
    return { page, context, browser };
  } catch (e) {
    console.error(e);
  }
}
