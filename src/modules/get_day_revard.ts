import { spawn } from "child_process";
import { php_session_id } from "../const/constants";

export async function getDayRevard(
  session_id: string,
  maxAttempts = 3,
): Promise<string | null> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const output = await new Promise<string>(
        (resolve, reject) => {
          const args = [
            "-L",
            "--max-redirs",
            "10",
            "--compressed",
            "-H",
            `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36`,
            "-H",
            `Cookie: PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
            "-H",
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "-H",
            "X-Requested-With: XMLHttpRequest",
            "-H",
            "Referer: https://mvoo.ru/",
            "https://mvoo.ru/?take=true",
          ];

          const curl = spawn("curl", args, {
            stdio: ["ignore", "pipe", "pipe"],
          });
          let output = "";

          curl.stdout.on("data", (data) => {
            output += data.toString();
          });

          curl.stderr.on("data", (data) => {
            const str = data.toString();
            if (
              !str.includes("Maximum") &&
              str.trim() !== ""
            ) {
              console.error("curl stderr:", str);
            }
          });

          curl.on("close", (code) => {
            if (output.length > 0) {
              resolve(output);
            } else {
              reject(
                new Error(
                  `curl завершился с кодом ${code}`,
                ),
              );
            }
          });
        },
      );

      console.log(
        "✅ Дневная награда успешно получена через curl",
      );
      return output;
    } catch (err) {
      console.warn(
        `Попытка ${attempt} не удалась:`,
        err.message || err,
      );

      if (attempt < maxAttempts) {
        console.log("Пробуем снова...");
        await new Promise((r) => setTimeout(r, 1000)); // пауза перед следующей попыткой
      } else {
        console.log(
          "Не удалось получить дневную награду, пропускаем...",
        );
      }
    }
  }

  return null;
}
