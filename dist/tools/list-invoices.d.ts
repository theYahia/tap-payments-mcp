import { z } from "zod";
export declare const listInvoicesSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    status?: string | undefined;
}, {
    status?: string | undefined;
    limit?: number | undefined;
}>;
export declare function handleListInvoices(params: z.infer<typeof listInvoicesSchema>): Promise<string>;
