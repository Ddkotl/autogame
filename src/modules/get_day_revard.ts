import { Page } from "patchright"

export async function getDayRevard(page:Page){
    try {
        await page.goto("https://mvoo.ru/?take=true",{waitUntil:"domcontentloaded"})
    } catch (error) {
        console.log("не получилось получить дневную награду")
    }
}