import { boss_id } from "./const/constants";
import { SendVirus } from "./modules/send_virus";

(async () => {
  await SendVirus(boss_id);
})();
