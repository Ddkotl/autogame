import { php_session_id } from "../const/constants";

export async function feedMain(session_id: string) {
  try {
    const pageUrl =
      "https://mvoo.ru/arena/cache/attack/55314";
    const res = await fetch(pageUrl, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
    });

    const html = await res.text();
    const match = html.match(
      /href="(\/arena\/cache\/attack\/\d+\?cache=[^"]+)"/,
    );
    if (!match) {
      console.error("Ссылка на атаку не найдена!");
      return;
    }

    const attackUrl = "https://mvoo.ru" + match[1];

    await fetch(attackUrl, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
    });
  } catch (error) {
    console.error("Не получилось нафидить");
  }
}
