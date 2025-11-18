import { LoadAccaunts } from "../utils/accaunt-manager";
import { sleep } from "../utils/sleep";
import { Atack } from "./modules/atack";
import { UseHardItem } from "./modules/use_hard_item";
import { UseItem } from "./modules/use_item";

async function Fn() {
  const { dem_accaunts } = LoadAccaunts();
  for (let [index, acc] of dem_accaunts.entries()) {
    await sleep(500);

    await Atack(
      "https://mvoo.ru/clan/war/?offensive=true",
      acc.SESSION_ID,
    );
  }
}

(async () => {
  for (let i = 0; i < 7; i++) {
    await Fn();
    await sleep(5000);
  }
})();
