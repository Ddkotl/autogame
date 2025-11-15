import { curlPostForm } from "../utils/curl_helpers";

export async function Bye({
  buyUrl,
  session_id,
  cost,
}: {
  session_id: string;
  buyUrl: string;
  cost: number;
}): Promise<void> {
  try {
    const buyResp = await curlPostForm(buyUrl, session_id, {
      cost: `${cost}`,
    });
    if (buyResp === null) {
      console.warn(
        "Покупка  не удалась (curl вернул null)",
      );
    } else {
      console.log(
        "Покупка  выполнена (ответ length):",
        buyResp.length,
      );
    }
  } catch (error) {
    console.error("bye error", error);
  }
}

(async () => {
  await Bye({
    buyUrl: "https://mvoo.ru/auction/bargain/items/10832",
    cost: 2052,
    session_id:
      "9fa5bbf573003efc8df3fa653cc79165b238107f6b6143e30de3e59e576ec70d",
  });
})();
