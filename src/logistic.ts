import { Browser, BrowserContext, Page } from "playwright";
import { LoadAccaunts } from "./utils/accaunt-manager";
import { initPage } from "./utils/initPage";
import { setCookies } from "./modules";
import { Logist } from "./mode/logist";
import { CreateTower } from "./create_tower";
import { getPristsMana } from "./modules/get_prists_mana";

export async function Logistic() {
  const { dem_accaunts, ang_accaunts } = LoadAccaunts();
  for (const acc of dem_accaunts.concat(ang_accaunts)) {
    try {
      await getPristsMana(acc.SESSION_ID);
      await Logist(acc.SESSION_ID);
    } catch (error) {
      console.error(error);
    }
  }
}

(async () => {
  await Logistic();
  await CreateTower();
})();
