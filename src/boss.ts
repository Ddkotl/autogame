import { ByeGrene } from "./modules/bye_grene";
import { atackZombie } from "./modules/atack_zombie";
import { boss_id } from "./const/constants";

async function Boss() {
  await ByeGrene(boss_id);
  await atackZombie(boss_id);
}

(async () => {
  await Boss();
})();
