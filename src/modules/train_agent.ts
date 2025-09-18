import { php_session_id } from "../const/constants";
import { sleep } from "../utils/sleep";

export async function trainAgent(
  session_id: string,
  count: number = 1,
) {
  try {
    for (let i = 0; i < count; i++) {
      await sleep(1000);
      await fetch(
        "https://mvoo.ru/user/cache/training/?sorting=pets&improve=power",
        {
          headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
          },
        },
      );
      await sleep(1000);
      await fetch(
        "https://mvoo.ru/user/cache/training/?sorting=pets&improve=protection",
        {
          headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
          },
        },
      );
      await sleep(1000);
      await fetch(
        "https://mvoo.ru/user/cache/training/?sorting=pets&improve=speed",
        {
          headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
          },
        },
      );
      await sleep(1000);
      await fetch(
        "https://mvoo.ru/user/cache/training/?sorting=pets&improve=skill",
        {
          headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
          },
        },
      );
    }
  } catch (error) {
    console.error("Тренировка не удалась", error);
  }
}
