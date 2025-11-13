import {
  atackZombie,
  checkJob,
  mineGold,
  trainAgent,
} from "../modules";
import { checkMeditation } from "../modules/check_meditation";
import { checkWerwolfs } from "../modules/check_werwolfs";
import { atackWerwolfs } from "../modules/atack_werwolfs";
import { sleep } from "../utils/sleep";
import { checkLevel } from "../modules/check_level";
import { goToMutation } from "../modules/go_to_mutation";

export async function Farm(
  session_id: string,
  fight_count: number,
  sleep_time: number,
  fraction: "angel" | "demon",
) {
  await trainAgent(session_id, 2);
  if (fraction === "angel") {
    await sleep(1000);
    //const level: number = await checkLevel(session_id);
    //if (level >= 10) {
     // await sleep(1000);
      //const on_mutation = await goToMutation(session_id);
     // if (!on_mutation) {
     //   return;
     // }
    }
    if (level === undefined || level === null) {
      return;
    }
  }
  await sleep(1000);
  const on_med = await checkMeditation(session_id);
  await sleep(1000);
  const on_job = await checkJob(session_id);
  await sleep(1000);
  const is_wervolfs = await checkWerwolfs(session_id);
  for (let i = 0; i < fight_count; i++) {
    if (on_job || on_med) {
      break;
    }

    await mineGold(session_id);
    await sleep(1000);
    if (is_wervolfs) {
      await atackWerwolfs(session_id);
    } else {
      await sleep(1000);
      await atackZombie(session_id);
    }
    await sleep(1000);
    // const check_free_fights =
    //   await checkFreeFights(session_id);
    // if (check_free_fights === "0/24") {
    //   break;
    // }
    await sleep(sleep_time);
  }
  // if (!on_job && !on_med) {
  //   if (fraction === "demon") {
  //     await goToJob(page);
  //     await goToMeditation(page);
  //   }
  // }
}
