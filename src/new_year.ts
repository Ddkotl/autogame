
import { JSDOM } from "jsdom";
import { curlDo, curlGet } from "./utils/curl_helpers";
import { LoadAccaunts } from "./utils/accaunt-manager";



export async function newEar(
  nikname:string,
  session_id: string,
): Promise<void> {
  try {
    const pageUrl =
      `https://mvoo.ru/game/city/newYear/?loginUser=${nikname}`;
    const html = await curlGet(pageUrl, session_id);
console.log(html)
    if (!html) {
      console.warn("Не удалось получить страницу new year");
      return;
    }

    const dom = new JSDOM(html);
    const anchors = Array.from(
      dom.window.document.querySelectorAll("a"),
    );

    for (const el of anchors) {
      const text = (el.textContent || "").trim();
      if (text === "Пропустить" || text === "Взломaть") {
        const href = el.getAttribute("href");
        if (!href) continue;
        const url = href.startsWith("http")
          ? href
          : `https://mvoo.ru${href}`;
        console.log("Выполняю:", url);

        const ok = await curlDo(url, session_id);
        if (ok) {
          console.log("Успешно:", text, url);
        } else {
          console.warn("Не удалось выполнить:", text, url);
        }

        // небольшая пауза, чтобы не перегружать сервер
        await new Promise((r) => setTimeout(r, 300));
      }
    }
  } catch (error) {
    console.error("Не удалось копать золото", error);
  }
}


(async()=>{
  const nikname = "Abbadon"
  const {ang_accaunts,dem_accaunts} = LoadAccaunts()
  const allAccaunts = ang_accaunts.concat(dem_accaunts)
  for(let i = 0; i < allAccaunts.length; i++){
    await newEar( nikname,allAccaunts[i].SESSION_ID)
}})()