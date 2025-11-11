import { spawn } from "child_process";
import { php_session_id } from "../const/constants";

export async function ByeVirus(session_id: string) {
  return new Promise<void>((resolve, reject) => {
    const args = [
      "-sS", // тихий режим, только ошибки
      "-X",
      "POST", // POST-запрос
      "-H",
      `Cookie: PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
      "-H",
      `Content-Type: application/x-www-form-urlencoded`,
      "--data",
      "quantity=20",
      "https://mvoo.ru/shop/buyMany/1011",
    ];

    const curl = spawn("curl", args, {
      stdio: ["ignore", "pipe", "pipe"],
    });

    let output = "";

    curl.stdout.on(
      "data",
      (data) => (output += data.toString()),
    );
    curl.stderr.on("data", (data) =>
      console.error(data.toString()),
    );

    curl.on("close", (code) => {
      if (code === 0) {
        console.log(
          "✅ ByeVirus успешно выполнен через curl",
        );
        resolve();
      } else {
        reject(
          new Error(`❌ curl завершился с кодом ${code}`),
        );
      }
    });
  });
}
