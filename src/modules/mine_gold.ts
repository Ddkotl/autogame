import { spawn } from "child_process";
import { JSDOM } from "jsdom";
import { php_session_id } from "../const/constants";

/** Выполнить curl GET и вернуть stdout как строку или null при ошибке */
function curlGet(url: string, session_id: string): Promise<string | null> {
  return new Promise((resolve) => {
    const args = [
      "-sS",
      "-L",
      "--max-redirs", "20",
      "--compressed",
      "-H", `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36`,
      "-H", `Cookie: PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      "-H", "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      url,
    ];

    const curl = spawn("curl", args);
    let out = "";
    let err = "";

    curl.stdout.on("data", (chunk) => (out += chunk.toString()));
    curl.stderr.on("data", (chunk) => (err += chunk.toString()));

    curl.on("close", (code) => {
      if (code === 0 && out.length > 0) {
        resolve(out);
      } else {
        // логим коротко для дебага и возвращаем null
        console.warn(`curl GET ${url} exited ${code}. stderr: ${err.split("\n").slice(0,3).join(" / ")}`);
        resolve(null);
      }
    });

    curl.on("error", (e) => {
      console.error("curl spawn error:", e);
      resolve(null);
    });
  });
}

/** Тот же GET, но игнорируем тело — возвращаем true при коде 0, иначе false */
function curlDo(url: string, session_id: string): Promise<boolean> {
  return new Promise((resolve) => {
    const args = [
      "-sS",
      "-L",
      "--max-redirs", "20",
      "--compressed",
      "-H", `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36`,
      "-H", `Cookie: PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      url,
    ];

    const curl = spawn("curl", args);
    let err = "";

    curl.stderr.on("data", (chunk) => (err += chunk.toString()));

    curl.on("close", (code) => {
      if (code === 0) {
        resolve(true);
      } else {
        console.warn(`curl DO ${url} exited ${code}. stderr: ${err.split("\n").slice(0,3).join(" / ")}`);
        resolve(false);
      }
    });

    curl.on("error", (e) => {
      console.error("curl spawn error:", e);
      resolve(false);
    });
  });
}

export async function mineGold(session_id: string): Promise<void> {
  try {
    const pageUrl = "https://mvoo.ru/surroundings/?sorting=stash";
    const html = await curlGet(pageUrl, session_id);

    if (!html) {
      console.warn("Не удалось получить страницу тайников");
      return;
    }

    const dom = new JSDOM(html);
    const anchors = Array.from(dom.window.document.querySelectorAll("a"));

    for (const el of anchors) {
      const text = (el.textContent || "").trim();
      if (text === "Пропустить" || text === "Взломaть") {
        const href = el.getAttribute("href");
        if (!href) continue;
        const url = href.startsWith("http") ? href : `https://mvoo.ru${href}`;
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
