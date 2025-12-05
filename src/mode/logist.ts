import { Page } from "playwright";
import { goToJob, swithGoldToDiamond } from "../modules";
import { getResursesToSquad } from "../modules/get_resurses_to_squad";

export async function Logist(session_id: string) {
  await swithGoldToDiamond(session_id);

  await getResursesToSquad(session_id);
  await goToJob(session_id);
}
