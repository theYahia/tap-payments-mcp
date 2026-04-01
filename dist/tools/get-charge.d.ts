import { z } from "zod";
export declare const getChargeSchema: z.ZodObject<{
    charge_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    charge_id: string;
}, {
    charge_id: string;
}>;
export declare function handleGetCharge(params: z.infer<typeof getChargeSchema>): Promise<string>;
