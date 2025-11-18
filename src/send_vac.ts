import { boss_id } from "./const/constants";
import { SendVac } from "./modules/send_vac";
import { SendVirus } from "./modules/send_virus";

(async () => {
  await SendVac(boss_id);
})();
