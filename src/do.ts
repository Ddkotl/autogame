import { LoadAccaunts } from "./utils/accaunt-manager";
import { curlDo } from "./utils/curl_helpers";
import { sleep } from "./utils/sleep";

async function Do() {
  const do_secret = process.env.DO_SECRET;
  const { dem_accaunts, ang_accaunts } = LoadAccaunts();
  for (let [index, acc] of dem_accaunts
    .concat(ang_accaunts)
    .entries()) {
    await sleep(500);

    await curlDo(do_secret, acc.SESSION_ID);
  }
}

(async () => {
  await Do();
})();
