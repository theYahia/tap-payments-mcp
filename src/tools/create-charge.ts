import { z } from "zod";
import { TapClient } from "../client.js";

const client = new TapClient();

export const createChargeSchema = z.object({
  amount: z.number().positive().describe("Payment amount"),
  currency: z.string().default("AED").describe("Currency code (AED, SAR, KWD, BHD, USD)"),
  source_id: z.string().describe("Payment source ID (e.g. src_all for redirect)"),
  customer_name: z.string().optional().describe("Customer full name"),
  customer_email: z.string().optional().describe("Customer email"),
  redirect_url: z.string().url().describe("URL to redirect after payment"),
  description: z.string().optional().describe("Charge description"),
});

export async function handleCreateCharge(params: z.infer<typeof createChargeSchema>): Promise<string> {
  const body: Record<string, unknown> = {
    amount: params.amount,
    currency: params.currency,
    source: { id: params.source_id },
    redirect: { url: params.redirect_url },
  };
  if (params.description) body.description = params.description;
  if (params.customer_name || params.customer_email) {
    const nameParts = (params.customer_name ?? "").split(" ");
    body.customer = {
      first_name: nameParts[0] || "",
      last_name: nameParts.slice(1).join(" ") || "",
      email: params.customer_email || "",
    };
  }
  const result = await client.request("POST", "/charges", body);
  return JSON.stringify(result, null, 2);
}
