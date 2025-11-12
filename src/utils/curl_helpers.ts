import { spawn } from "child_process";
import { php_session_id } from "../const/constants";
/** Выполнить curl POST с form-urlencoded, вернуть stdout или null */
export function curlPostForm(
  url: string,
  session_id: string,
  form: Record<string, string>,
): Promise<string | null> {
  return new Promise((resolve) => {
    const formStr = Object.entries(form)
      .map(
        ([k, v]) =>
          `${encodeURIComponent(k)}=${encodeURIComponent(v)}`,
      )
      .join("&");

    const args = [
      "-sS",
      "-L",
      "--max-redirs",
      "20",
      "--compressed",
      "-X",
      "POST",
      "-H",
      `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36`,
      "-H",
      "Content-Type: application/x-www-form-urlencoded",
      "-H",
      `Cookie: PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      "--data",
      formStr,
      url,
    ];

    const curl = spawn("curl", args);
    let out = "";
    let err = "";

    curl.stdout.on("data", (ch) => (out += ch.toString()));
    curl.stderr.on("data", (ch) => (err += ch.toString()));

    curl.on("close", (code) => {
      if (code === 0) resolve(out);
      else {
        console.warn(
          `curl POST ${url} exited ${code}. stderr: ${err.split("\n").slice(0, 3).join(" / ")}`,
        );
        resolve(null);
      }
    });

    curl.on("error", (e) => {
      console.error("curl spawn error (POST):", e);
      resolve(null);
    });
  });
}

/** Выполнить curl GET и вернуть stdout или null */
export function curlGet(
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

    curl.stdout.on("data", (ch) => (out += ch.toString()));
    curl.stderr.on("data", (ch) => (err += ch.toString()));

    curl.on("close", (code) => {
      if (code === 0 && out.length > 0) resolve(out);
      else {
        console.warn(
          `curl GET ${url} exited ${code}. stderr: ${err.split("\n").slice(0, 3).join(" / ")}`,
        );
        resolve(null);
      }
    });

    curl.on("error", (e) => {
      console.error("curl spawn error (GET):", e);
      resolve(null);
    });
  });
}

/** Выполнить curl GET без чтения тела (возвращает true/false по коду) */
export function curlDo(
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

    curl.stderr.on("data", (ch) => (err += ch.toString()));

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
      console.error("curl spawn error (DO):", e);
      resolve(false);
    });
  });
}
