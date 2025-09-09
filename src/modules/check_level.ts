import { php_session_id } from "../const/constants";

export async function checkLevel(
  session_id: string,
): Promise<number> {
  try {
    const pageUrl = "https://mvoo.ru";
    const res = await fetch(pageUrl, {
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
    });

    const html = await res.text();
    const match = html.match(/\[(\d+)\]/);
    if (match[1]) {
      return Number(match[1]);
    }
  } catch (error) {
    console.error("Не удалось узнать уровень", error);
    return 25;
  }
}
