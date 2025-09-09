
async function main() {
  const pageUrl = "https://mvoo.ru";
  const res = await fetch(pageUrl, {
    headers: {
      Cookie:
        "PHPSESSID=dac8081b678bd7c2abdc5950372948af; SESSION_ID=d5bb55604e65f19f4f7f0b532c5dcc0f90caf98d89ed59c1bf8ae004779da3a4",
    },
  });

  const html = await res.text();
  console.log(html);

  // 2. Находим ссылку на атаку в HTML
  const match = html.match(/\[(\d+)\]/);

  console.log(match[1]);
}

main();
