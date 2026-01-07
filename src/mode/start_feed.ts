import { feedMain } from "../modules/feed_main";
import { sleep } from "../utils/sleep";
const proxy = false;
export async function startFeed(
  session_id: string,
  player_id: number,
) {
  await sleep(2000);
  await feedMain(session_id, proxy, player_id);
}
