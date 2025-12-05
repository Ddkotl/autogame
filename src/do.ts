import { LoadAccaunts } from "./utils/accaunt-manager";
import { curlDo } from "./utils/curl_helpers";
import { sleep } from "./utils/sleep";

async function Do() {
  const { dem_accaunts } = LoadAccaunts();
  for (let [index, acc] of dem_accaunts.entries()) {
    await sleep(500);

    await curlDo(
      `https://mvoo.ru/game/raid/?join=20874`,
      acc.SESSION_ID,
    );
  }
}

(async () => {
  await Do();
})();
