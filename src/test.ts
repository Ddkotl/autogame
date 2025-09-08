async function main() {
  await fetch("https://mvoo.ru/?take=true", {
    headers: {
      Cookie:
        "PHPSESSID=dac8081b678bd7c2abdc5950372948af; SESSION_ID=d5bb55604e65f19f4f7f0b532c5dcc0f90caf98d89ed59c1bf8ae004779da3a4",
    },
  });
  // 1. Получаем страницу боя
  const pageUrl =
    "https://mvoo.ru/arena/cache/attack/55314";
  const res = await fetch(pageUrl, {
    headers: {
      Cookie:
        "PHPSESSID=dac8081b678bd7c2abdc5950372948af; SESSION_ID=d5bb55604e65f19f4f7f0b532c5dcc0f90caf98d89ed59c1bf8ae004779da3a4",
    },
  });

  const html = await res.text();
  console.log(html);
  // 2. Находим ссылку на атаку в HTML
  const match = html.match(
    /href="(\/arena\/cache\/attack\/\d+\?cache=[^"]+)"/,
  );
  if (!match) {
    console.error("Ссылка на атаку не найдена!");
    return;
  }

  const attackUrl = "https://mvoo.ru" + match[1];
  console.log("Нашли ссылку на атаку:", attackUrl);

  // 3. Делаем запрос по найденной ссылке
  const attackRes = await fetch(attackUrl, {
    headers: {
      Cookie:
        "PHPSESSID=dac8081b678bd7c2abdc5950372948af; SESSION_ID=d5bb55604e65f19f4f7f0b532c5dcc0f90caf98d89ed59c1bf8ae004779da3a4",
    },
  });

  const attackHtml = await attackRes.text();
  console.log("HTML ответа на атаку:", attackHtml);
}

main();
