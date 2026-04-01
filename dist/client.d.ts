export declare class TapClient {
    private secretKey;
    constructor();
    request(method: string, path: string, body?: unknown): Promise<unknown>;
}
