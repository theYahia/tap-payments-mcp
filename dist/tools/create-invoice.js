import { z } from "zod";
import { TapClient } from "../client.js";
const client = new TapClient();
export const createInvoiceSchema = z.object({
    amount: z.number().positive().describe("Invoice amount"),
    currency: z.string().default("AED").describe("Currency code"),
    customer_id: z.string().describe("Customer ID"),
    due_date: z.string().describe("Due date (YYYY-MM-DD)"),
    description: z.string().optional().describe("Invoice description"),
});
export async function handleCreateInvoice(params) {
    const result = await client.request("POST", "/invoices", {
        draft: false,
        due: new Date(params.due_date).getTime() / 1000,
        expiry: new Date(params.due_date).getTime() / 1000 + 86400 * 7,
        description: params.description ?? "",
        mode: "INVOICE",
        currencies: [params.currency],
        order: {
            amount: params.amount,
            currency: params.currency,
        },
        customer: { id: params.customer_id },
    });
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=create-invoice.js.map