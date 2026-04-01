import { z } from "zod";
export declare const createRefundSchema: z.ZodObject<{
    charge_id: z.ZodString;
    amount: z.ZodNumber;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    charge_id: string;
    reason?: string | undefined;
}, {
    amount: number;
    charge_id: string;
    reason?: string | undefined;
}>;
export declare function handleCreateRefund(params: z.infer<typeof createRefundSchema>): Promise<string>;
