import { php_session_id } from "../const/constants";
import { socksAgent } from "../utils/proxy";
import fetch from "node-fetch";
export async function getDayRevard(
  session_id: string,
  proxy: boolean = false,
) {
  try {
    await fetch("https://mvoo.ru/?take=true", {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
      agent: proxy ? socksAgent : false,
    });
  } catch (error) {
    console.log("не получилось получить дневную награду");
  }
}
