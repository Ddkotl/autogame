import { spawn } from "child_process";
import { JSDOM } from "jsdom";
import { php_session_id } from "../const/constants";

export async function checkWerwolfs(
  session_id: string,
): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const args = [
      "-sS", // тихий режим, без прогресс-бара
      "-L", // следовать редиректам
      "-H",
      `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36`,
      "-H",
      `Cookie: PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      "https://mvoo.ru/",
    ];

    const curl = spawn("curl", args);

    let html = "";

    curl.stdout.on("data", (data) => {
      html += data.toString();
    });

    curl.stderr.on("data", (data) => {
      const str = data.toString();
      if (str.trim() !== "")
        console.error("curl error:", str);
    });

    curl.on("close", () => {
      try {
        const dom = new JSDOM(html);
        const notifications =
          dom.window.document.querySelector(
            "div.notifications_block",
          );
        if (!notifications)
          throw new Error(
            "Не найден блок notifications_block",
          );
        const isWervolfs =
          notifications.textContent?.includes(
            "Оборотни прорвались в страны",
          ) ?? false;
        resolve(isWervolfs);
      } catch (error) {
        console.error(
          "Не удалось проверить оборотней",
          error,
        );
        resolve(false);
      }
    });
  });
}
