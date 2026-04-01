export interface TapCharge {
    id: string;
    status: string;
    amount: number;
    currency: string;
    description?: string;
    source?: {
        type: string;
        id: string;
    };
    customer?: {
        id: string;
    };
    redirect?: {
        url: string;
    };
}
export interface TapRefund {
    id: string;
    status: string;
    amount: number;
    charge_id: string;
    reason?: string;
}
export interface TapCustomer {
    id: string;
    first_name: string;
    last_name?: string;
    email?: string;
    phone?: {
        country_code: string;
        number: string;
    };
}
export interface TapInvoice {
    id: string;
    status: string;
    amount: number;
    currency: string;
    customer?: {
        id: string;
    };
    due_date?: string;
}
export interface TapApiResponse {
    [key: string]: unknown;
}
