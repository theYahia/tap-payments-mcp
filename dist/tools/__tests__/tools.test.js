import { describe, it, expect, vi, beforeEach } from "vitest";
const mockFetch = vi.fn();
global.fetch = mockFetch;
process.env.TAP_SECRET_KEY = "test-secret-key";
describe("tap-payments-mcp tools", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetModules();
    });
    it("create_charge sends payment request", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: "chg_123", status: "INITIATED", amount: 100, currency: "AED" }),
        });
        const { handleCreateCharge } = await import("../create-charge.js");
        const result = await handleCreateCharge({
            amount: 100, currency: "AED", source_id: "src_all",
            redirect_url: "https://example.com/return", description: "Test",
        });
        const parsed = JSON.parse(result);
        expect(parsed.id).toBe("chg_123");
        expect(parsed.status).toBe("INITIATED");
    });
    it("get_charge retrieves charge details", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: "chg_456", status: "CAPTURED", amount: 50 }),
        });
        const { handleGetCharge } = await import("../get-charge.js");
        const result = await handleGetCharge({ charge_id: "chg_456" });
        expect(JSON.parse(result).status).toBe("CAPTURED");
    });
    it("list_charges returns charge list", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ charges: [{ id: "chg_1" }, { id: "chg_2" }], has_more: false }),
        });
        const { handleListCharges } = await import("../list-charges.js");
        const result = await handleListCharges({ limit: 25 });
        expect(JSON.parse(result).charges).toHaveLength(2);
    });
    it("create_refund processes refund", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: "ref_789", status: "PENDING", amount: 25 }),
        });
        const { handleCreateRefund } = await import("../create-refund.js");
        const result = await handleCreateRefund({ charge_id: "chg_456", amount: 25, reason: "Test" });
        expect(JSON.parse(result).id).toBe("ref_789");
    });
    it("create_customer creates profile", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: "cus_001", first_name: "Ali", email: "ali@test.com" }),
        });
        const { handleCreateCustomer } = await import("../create-customer.js");
        const result = await handleCreateCustomer({ first_name: "Ali", email: "ali@test.com" });
        expect(JSON.parse(result).first_name).toBe("Ali");
    });
    it("create_invoice creates invoice", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: "inv_001", status: "CREATED", amount: 500 }),
        });
        const { handleCreateInvoice } = await import("../create-invoice.js");
        const result = await handleCreateInvoice({
            amount: 500, currency: "AED", customer_id: "cus_001", due_date: "2026-05-01",
        });
        expect(JSON.parse(result).id).toBe("inv_001");
    });
    it("handles HTTP errors gracefully", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false, status: 401, text: async () => "Unauthorized",
        });
        const { handleGetCharge } = await import("../get-charge.js");
        await expect(handleGetCharge({ charge_id: "bad" })).rejects.toThrow("Tap HTTP 401");
    });
});
//# sourceMappingURL=tools.test.js.map