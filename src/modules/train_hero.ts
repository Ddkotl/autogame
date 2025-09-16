import { php_session_id } from "../const/constants";
import { sleep } from "../utils/sleep";

export async function trainHero(
  session_id: string,
  count: number,
) {
  try {
    for (let i = 0; i < count; i++) {
      await sleep(1000);
      await fetch(
        "https://mvoo.ru/user/cache/training/?improve=power",
        {
          headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
          },
        },
      );
      await sleep(1000);
      await fetch(
        "https://mvoo.ru/user/cache/training/?improve=protection",
        {
          headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
          },
        },
      );
      await sleep(1000);
      await fetch(
        "https://mvoo.ru/user/cache/training/?improve=speed",
        {
          headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
          },
        },
      );
      await sleep(1000);
      await fetch(
        "https://mvoo.ru/user/cache/training/?improve=skill",
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
