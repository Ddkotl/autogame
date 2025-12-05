import { checkLevel } from "../modules/check_level";
import { feedMain } from "../modules/feed_main";
import { getDayRevard } from "../modules/get_day_revard";
import { sleep } from "../utils/sleep";
const proxy = true;
export async function startFeed(session_id: string) {
  //await getDayRevard(session_id)
  //const level = await checkLevel(session_id);
  //if (level >= 8) {
   await sleep(2000);
  await feedMain(session_id, proxy);
  //}
}
