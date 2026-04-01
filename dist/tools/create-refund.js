import { z } from "zod";
import { TapClient } from "../client.js";
const client = new TapClient();
export const createRefundSchema = z.object({
    charge_id: z.string().describe("Charge ID to refund"),
    amount: z.number().positive().describe("Refund amount"),
    reason: z.string().optional().describe("Reason for refund"),
});
export async function handleCreateRefund(params) {
    const result = await client.request("POST", "/refunds", {
        charge_id: params.charge_id,
        amount: params.amount,
        currency: "AED",
        reason: params.reason ?? "Requested by merchant",
    });
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=create-refund.js.map