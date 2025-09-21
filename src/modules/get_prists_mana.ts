import { php_session_id } from "../const/constants";

export async function getPristsMana(session_id: string) {
  try {
    await fetch(
      "https://mvoo.ru/clan/castle/?priests=open&receive=true&confirm=true",
      {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
        },
      },
    );
  } catch (error) {
    console.log("не получилось получить ману жрецов");
  }
}
