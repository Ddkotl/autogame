import { boss_id } from "./const/constants";
import { getDayRevard } from "./modules/get_day_revard";
import { SendVirus } from "./modules/send_virus";

(async () => {
  await getDayRevard(boss_id);
  await SendVirus(boss_id);
})();
