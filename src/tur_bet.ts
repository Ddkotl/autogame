import { php_session_id } from "./const/constants";
import { LoadAccaunts } from "./utils/accaunt-manager";
import { JSDOM } from "jsdom";
function findBetLink(
  document: Document,
  playerName: string,
  currency: "gold" | "diamond",
  sum: number,
): string | null {
  const rows = [
    ...document.querySelectorAll(".tour-bet-row"),
  ];

  for (const row of rows) {
    const user = row.querySelector(".user_link a");

    if (user?.textContent?.trim() !== playerName) {
      continue;
    }

    const boxId = row
      .querySelector(".tour-bet-toggle")
      ?.getAttribute("data-bet-toggle");

    if (!boxId) {
      return null;
    }

    const betBox = document.getElementById(boxId);

    if (!betBox) {
      return null;
    }

    const links = [
      ...betBox.querySelectorAll("a.tour-bet-amount"),
    ];

    const link = links.find((a) => {
      const href = a.getAttribute("href") ?? "";

      return (
        href.includes(`currency=${currency}`) &&
        href.includes(`sum=${sum}`)
      );
    });

    return link?.getAttribute("href") ?? null;
  }

  return null;
}
async function turBet() {
  const { dem_accaunts, ang_accaunts } = LoadAccaunts();
  const accs = dem_accaunts.concat(ang_accaunts);
  
  // console.log(accs);
  for (let acc of accs) {
    const res = await fetch(
      "https://mvoo.ru/game/tournament/?tournament=all",
      {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${acc.SESSION_ID}`,
        },
      },
    );
    const text = await res.text();

    console.log(text);
    const dom = new JSDOM(text);
    const href = findBetLink(
      dom.window.document,
      "Азь",
      "diamond",
      50,
    );

    if (href) {
      await fetch(`https://mvoo.ru${href}`, {
        headers: {
          Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${acc.SESSION_ID}`,
        },
      });
    }
  }
}

(async function () {
    await turBet();
})();
