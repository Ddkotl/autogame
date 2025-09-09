import { JSDOM } from "jsdom";

async function main() {
  const pageUrl =
    "https://mvoo.ru/game/city/laboratory/?view=4";

  const res = await fetch(pageUrl, {
    headers: {
      Cookie:
        "PHPSESSID=dac8081b678bd7c2abdc5950372948af; SESSION_ID=d5bb55604e65f19f4f7f0b532c5dcc0f90caf98d89ed59c1bf8ae004779da3a4",
    },
  });
  const html = await res.text();
  const dom = new JSDOM(html);
  const is_button_exist = dom.window.document.querySelector(
    'a[href="/game/city/laboratory/?view=4&conduct=4"]',
  );
  const is_activ = dom.window.document
    .querySelector("ul")
    .textContent.includes("Технология активна");
  if (is_button_exist) {
    const res = await fetch(
      "https://mvoo.ru/game/city/laboratory/?view=4&conduct=4&confirm=true",
      {
        headers: {
          Cookie:
            "PHPSESSID=dac8081b678bd7c2abdc5950372948af; SESSION_ID=d5bb55604e65f19f4f7f0b532c5dcc0f90caf98d89ed59c1bf8ae004779da3a4",
        },
      },
    );
    const html = await res.text();
  }
}

main();
