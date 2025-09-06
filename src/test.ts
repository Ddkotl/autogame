
async function main() {
  // 1. Получаем страницу боя
  const pageUrl = "https://mvoo.ru/arena/cache/attack/55314";
  const res = await fetch(pageUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
      "Cookie": "PHPSESSID=dac8081b678bd7c2abdc5950372948af; SESSION_ID=d5bb55604e65f19f4f7f0b532c5dcc0f90caf98d89ed59c1bf8ae004779da3a4",
      "Referer": "https://mvoo.ru/arena/",
    }
  });

  const html = await res.text();
console.log(html)
  // 2. Находим ссылку на атаку в HTML
  const match = html.match(/href="(\/arena\/cache\/attack\/\d+\?cache=[^"]+)"/);
  if (!match) {
    console.error("Ссылка на атаку не найдена!");
    return;
  }

  const attackUrl = "https://mvoo.ru" + match[1];
  console.log("Нашли ссылку на атаку:", attackUrl);

  // 3. Делаем запрос по найденной ссылке
  const attackRes = await fetch(attackUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
      "Cookie": "PHPSESSID=dac8081b678bd7c2abdc5950372948af; SESSION_ID=d5bb55604e65f19f4f7f0b532c5dcc0f90caf98d89ed59c1bf8ae004779da3a4",
      "Referer": pageUrl,
    }
  });

  const attackHtml = await attackRes.text();
  console.log("HTML ответа на атаку:", attackHtml);
}

main();
