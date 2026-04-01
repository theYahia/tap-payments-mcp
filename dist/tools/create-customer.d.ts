import { z } from "zod";
export declare const createCustomerSchema: z.ZodObject<{
    first_name: z.ZodString;
    last_name: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    phone_country_code: z.ZodOptional<z.ZodString>;
    phone_number: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    first_name: string;
    email: string;
    last_name?: string | undefined;
    phone_country_code?: string | undefined;
    phone_number?: string | undefined;
}, {
    first_name: string;
    email: string;
    last_name?: string | undefined;
    phone_country_code?: string | undefined;
    phone_number?: string | undefined;
}>;
export declare function handleCreateCustomer(params: z.infer<typeof createCustomerSchema>): Promise<string>;
