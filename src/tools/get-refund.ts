import { z } from "zod";
import { TapClient } from "../client.js";

const client = new TapClient();

export const getRefundSchema = z.object({
  refund_id: z.string().describe("Refund ID to retrieve"),
});

export async function handleGetRefund(params: z.infer<typeof getRefundSchema>): Promise<string> {
  const result = await client.request("GET", `/refunds/${params.refund_id}`);
  return JSON.stringify(result, null, 2);
}
