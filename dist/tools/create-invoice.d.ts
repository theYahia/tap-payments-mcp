import { z } from "zod";
export declare const createInvoiceSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    customer_id: z.ZodString;
    due_date: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
    customer_id: string;
    due_date: string;
    description?: string | undefined;
}, {
    amount: number;
    customer_id: string;
    due_date: string;
    currency?: string | undefined;
    description?: string | undefined;
}>;
export declare function handleCreateInvoice(params: z.infer<typeof createInvoiceSchema>): Promise<string>;
