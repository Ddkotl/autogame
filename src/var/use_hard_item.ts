import { LoadAccaunts } from "../utils/accaunt-manager";
import { sleep } from "../utils/sleep";
import { UseHardItem } from "./modules/use_hard_item";
import { UseItem } from "./modules/use_item";

async function Fn() {
  const { dem_accaunts } = LoadAccaunts();
  for (let acc of dem_accaunts) {
    await sleep(500);

    await UseHardItem({
      session_id: acc.SESSION_ID,
      item_name: "Релисса",
    });
    //     await UseHardItem({
    //   session_id: acc.SESSION_ID,
    //   item_name: "Большой Ларец Соулу",
    // });
    //    await UseHardItem({
    //   session_id: acc.SESSION_ID,
    //   item_name: "Средний Ларец Соулу",
    // });
    //      await UseHardItem({
    //   session_id: acc.SESSION_ID,
    //   item_name: "Малый Ларец Соулу",
    // });
    //        await UseHardItem({
    //   session_id: acc.SESSION_ID,
    //   item_name: "Таинственный реликварий",
    // });
  }
}

(async () => {
  await Fn();
})();
