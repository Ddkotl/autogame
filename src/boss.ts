import { ByeGrene } from "./modules/bye_grene";
import { atackZombie } from "./modules/atack_zombie";
import { boss_id } from "./const/constants";
import { trainHero } from "./modules/train_hero";

async function Boss() {
  await ByeGrene(boss_id);
  await atackZombie(boss_id);
  await trainHero(boss_id, 1)
}

(async () => {
  await Boss();
})();
