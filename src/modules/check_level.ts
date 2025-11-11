import { spawn } from "child_process";
import { php_session_id } from "../const/constants";
import { JSDOM } from "jsdom";

export async function checkLevel(
  session_id: string,
): Promise<number> {
  return new Promise<number>((resolve) => {
    const args = [
      "-sS", // тихий режим
      "-L", // следовать редиректам
      "-H",
      `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36`,
      "-H",
      `Cookie: PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      "https://mvoo.ru",
    ];

    const curl = spawn("curl", args);

    let html = "";

    curl.stdout.on("data", (data) => {
      html += data.toString();
    });

    curl.stderr.on("data", (data) => {
      console.error("curl error:", data.toString());
    });

    curl.on("close", () => {
      try {
        const dom = new JSDOM(html);
        const userLink = dom.window.document.querySelector(
          'a[href*="/user/cache/profile"]',
        );
        if (!userLink)
          throw new Error(
            "Не найден пользовательский профиль",
          );

        const userName = userLink.textContent || "";
        const match = userName.match(/\[(\d+)\]/);
        if (match && match[1]) {
          resolve(Number(match[1]));
        } else {
          resolve(25); // значение по умолчанию, если не найдено
        }
      } catch (error) {
        console.error("Не удалось узнать уровень", error);
        resolve(25);
      }
    });
  });
}
