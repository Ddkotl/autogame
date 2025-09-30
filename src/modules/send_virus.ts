import { JSDOM } from "jsdom";
import { php_session_id } from "../const/constants";
import { sleep } from "../utils/sleep";

const sacrefises_of_virus = [
  "32659",
  "40235",
  "24297",
  "28854",
  "21379",
  "45960",
  "54455",
  "27982",
  "50111",
  "56309",
  "34265",
  "21322",
  "36553",
  "20274",
  "24572",
  "15564",
  "36551",
  "10233",
  "14629",
  "21435",
  "18588",
  "19356",
];

export async function SendVirus(session_id: string) {
  try {
    const duration = 30 * 60 * 1000;
    const start_time = Date.now();

    while (Date.now() - start_time < duration) {
      for (let i = 0; i < sacrefises_of_virus.length; i++) {
        try {
          await sleep(2000);
          const res = await fetch(
            `https://mvoo.ru/user/cache/profile/${sacrefises_of_virus[i]}/?presents=viruses`,
            {
              headers: {
                Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
              },
            },
          );
          const html = await res.text();
          const dom = new JSDOM(html);
          const send_virus_linc = dom.window.document
            .querySelector("a[href*='viruses&send']")
            .getAttribute("href");
          console.log(send_virus_linc);
          await fetch(`https://mvoo.ru${send_virus_linc}`, {
            headers: {
              Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
            },
          });
        } catch (error) {
          console.error(
            `Ошибка при обработке пользователя ${sacrefises_of_virus[i]}:`,
            error,
          );

          continue;
        }
      }
    }
  } catch (error) {
    console.error("send virus error", error);
  }
}
