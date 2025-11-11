import { spawn } from "child_process";
import { JSDOM } from "jsdom";
import { php_session_id } from "../const/constants";

/** Выполнить curl GET и вернуть stdout как строку или null при ошибке */
function curlGet(
  url: string,
  session_id: string,
): Promise<string | null> {
  return new Promise((resolve) => {
    const args = [
      "-sS",
      "-L",
      "--max-redirs",
      "20",
      "--compressed",
      "-H",
      `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36`,
      "-H",
      `Cookie: PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      "-H",
      "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      url,
    ];

    const curl = spawn("curl", args);
    let out = "";
    let err = "";

    curl.stdout.on(
      "data",
      (chunk) => (out += chunk.toString()),
    );
    curl.stderr.on(
      "data",
      (chunk) => (err += chunk.toString()),
    );

    curl.on("close", (code) => {
      if (code === 0 && out.length > 0) {
        resolve(out);
      } else {
        console.warn(
          `curl GET ${url} exited ${code}. stderr: ${err.split("\n").slice(0, 3).join(" / ")}`,
        );
        resolve(null);
      }
    });

    curl.on("error", (e) => {
      console.error("curl spawn error:", e);
      resolve(null);
    });
  });
}

/** Выполнить curl GET без возврата содержимого, вернуть true при успешном коде */
function curlDo(
  url: string,
  session_id: string,
): Promise<boolean> {
  return new Promise((resolve) => {
    const args = [
      "-sS",
      "-L",
      "--max-redirs",
      "20",
      "--compressed",
      "-H",
      `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36`,
      "-H",
      `Cookie: PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      url,
    ];

    const curl = spawn("curl", args);
    let err = "";

    curl.stderr.on(
      "data",
      (chunk) => (err += chunk.toString()),
    );

    curl.on("close", (code) => {
      if (code === 0) resolve(true);
      else {
        console.warn(
          `curl DO ${url} exited ${code}. stderr: ${err.split("\n").slice(0, 3).join(" / ")}`,
        );
        resolve(false);
      }
    });

    curl.on("error", (e) => {
      console.error("curl spawn error:", e);
      resolve(false);
    });
  });
}

export async function atackWerwolfs(session_id: string) {
  try {
    const pageUrl =
      "https://mvoo.ru/clan/castle/?werewolves=true";
    const html = await curlGet(pageUrl, session_id);

    if (!html) {
      console.warn(
        "Не удалось получить страницу оборотней",
      );
      return;
    }

    const dom = new JSDOM(html);
    const btn_el = dom.window.document.querySelector(
      "a.button_small",
    );

    if (!btn_el) {
      console.warn("Кнопка атаки не найдена");
      return;
    }

    const attackHref = btn_el.getAttribute("href");
    if (!attackHref) {
      console.warn("Ссылка атаки не найдена");
      return;
    }

    const attackUrl = attackHref.startsWith("http")
      ? attackHref
      : `https://mvoo.ru${attackHref}`;
    console.log("Атакую оборотня:", attackUrl);

    const ok = await curlDo(attackUrl, session_id);
    if (ok) console.log("Атака успешно выполнена");
    else console.warn("Не удалось атаковать оборотня");
  } catch (error) {
    console.error("Не удалось атаковать оборотня", error);
  }
}
