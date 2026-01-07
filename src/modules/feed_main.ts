import { php_session_id } from "../const/constants";
import fetch from "node-fetch";
import { socksAgent } from "../utils/proxy";

export async function feedMain(
  session_id: string,
  proxy: boolean = false,
  player_id: number,
) {
  try {
    const pageUrl = `https://mvoo.ru/arena/cache/attack/${player_id}`;
    const res = await fetch(pageUrl, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
      agent: proxy ? socksAgent : false,
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
      agent: proxy ? socksAgent : false,
    });
  } catch (error) {
    console.error("Не получилось нафидить");
  }
}
