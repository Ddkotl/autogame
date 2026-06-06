import { boss_id, php_session_id } from "./const/constants";
import { LoadAccaunts } from "./utils/accaunt-manager";
import { JSDOM } from "jsdom";

const TOWER_OWNER_LOGIN = "viking15";
const BOSS_PROFILE_ID = "55314";
const TOWER_OWNER_ID = "56165";
const BASE_URL = "https://mvoo.ru";

// Хелпер для создания заголовков авторизации
const getHeaders = (playerId: string) => ({
  headers: {
    Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${playerId}`,
  },
});

// Получение ссылки на атаку
async function getAttackLink(towerOwnerId: string, playerId: string): Promise<string> {
  try {
    const res = await fetch(`${BASE_URL}/user/cache/profile/${towerOwnerId}/?tower=battle&send=bid`, getHeaders(playerId));
    const html = await res.text();
    const dom = new JSDOM(html);
    const btnEl = dom.window.document.querySelector("a.button_small");
    return btnEl?.getAttribute("href") ?? "";
  } catch (e) {
    console.error("Ошибка получения ссылки атаки:", e);
    return "";
  }
}

// Подача заявки на атаку
async function submitBid(towerOwnerId: string, playerId: string) {
  const href = await getAttackLink(towerOwnerId, playerId);
  if (!href) return;
  await fetch(`${BASE_URL}${href}`, getHeaders(playerId));
}

// Решение бага: цикл запрашивает страницу заново, пока есть кого принимать
async function acceptAllBids(towerOwnerId: string, playerId: string) {
  while (true) {
    const res = await fetch(`${BASE_URL}/user/cache/profile/${towerOwnerId}/?tower=battle`, getHeaders(playerId));
    const html = await res.text();
    const dom = new JSDOM(html);
    
    // Ищем ПЕРВУЮ ссылку "Принять"
    const acceptLinkEl = Array.from(dom.window.document.querySelectorAll("a"))
      .find(e => e.textContent?.trim() === "[Принять]");

    if (!acceptLinkEl) break; // Если ссылок больше нет — выходим из цикла

    const href = acceptLinkEl.getAttribute("href");
    if (href) {
      await fetch(`${BASE_URL}${href}`, getHeaders(playerId));
    }
  }
}

// Запуск самой атаки башни
async function launchAttack(towerOwnerId: string, playerId: string) {
  const atRes = await fetch(`${BASE_URL}/user/cache/profile/${towerOwnerId}/?tower=battle&attack=go`, getHeaders(playerId));
  const atHtml = await atRes.text();
  const atDom = new JSDOM(atHtml);
  const atLink = atDom.window.document.querySelector(".button_small")?.getAttribute("href");
  
  if (atLink) {
    await fetch(`${BASE_URL}${atLink}`, getHeaders(playerId));
  }
}

export async function CreateTower() {
  try {
    const { dem_accaunts } = LoadAccaunts();
    const demAccToBoss = dem_accaunts.slice(0, 7);
    const demAccToVic = dem_accaunts.slice(7);

    // 1. Параллельно отправляем заявки от аккаунтов "vic" и "boss"
    const vicPromises = demAccToVic
      .filter(acc => acc.login !== TOWER_OWNER_LOGIN)
      .map(acc => submitBid(TOWER_OWNER_ID, acc.SESSION_ID));

    const bossPromises = demAccToBoss.map(acc => submitBid(BOSS_PROFILE_ID, acc.SESSION_ID));

    await Promise.all([...vicPromises, ...bossPromises]);

    // 2. Подаем заявку от главного босса
    await submitBid(TOWER_OWNER_ID, boss_id);

    // 3. Обработка башни владельца (viking15)
    const ownerAccount = dem_accaunts.find(acc => acc.login === TOWER_OWNER_LOGIN);
    if (ownerAccount) {
      try {
        await acceptAllBids(TOWER_OWNER_ID, ownerAccount.SESSION_ID);
        await launchAttack(TOWER_OWNER_ID, ownerAccount.SESSION_ID);
      } catch (e) {
        console.error("Ошибка на башне владельца:", e);
      }
    }

    // 4. Обработка башни босса
    await acceptAllBids(BOSS_PROFILE_ID, boss_id);
    await launchAttack(BOSS_PROFILE_ID, boss_id);

  } catch (error) {
    console.error("Главная ошибка CreateTower:", error);
  }
}

(async () => {
  await CreateTower();
})();
