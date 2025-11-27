import { LoadAccaunts } from "./utils/accaunt-manager";
import { curlDo } from "./utils/curl_helpers";
import { sleep } from "./utils/sleep";
import { UseLab } from "./var/modules/use_lab";

async function Do() {
  const { dem_accaunts ,ang_accaunts} = LoadAccaunts();
  for (let [index, acc] of ang_accaunts.entries()) {
    await sleep(500);

    await curlDo(
      `https://mvoo.ru/game/raid/?join=20679`,
      acc.SESSION_ID,
    );
  }
}

(async () => {
  await Do();
})();
