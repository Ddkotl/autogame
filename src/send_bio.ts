import { sendBio } from "./modules/send_bio";
import { LoadAccaunts } from "./utils/accaunt-manager";

const send_list = [41638,55314,56063,56481,22434,22562];

    (async () => {
        const { dem_accaunts } = LoadAccaunts();
        for (let i = 0; i < send_list.length; i++) {
            await sendBio(dem_accaunts[i].SESSION_ID, send_list[i]);

        }
    })();
