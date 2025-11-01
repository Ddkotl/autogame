import { spawn } from "child_process";
import { php_session_id } from "../const/constants";
import { sleep } from "../utils/sleep";

async function runCurl(url: string, session_id: string) {
  return new Promise<void>((resolve, reject) => {
    const args = [
      "-sS", // тихий режим, показывать только ошибки
      "-L", // следовать редиректам
      "-H", `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36`,
      "-H", `Cookie: PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      url,
    ];

    const curl = spawn("curl", args);

    curl.stdout.on("data", (data) => {
      // Можно раскомментировать для вывода HTML
      // console.log(data.toString());
    });

    curl.stderr.on("data", (data) => {
      console.error("curl error:", data.toString());
    });

    curl.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`curl завершился с кодом ${code}`));
    });
  });
}

export async function trainAgent(session_id: string, count: number = 1) {
  try {
    for (let i = 0; i < count; i++) {
      await sleep(1000);
      await runCurl("https://mvoo.ru/user/cache/training/?sorting=pets&improve=power", session_id);
      await sleep(1000);
      await runCurl("https://mvoo.ru/user/cache/training/?sorting=pets&improve=protection", session_id);
      await sleep(1000);
      await runCurl("https://mvoo.ru/user/cache/training/?sorting=pets&improve=speed", session_id);
      await sleep(1000);
      await runCurl("https://mvoo.ru/user/cache/training/?sorting=pets&improve=skill", session_id);
    }
  } catch (error) {
    console.error("Тренировка не удалась", error);
  }
}
