import cron from "node-cron";
import { StartGreend } from "./main";

export function setupCron() {
  console.log("⏳ Cron задачи инициализированы...");

  cron.schedule("0,8 10,14,20 * * *", async () => {
    console.log("🚀 Запуск greend...");
    try {
      await StartGreend();
      console.log("✅ greend успешно завершён.");
    } catch (error) {
      console.error("❌ Ошибка при выполнении greend:", error);
    }
  });
}
setupCron();
