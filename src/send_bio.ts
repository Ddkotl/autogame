import { sendBio } from "./modules/send_bio";
import { LoadAccaunts } from "./utils/accaunt-manager";



(async () => {
    const { dem_accaunts } = LoadAccaunts();
    await sendBio(dem_accaunts[4].SESSION_ID, 55314);
})();
