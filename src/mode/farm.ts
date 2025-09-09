import { Page } from "patchright";
import {
  atackZombie,
  checkFreeFights,
  checkJob,
  goToJob,
  goToMeditation,
  mineGold,
  swithGoldToDiamond,
  trainAgent,
} from "../modules";
import { checkMeditation } from "../modules/check_meditation";
import { getResursesToSquad } from "../modules/get_resurses_to_squad";
import { checkWerwolfs } from "../modules/check_werwolfs";
import { atackWerwolfs } from "../modules/atack_werwolfs";
import { sleep } from "../utils/sleep";
import { checkLevel } from "../modules/check_level";
import { goToMutation } from "../modules/go_to_mutation";

export async function Farm(
  session_id: string,
  page: Page,
  res_to_squad: boolean,
  fight_count: number,
  sleep_time: number,
  fraction: "angel" | "demon",
) {
  await swithGoldToDiamond(page);
  await trainAgent(page);
  if (fraction === "angel") {
    const level: number = await checkLevel(session_id);
    if (level >= 10) {
      const on_mutation = await goToMutation(page);
      if (!on_mutation) {
        return;
      }
    }
    if (level === undefined || level === null) {
      return;
    }
  }
  if (res_to_squad) {
    await getResursesToSquad(page);
  }
  const on_med = await checkMeditation(page);
  const on_job = await checkJob(page);
  const is_wervolfs = await checkWerwolfs(page);
  for (let i = 0; i < fight_count; i++) {
    if (on_job || on_med) {
      break;
    }
    if (is_wervolfs) {
      await atackWerwolfs(page);
    } else {
      await atackZombie(page);
    }
    await mineGold(page);
    const check_free_fights = await checkFreeFights(page);
    if (check_free_fights === "0/24") {
      break;
    }
    await sleep(sleep_time);
  }
  if (!on_job && !on_med) {
    if (fraction === "demon") {
      await goToJob(page);
      await goToMeditation(page);
    }
  }
  await trainAgent(page);
}
