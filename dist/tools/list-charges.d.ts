import { z } from "zod";
export declare const listChargesSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
    starting_after: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    status?: string | undefined;
    starting_after?: string | undefined;
}, {
    status?: string | undefined;
    limit?: number | undefined;
    starting_after?: string | undefined;
}>;
export declare function handleListCharges(params: z.infer<typeof listChargesSchema>): Promise<string>;
