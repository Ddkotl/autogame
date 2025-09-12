import { Page } from "patchright";
import {  goToJob, swithGoldToDiamond } from "../modules";
import { getResursesToSquad } from "../modules/get_resurses_to_squad";


export async function Logist(
  page: Page,
  res_to_squad:boolean,
  go_tu_job:boolean
) {
  await swithGoldToDiamond(page);

  if (res_to_squad) {
    await getResursesToSquad(page);
  }
    if (go_tu_job) {
      await goToJob(page);
  }
}
