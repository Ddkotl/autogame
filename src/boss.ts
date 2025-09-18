import { ByeGrene } from "./modules/bye_grene";
import { atackZombie } from "./modules/atack_zombie";
async function Boss() {
  const session_id =
    "5324591d3d9ff6c54cc2c7048c6360893e7566e335c30ea0617c82a70c516e2e";
  await ByeGrene(session_id);
  await atackZombie(session_id);
}

(async () => {
  await Boss();
})();
