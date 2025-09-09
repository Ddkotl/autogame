import { feedMain } from "../modules/feed_main";
import { getDayRevard } from "../modules/get_day_revard";

export async function startFeed(session_id: string) {
  await getDayRevard(session_id);
  await feedMain(session_id);
}
