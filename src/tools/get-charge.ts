import { z } from "zod";
import { TapClient } from "../client.js";

const client = new TapClient();

export const getChargeSchema = z.object({
  charge_id: z.string().describe("Charge ID to retrieve"),
});

export async function handleGetCharge(params: z.infer<typeof getChargeSchema>): Promise<string> {
  const result = await client.request("GET", `/charges/${params.charge_id}`);
  return JSON.stringify(result, null, 2);
}
