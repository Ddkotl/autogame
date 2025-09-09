import { JSDOM } from "jsdom";

async function main() {
  const pageUrl = "https://mvoo.ru/game/city";
  const res = await fetch(pageUrl, {
    headers: {
      Cookie:
        "PHPSESSID=dac8081b678bd7c2abdc5950372948af; SESSION_ID=d5bb55604e65f19f4f7f0b532c5dcc0f90caf98d89ed59c1bf8ae004779da3a4",
    },
  });
  const html = await res.text();
  const dom = new JSDOM(html);
  const els = dom.window.document.querySelectorAll(
    'a[href*="/arena"]',
  );
  let battles = "24/24";
  els.forEach((e) => {
    if (/\d+\/\d+/.test(e.textContent)) {
      battles = e.textContent;
    }
  });
  
}

main();
