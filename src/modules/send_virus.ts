import { spawn } from "child_process";
import { JSDOM } from "jsdom";
import { php_session_id } from "../const/constants";
import { sleep } from "../utils/sleep";
import { getDayRevard } from "./get_day_revard";

const sacrefises_of_virus = [
  "24925",
  "4526",
  "4846",
  "14876",
  "19048",
  "25117",
  "14899",
  "48723",
  "22949",
  "25273",
  "37004",
  "24910",
  "22260",
  "19595",
  "29745",
  "29642",
  "21016",
  "25304",
  "14641",
  "14927",
  "24644",
  "33198",
  "24870",
  "20842",
  "24315",
  "22762",
  "19489",
  "30615",
  "26640",
  "24762",
  "3653",
  "7985",
];

/** Выполнить curl GET и вернуть stdout как строку (или null при ошибке) */
function curlGet(
  url: string,
  session_id: string,
): Promise<string | null> {
  return new Promise((resolve) => {
    const args = [
      "-sS", // тихо, но ошибки в stderr
      "-L", // следовать редиректам
      "--max-redirs",
      "20",
      "--location-trusted",
      "--compressed",
      "-H",
      `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36`,
      "-H",
      `Cookie: PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      "-H",
      "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "-H",
      "Referer: https://mvoo.ru/",
      url,
    ];

    const curl = spawn("curl", args);

    let out = "";
    let err = "";

    curl.stdout.on(
      "data",
      (chunk) => (out += chunk.toString()),
    );
    curl.stderr.on(
      "data",
      (chunk) => (err += chunk.toString()),
    );

    curl.on("close", (code) => {
      // Игнорируем предупреждения о max-redirects (код 47) — возвращаем null чтобы обработать дальше
      if (code === 0 && out.length > 0) {
        resolve(out);
      } else {
        console.warn(
          `curl GET ${url} exited ${code}. stderr: ${err.split("\n").slice(0, 3).join(" / ")}`,
        );
        resolve(null);
      }
    });

    curl.on("error", (e) => {
      console.error("curl spawn error:", e);
      resolve(null);
    });
  });
}

/** Отправить GET-запрос (без ожидания тела), вернуть тело если нужно */
function curlRequest(
  url: string,
  session_id: string,
): Promise<string | null> {
  // Для простоты — тот же curlGet (GET request)
  return curlGet(url, session_id);
}

/** Основная функция — использует curlGet/curlRequest вместо fetch */
export async function SendVirus(session_id: string) {
  try {
    const duration = 1 * 60 * 1000;
    const start_time = Date.now();

    while (Date.now() - start_time < duration) {
      try {
        // Вызов getDayRevard (предполагается, что он у тебя уже через curl сделан)
        await getDayRevard(session_id);

        for (
          let i = 0;
          i < sacrefises_of_virus.length;
          i++
        ) {
          await sleep(500);

          const profileUrl = `https://mvoo.ru/user/cache/profile/${sacrefises_of_virus[i]}/?presents=viruses`;
          const html = await curlGet(
            profileUrl,
            session_id,
          );

          if (!html) {
            console.warn(
              `Не удалось получить профиль ${sacrefises_of_virus[i]}, пропускаю`,
            );
            continue;
          }

          // Парсим HTML и ищем ссылку с 'viruses&send'
          const dom = new JSDOM(html);
          const anchor = Array.from(
            dom.window.document.querySelectorAll("a[href]"),
          ).find((a) =>
            a
              .getAttribute("href")
              ?.includes("viruses&send"),
          );

          if (!anchor) {
            console.warn(
              `Ссылка отправки вируса не найдена в профиле ${sacrefises_of_virus[i]}`,
            );
            continue;
          }

          const send_href = anchor.getAttribute("href")!;
          // Если href относительный — приводим к абсолютному
          const sendUrl = send_href.startsWith("http")
            ? send_href
            : `https://mvoo.ru${send_href}`;

          console.log(
            "Отправка вируса по ссылке:",
            sendUrl,
          );

          const sendResp = await curlRequest(
            sendUrl,
            session_id,
          );
          if (sendResp === null) {
            console.warn(
              `Не удалось выполнить отправку по ${sendUrl}`,
            );
          } else {
            console.log(
              `Успешно отправлено на ${sacrefises_of_virus[i]}`,
            );
          }
        }
      } catch (innerErr) {
        console.error(
          "Ошибка при обработке while send virus:",
          innerErr,
        );
        // продолжаем цикл
        continue;
      }
    }
  } catch (err) {
    console.error("send virus error", err);
  }
}
