import { JSDOM } from "jsdom";
import { php_session_id } from "../const/constants";

export async function goToJob(session_id: string) {
  try {
    const res = await fetch(
      "https://mvoo.ru/game/staff/?lair",
      {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
        },
      },
    );
    const text = await res.text();
    const dom = new JSDOM(text);
    const isActive = dom.window.document
      .querySelector("#partner")
      .textContent.includes("Активен");
    if (!isActive) {
      await fetch(
        "https://mvoo.ru/game/staff/?lair=true&buy=partner&confirm=oll",
        {
          headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
          },
        },
      );
    }
    await fetch(
      "https://mvoo.ru/game/staff/service?serviceTime=480",
    );
  } catch (error) {
    console.error("Не удалось сходить на службу", error);
  }
}
