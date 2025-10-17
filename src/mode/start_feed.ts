import { checkLevel } from "../modules/check_level";
import { feedMain } from "../modules/feed_main";
import { getDayRevard } from "../modules/get_day_revard";
import { sleep } from "../utils/sleep";
const proxy = true
export async function startFeed(session_id: string) {
  await getDayRevard(session_id, proxy);
  await sleep(1000);
  const level = await checkLevel(session_id, proxy);
  if (level >= 8) {
    await sleep(1000);
    await feedMain(session_id, proxy);
  }
}
