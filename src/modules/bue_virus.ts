import { php_session_id } from "../const/constants";

export async function ByeVirus(session_id: string) {
  try {
    await fetch("https://mvoo.ru/shop/buyMany/1011", {
      method: "POST",
      headers: {
        Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      },
      body: new URLSearchParams({
        quantity: "20",
      }),
    });
  } catch (error) {
    console.error("bye virus error", error);
  }
}
