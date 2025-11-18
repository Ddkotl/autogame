import { JSDOM } from "jsdom";
import {
  curlDo,
  curlDoWB,
  curlGet,
  curlPostForm,
} from "../../utils/curl_helpers";

export async function UseLab({
  session_id,
  useUrl,
}: {
  session_id: string;
  useUrl: string;
}): Promise<void> {
  try {
    const ok = await curlDo(useUrl, session_id);
    //console.log(ok.body)
    if (ok) {
      console.log(`${useUrl} успешно использован`);
    } else {
      console.warn(
        `Не удалось использовать ${useUrl} по ссылке:`,
        useUrl,
      );
    }
  } catch (error) {
    console.error("lab error", error);
  }
}
