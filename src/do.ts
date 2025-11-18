import { LoadAccaunts } from "./utils/accaunt-manager";
import { curlDo } from "./utils/curl_helpers";
import { sleep } from "./utils/sleep";
import { UseLab } from "./var/modules/use_lab";

async function Do() {
  const { dem_accaunts } = LoadAccaunts();
  for (let [index, acc] of dem_accaunts.entries()) {
    await sleep(500);

    await curlDo(
      `https://mvoo.ru/user/cache/profile/55314/?friends-add-confirm=`,
      acc.SESSION_ID,
    );
  }
}

(async () => {
  await Do();
})();
