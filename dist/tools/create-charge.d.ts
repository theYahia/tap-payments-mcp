import { z } from "zod";
export declare const createChargeSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    source_id: z.ZodString;
    customer_name: z.ZodOptional<z.ZodString>;
    customer_email: z.ZodOptional<z.ZodString>;
    redirect_url: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
    source_id: string;
    redirect_url: string;
    customer_name?: string | undefined;
    customer_email?: string | undefined;
    description?: string | undefined;
}, {
    amount: number;
    source_id: string;
    redirect_url: string;
    currency?: string | undefined;
    customer_name?: string | undefined;
    customer_email?: string | undefined;
    description?: string | undefined;
}>;
export declare function handleCreateCharge(params: z.infer<typeof createChargeSchema>): Promise<string>;
