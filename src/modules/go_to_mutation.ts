import { JSDOM } from "jsdom";
import { php_session_id } from "../const/constants";

export async function goToMutation(
  session_id: string,
): Promise<boolean> {
  try {
    const pageUrl =
      "https://mvoo.ru/game/city/laboratory/?view=4&conduct=4&confirm=true";

    const res = await fetch(pageUrl, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
    });
    const html = await res.text();
    const dom = new JSDOM(html);
    const is_activ = dom.window.document
      .querySelector("ul")
      .textContent.includes("Технология активна");
    return is_activ;
  } catch (error) {
    console.log("не удалось пойти на мутацию");
    return;
  }
}
