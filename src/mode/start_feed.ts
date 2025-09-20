import { checkLevel } from "../modules/check_level";
import { feedMain } from "../modules/feed_main";
import { getDayRevard } from "../modules/get_day_revard";
import { trainHero } from "../modules/train_hero";
import { sleep } from "../utils/sleep";

export async function startFeed(session_id: string) {
  await getDayRevard(session_id);
  await sleep(1000);
  const level = await checkLevel(session_id);
  if (level >= 11) {
    await sleep(1000);
    await feedMain(session_id);
    await trainHero(session_id, 3);
  }
}
