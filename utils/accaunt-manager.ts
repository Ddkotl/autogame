import fs from "fs";
import path from "path";

interface Accaunt {
  login: string;
  password: string;
  SESSION_ID: string;
}

const ACCAUNTS_FILE = path.join(__dirname, "../mvoo-acc.json");

export function LoadAccaunts() {
  try {
    if (fs.existsSync(ACCAUNTS_FILE)) {
      const data = fs.readFileSync(ACCAUNTS_FILE, "utf-8");
      const accaunts: Accaunt[] = JSON.parse(data);
      console.log(`Загружено ${accaunts.length} аккаунтов`);
      return accaunts;
    }
  } catch (error) {
    console.error("Ошибка загрузки аккаунтов", error);
  }
}
