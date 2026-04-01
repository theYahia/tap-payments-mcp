import { z } from "zod";
import { TapClient } from "../client.js";
const client = new TapClient();
export const createCustomerSchema = z.object({
    first_name: z.string().describe("Customer first name"),
    last_name: z.string().optional().describe("Customer last name"),
    email: z.string().email().describe("Customer email"),
    phone_country_code: z.string().optional().describe("Phone country code (e.g. 971)"),
    phone_number: z.string().optional().describe("Phone number"),
});
export async function handleCreateCustomer(params) {
    const body = {
        first_name: params.first_name,
        last_name: params.last_name || "",
        email: params.email,
    };
    if (params.phone_country_code && params.phone_number) {
        body.phone = { country_code: params.phone_country_code, number: params.phone_number };
    }
    const result = await client.request("POST", "/customers", body);
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=create-customer.js.map