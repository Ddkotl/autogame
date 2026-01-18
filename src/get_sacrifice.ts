import { JSDOM } from "jsdom";
import { boss_id, php_session_id } from "./const/constants";
import { sleep } from "./utils/sleep";
import fs from "fs";
(async () => {
    const removeArray = ["10816", "2838", "40954", "11104","63004","4233","27071","22516"]
    const toRemoveSet = new Set(removeArray)
    const sacrifice_list = []
    for (let i = 0; i < 200; i++) {
        await sleep(1000)
        const id15 = await getSacrificeId(15)
        const id16 = await getSacrificeId(16)
        const id17 = await getSacrificeId(17)
        if (!sacrifice_list.includes(id15) && !toRemoveSet.has(id15)) {
            sacrifice_list.push(id15)
        }
        if (!sacrifice_list.includes(id16) && !toRemoveSet.has(id16)) {
            sacrifice_list.push(id16)
        }
        if (!sacrifice_list.includes(id17) && !toRemoveSet.has(id17)) {
            sacrifice_list.push(id17)
        }
    }
    fs.writeFileSync("./sacrifice_list.json", JSON.stringify(sacrifice_list, null, 2), "utf-8")
    console.log("sacrifice list saved", sacrifice_list.length);
})()

async function getSacrificeId(lvl: number) {
    const res = await fetch(`https://mvoo.ru/arena/main/?sorting=${lvl}&last=true`, {
        headers: {
            Cookie: `PHPSESSID=${php_session_id}; SESSION_ID=${boss_id}`,
        }
    })
    const text = await res.text();
    const dom = new JSDOM(text);
    const link = dom.window.document.querySelector("#content_block strong a")
    const href = link.getAttribute("href");
    const id = href.replace("/user/cache/profile/", "")
    return id
}