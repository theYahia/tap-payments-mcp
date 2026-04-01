const BASE_URL = "https://api.tap.company/v2";
const TIMEOUT = 15_000;
export class TapClient {
    secretKey;
    constructor() {
        this.secretKey = process.env.TAP_SECRET_KEY ?? "";
        if (!this.secretKey) {
            throw new Error("Environment variable TAP_SECRET_KEY is required. " +
                "Get your key at https://developers.tap.company/");
        }
    }
    async request(method, path, body) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT);
        try {
            const response = await fetch(`${BASE_URL}${path}`, {
                method,
                headers: {
                    "Authorization": `Bearer ${this.secretKey}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });
            clearTimeout(timer);
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Tap HTTP ${response.status}: ${text}`);
            }
            return response.json();
        }
        catch (error) {
            clearTimeout(timer);
            if (error instanceof DOMException && error.name === "AbortError") {
                throw new Error("Tap: request timeout (15s). Try again later.");
            }
            throw error;
        }
    }
}
//# sourceMappingURL=client.js.map