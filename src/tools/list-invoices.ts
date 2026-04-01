import { z } from "zod";
import { TapClient } from "../client.js";

const client = new TapClient();

export const listInvoicesSchema = z.object({
  status: z.string().optional().describe("Filter by status (PAID, PENDING, CANCELLED)"),
  limit: z.number().default(25).describe("Number of results"),
});

export async function handleListInvoices(params: z.infer<typeof listInvoicesSchema>): Promise<string> {
  const body: Record<string, unknown> = { limit: params.limit };
  if (params.status) body.status = params.status;
  const result = await client.request("POST", "/invoices/list", body);
  return JSON.stringify(result, null, 2);
}
