import { boss_id, php_session_id } from "./const/constants";
import { JSDOM } from "jsdom";
import { sleep } from "./utils/sleep";
async function SendMessages(session_id) {
  for (let page = 50; page <= 99; page++) {
    console.log(page);
    const res = await fetch(
      `https://mvoo.ru/online/cache/?side=demon&page=${page}`,
      {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
        },
      },
    );
    const html = await res.text();
    const dom = new JSDOM(html);
    const links =
      dom.window.document.querySelectorAll(".items a");

    for (const link of links) {
      await sleep(10000);
      const href = link.getAttribute("href");
      const ids = href.replace("/user/cache/profile/", "");
      console.log(ids);

      const formData = new URLSearchParams();
      formData.append("say", "Сказать");
      formData.append(
        "message",
        "Привет *HI* проголосуй пожалуйста за мою елку 🎄, отвечу взаимностью. Всех благ *WELCOME* ",
      );
      await fetch(
        `https://mvoo.ru/user/cache/mail/${ids}/send`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${session_id}`,
          },
          body: formData,
        },
      );
    }
  }
}

(async function () {
  await SendMessages(boss_id);
})();
