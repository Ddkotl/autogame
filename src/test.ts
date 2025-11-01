process.env.NODE_OPTIONS = "--insecure-http-parser";
import { StartGreend } from "./main";

(async () => {
  await StartGreend("test", 16000);
})();
