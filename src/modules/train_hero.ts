import { curlDo } from "../utils/curl_helpers";
import { sleep } from "../utils/sleep";

/**
 * Тренировка героя — улучшает power, protection, speed, skill по очереди.
 * Использует curl spawn для обхода ограничений fetch и имитации браузерных запросов.
 */
export async function trainHero(
  session_id: string,
  count: number,
) {
  try {
    for (let i = 0; i < count; i++) {
      console.log(`🧘‍♂️ Цикл ${i + 1}/${count}`);

      await curlDo(
        "https://mvoo.ru/user/cache/training/?improve=power",
        session_id,
      );
      await sleep(1000);

      await curlDo(
        "https://mvoo.ru/user/cache/training/?improve=skill",
        session_id,
      );
      await sleep(1000);

      await curlDo(
        "https://mvoo.ru/user/cache/training/?improve=speed",
        session_id,
      );
      await sleep(1000);

      await curlDo(
        "https://mvoo.ru/user/cache/training/?improve=protection",
        session_id,
      );
      await sleep(1000);
    }

    console.log("✅ Тренировка завершена успешно");
  } catch (error) {
    console.error("❌ Ошибка при тренировке героя:", error);
  }
}
