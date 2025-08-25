import fs from "fs";
import path from "path";

interface Accaunt {
  login: string;
  password: string;
  SESSION_ID: string;
}

const DEM_ACCAUNTS_FILE = path.join(__dirname, "../mvoo-acc-d.json");
const ANG_ACCAUNTS_FILE = path.join(__dirname, "../mvoo-acc-a.json");
export function LoadAccaunts() {
  let accaunts: Accaunt[] = []
  try {
    if (fs.existsSync(DEM_ACCAUNTS_FILE)) {
      const ddata = fs.readFileSync(DEM_ACCAUNTS_FILE, "utf-8");
       accaunts.push(...JSON.parse(ddata)) 
    }
     if (fs.existsSync(ANG_ACCAUNTS_FILE)) {
      const adata = fs.readFileSync(ANG_ACCAUNTS_FILE, "utf-8");
       accaunts.push(...JSON.parse(adata)) 
    }
    console.log(`Загружено ${accaunts.length} аккаунтов`);
    return accaunts
  } catch (error) {
    console.error("Ошибка загрузки аккаунтов", error);
  }
}
