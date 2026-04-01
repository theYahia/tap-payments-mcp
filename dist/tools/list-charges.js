import { z } from "zod";
import { TapClient } from "../client.js";
const client = new TapClient();
export const listChargesSchema = z.object({
    status: z.string().optional().describe("Filter by status (CAPTURED, AUTHORIZED, etc.)"),
    limit: z.number().default(25).describe("Number of results (max 50)"),
    starting_after: z.string().optional().describe("Cursor for pagination"),
});
export async function handleListCharges(params) {
    const result = await client.request("POST", "/charges/list", {
        period: { date: {} },
        limit: params.limit,
        ...(params.status ? { status: params.status } : {}),
        ...(params.starting_after ? { starting_after: params.starting_after } : {}),
    });
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=list-charges.js.map