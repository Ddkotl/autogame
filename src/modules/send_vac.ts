import { spawn } from "child_process";
import { JSDOM } from "jsdom";
import { php_session_id } from "../const/constants";
import { sleep } from "../utils/sleep";
import { getDayRevard } from "./get_day_revard";
import { curlGet } from "../utils/curl_helpers";

const sacrefises_of_vac = [
"56165","56203","56201","56200","56170","56174","56150","56176","56142","58259","58511","58500","58505","58504","58506","58381","58502","58493","58503","58496","58509","58499"
];

/** Основная функция — использует curlGet/curlRequest вместо fetch */
export async function SendVac(session_id: string) {
  try {
    const duration = 2 * 60 * 1000;
    const start_time = Date.now();

    while (Date.now() - start_time < duration) {
      try {
        // Вызов getDayRevard (предполагается, что он у тебя уже через curl сделан)
        await getDayRevard(session_id);

        for (let i = 0; i < sacrefises_of_vac.length; i++) {
          await sleep(500);

          const profileUrl = `https://mvoo.ru/user/cache/profile/${sacrefises_of_vac[i]}/?presents=vaccines`;
          const html = await curlGet(
            profileUrl,
            session_id,
          );

          if (!html) {
            console.warn(
              `Не удалось получить профиль ${sacrefises_of_vac[i]}, пропускаю`,
            );
            continue;
          }

          // Парсим HTML и ищем ссылку с 'vaccines&send'
          const dom = new JSDOM(html);
          const anchor = Array.from(
            dom.window.document.querySelectorAll("a[href]"),
          ).find((a) =>
            a
              .getAttribute("href")
              ?.includes("vaccines&send"),
          );

          if (!anchor) {
            console.warn(
              `Ссылка отправки vac не найдена в профиле ${sacrefises_of_vac[i]}`,
            );
            continue;
          }

          const send_href = anchor.getAttribute("href")!;
          // Если href относительный — приводим к абсолютному
          const sendUrl = send_href.startsWith("http")
            ? send_href
            : `https://mvoo.ru${send_href}`;

          console.log(
            "Отправка vac по ссылке:",
            sendUrl,
          );

          const sendResp = await curlGet(
            sendUrl,
            session_id,
          );
          if (!sendResp) {
            console.warn(
              `Не удалось выполнить отправку по ${sendUrl}`,
            );
          } else {
            console.log(
              `Успешно отправлено на ${sacrefises_of_vac[i]}`,
            );
          }
        }
      } catch (innerErr) {
        console.error(
          "Ошибка при обработке while send vac:",
          innerErr,
        );
        // продолжаем цикл
        continue;
      }
    }
  } catch (err) {
    console.error("send vac error", err);
  }
}
