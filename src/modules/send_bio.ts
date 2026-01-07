import { php_session_id } from "../const/constants";
import { JSDOM } from "jsdom";

export async function sendBio(session_id: string, player_id: number) {
    const res = await fetch(`https://mvoo.ru/user/cache/profile/${player_id}/?presents=vaccines`,
        {
            headers: {
                Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
            }
        }
    );
    const html = await res.text();
    const dom = new JSDOM(html);
    const link_item = dom.window.document.querySelector(".items a");
    const link = `https://mvoo.ru${link_item.getAttribute("href")}`;
    await fetch(link, {
        headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
        }
    })
}