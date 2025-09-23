import { php_session_id } from "../const/constants";
import fetch from "node-fetch";
import { SocksProxyAgent } from "socks-proxy-agent";

const SOCKS_PROXY = "socks5h://127.0.0.1:9050";
const socksAgent = new SocksProxyAgent(SOCKS_PROXY);

export async function feedMain(session_id: string) {
  try {
    const pageUrl =
      "https://mvoo.ru/arena/cache/attack/55314";
    const res = await fetch(pageUrl, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
      agent:socksAgent
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
      agent:socksAgent
    });
  } catch (error) {
    console.error("Не получилось нафидить");
  }
}
