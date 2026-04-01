import { z } from "zod";
export declare const getRefundSchema: z.ZodObject<{
    refund_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    refund_id: string;
}, {
    refund_id: string;
}>;
export declare function handleGetRefund(params: z.infer<typeof getRefundSchema>): Promise<string>;
